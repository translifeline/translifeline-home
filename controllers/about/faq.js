'use strict';

const menu = require('../common/menu');
const banner = require('../common/banner')

/* A controller for the home page. */
function controller(app) {
  app.get('/faq', function (req, res) {
    banner(app).then(function(banner) {
      let data = {
        menu: menu(),
        showBanner: true,
        banner: banner,
        showSidebar: true
      };
      res.render('about/faq', data);
    });
  });
}

module.exports = controller;
