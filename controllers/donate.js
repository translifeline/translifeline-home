'use strict';

const menu = require('./common/menu');
const donate = require('./common/donate');
const request = require('request');

/* A controller for the donate page. */
function controller(app) {
  app.get('/donate', function (req, res) {
    donate(app).then(function(donate) {
      getCampaignProgressData(donate).then(function(progress) {
        let data = {
          menu: menu(),
          donate: donate,
          progress: progress
        };
        res.render('donate', data);
      }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  });
}

function getCampaignProgressData(donate) {
  return new Promise((resolve, reject) => {
    if (process.env.MOONCLERK_TOKEN) {
      getTotal('payments', donate.start, donate.end, 0, 0, function(amountRaised){
        let matchedAmount = amountRaised * donate.matchMultiplier;
        if (matchedAmount > donate.matchMax) {
          matchedAmount = donate.matchMax;
        }
        let currentTime = new Date().getTime();
        let endTime = new Date(donate.end).getTime();
        let daysLeft = Math.floor((endTime - currentTime)/1000/60/60/24)
        resolve({
          goal: formatValue(donate.goal),
          amountRaised: formatValue(amountRaised),
          matchedAmount: formatValue(matchedAmount),
          percent: amountRaised * 100 / donate.goal,
          daysLeft: daysLeft
        });
      }, function(error) {
        reject(error);
      });
    } else {
      reject({err: 'MOONCLERK_TOKEN not set.'})
    }
  });
}

function formatValue(value) {
 return new Number(value).toFixed(2).replace(/\.00$/, '');
}

function getTotal(type, fromDate, toDate, page, amountRaised, success, failure) {
  var count = 100;
  var offset = count * page;
  var url = 'https://api.moonclerk.com';
  if (type === 'plans') {
    url += '/customers?count=100&checkout_from=' + fromDate + '&checkout_to=' + toDate;
  } else if (type === 'payments') {
    url += '/payments?count=100&date_from=' + fromDate + '&date_to=' + toDate;
  }
  if (offset > 0) {
    url += '&offset=' + offset;
  }

  request({
    url: url,
    headers: {
      'Authorization': 'Token token=' + process.env.MOONCLERK_TOKEN,
      'Accept': 'application/vnd.moonclerk+json;version=1'
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      if (type === 'plans') {
        data = data.customers;
      } else if (type === 'payments') {
        data = data.payments;
      }
      var amount = 0;
      if (data.length === 0) {
        success(amountRaised);
      } else {
        for (var index in data) {
          if (type === 'plans') {
            amount += data[index].subscription.plan.amount;
          } else if (type === 'payments') {
            amount += data[index].amount;
          }
        }
        // moonclerk returns the amount in cents.
        amount = amount/100;
        getTotal(type, fromDate, toDate, page + 1, parseFloat(amountRaised) + amount, success, failure);
      }
    } else {
      failure(error);
    }
  });
}


module.exports = controller;
