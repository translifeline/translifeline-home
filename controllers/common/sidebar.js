'use strict';

/* A controller for the sidebar. */
function controller(app) {
  app.post('/subscribe', function(req, res) {
    if (!req.body || !req.body.email) {
      res.status(400).end();
    }

    let email = req.body.email;
    let merge = {};
    if(req.body.first) {
      merge['FNAME'] = req.body.first;
    }
    if(req.body.last) {
      merge['LNAME'] = req.body.last;
    }

    if(process.env.MAILCHIMP_KEY || process.env.MAILCHIMP_LIST_ID) {
      const mcapi = require('mailchimp-api/mailchimp');
      let mc = new mcapi.Mailchimp(process.env.MAILCHIMP_KEY);

      mc.lists.subscribe({id: process.env.MAILCHIMP_LIST_ID, email:{email: email}, merge_vars: merge}, function() {
        res.status(200).end();
      },
      function(err) {
        console.log(err);
        res.status(500).end();
      });
    } else {
      console.log('MAILCHIMP_KEY or MAILCHIMP_LIST_ID not set.');
    }
  });
}

module.exports = controller;
