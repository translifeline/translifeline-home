'use strict';

const menu = require('./common/menu');

/* A controller for the home page. */
function controller(app) {
  app.get('/', function (req, res) {
    let data = {
      menu: menu()
    };
    res.render('index', data);
  });
}

module.exports = controller;
