'use strict';

let donateData = null;
let lastUpdated = null;

module.exports = function(app) {
  return new Promise((resolve, reject) => {
    if (donateData && lastUpdated &&
        Math.floor((Date.now() - lastUpdated) / (60000)) < 5) {
      // Data was updated within the last 5 mins.
      resolve(donateData);
    } else {
      let db = app.get('database');
      db.collection('microgrants').findOne({}).then((donate) => {
        let start = Date.parse(donate.start) / 1000;
        let end = Date.parse(donate.end) / 1000;
        db.collection('microgrants-charges').aggregate([
          { $match: { created: {$gte: start, $lt: end} } },
          { $group: { _id: null, amountRaised: {$sum: '$amount'} } }
        ]).next((err, result) => {
          if(err) {
            console.log(err);
            reject(err);
          } else {
            let amountRaised = result.amountRaised / 100; // Stripe returns amounts in cents.
            donate['progress'] = {
              amountRaised: amountRaised,
              matchedAmount: Math.max(donate.matchMax, amountRaised * donate.matchMultiplier),
              percent: (amountRaised * 100) / donate.goal,
              daysLeft: Math.floor((end - (Date.now()/1000))/(60*60*24))
            }
            donateData = donate;
            lastUpdated = Date.now();
            resolve(donateData);
          }
        });
      });
    }
  });
};
