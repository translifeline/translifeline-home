'use strict';

const menu = require('./common/menu');
const donate = require('./common/donate');

/* A controller for the donate page. */
function controller(app) {
  app.get('/donate', function (req, res) {
    if(process.env.DONATE_URI) {
      // If a donate uri is provided, redirect to that instead of using our
      // default donate page. This is useful during fundraising events.
      res.redirect(process.env.DONATE_URI);
    } else {
      donate(app).then(function(donate) {
        let data = {
          menu: menu(),
          donate: donate
        };
        res.render('donate', data);
      });
    }
  });
}

module.exports = controller;
