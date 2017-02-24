'use strict';

const menu = require('./common/menu');
const donate = require('./common/donate');

/* A controller for the donate page. */
function controller(app) {
  app.get('/donate', function (req, res) {
    donate(app).then(function(donate) {
      let data = {
        menu: menu(),
        donate: donate
      };
      res.render('donate', data);
    });
  });
}

module.exports = controller;
