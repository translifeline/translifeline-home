'use strict';

const menu = require('./common/menu');
const banner = require('./common/banner')

/* A controller for the home page. */
function controller(app) {
  app.get('/donate', function (req, res) {
    banner(app).then(function(banner) {
      let data = {
        menu: menu()
      };
      res.render('donate', data);
    });
  });
}

module.exports = controller;
