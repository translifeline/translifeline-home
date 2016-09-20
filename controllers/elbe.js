'use strict';

const menu = require('./common/menu');

/* A controller for the elbe album download page. */
function controller(app) {
  app.get('/elbe', function (req, res) {
    let data = {
      menu: menu()
    };
    res.render('elbe', data);
  });
}

module.exports = controller;
