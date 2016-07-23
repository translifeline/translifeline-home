'use strict';

const menu = require('../common/menu');
const banner = require('../common/banner')

/* A controller for the home page. */
function controller(app) {
  app.get('/leadership', function (req, res) {
    let data = {
      menu: menu(),
      showBanner: true,
      banner: banner()
    };
    res.render('about/leadership', data);
  });
}

module.exports = controller;
