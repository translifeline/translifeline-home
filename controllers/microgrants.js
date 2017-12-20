'use strict';

const menu = require('./common/menu');
const microgrants = require('./common/microgrants');

/* A controller for the donate page. */
function controller(app) {
  app.get('/microgrants', function (req, res) {
    if(process.env.MICROGRANTS_DONATE_URI) {
      // If a donate uri is provided, redirect to that instead of using our
      // default donate page. This is useful during fundraising events.
      res.redirect(process.env.MICROGRANTS_DONATE_URI);
    } else {
      microgrants(app).then(function(donate) {
        let data = {
          menu: menu(),
          donate: donate,
        };
        res.render('microgrants', data);
      });
    }
  });
}

module.exports = controller;
