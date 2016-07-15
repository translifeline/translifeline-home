'use strict';

const home = require('./home');

/*
  Loads controllers for all pages.
*/
function loadControllers(app) {
  home(app);
}

module.exports = loadControllers;
