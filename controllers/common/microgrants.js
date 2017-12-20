'use strict';

const request = require('request');

let donateData = [];
let lastUpdated = null;
let progress = null;
let amountRaised = 0;
let date_from = '2017-12-20';
let date_to = '2017-12-31';
let end = new Date(date_to).getTime() / 1000;
let goal = 8000;

module.exports = function(app) {
  return new Promise((resolve, reject) => {
    if (donateData && lastUpdated &&
        Math.floor((Date.now() - lastUpdated) / (60000)) < 5) {
      // Data was updated within the last 5 mins.
      resolve(donateData);
    } else {
      let options = {
          url: 'https://api.moonclerk.com/payments?date_from=' + date_from + '&date_to=' + date_to,
          headers: {
              'Authorization': 'Token token=' + process.env.MICROGRANTS_MOONCLERK_API_KEY,
              'Accept': 'application/vnd.moonclerk+json;version=1'
          }
      }
      request(options, function(error, response, body) {
          //TODO: Handle errors
          body = JSON.parse(body);
          var payments = null;
          for(i in body) {
              payments = body[i];
              break;
          }
          // Calculate Total
          for(var i in payments) {
              amountRaised += (payments[i].status == 'successful') ? payments[i].amount / 100 : 0;
          }
          progress = {
            amountRaised: amountRaised,
            matchedAmount: 0,
            percent: amountRaised * 100 / goal,
            daysLeft: Math.floor((end - (Date.now()/1000))/(60*60*24))
          };
          lastUpdated = Date.now();
          donateData['progress'] = progress;
          donateData['goal'] = goal;
          resolve(donateData);
        });
      }
  });
}
