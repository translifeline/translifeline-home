'use strict';

const admin = require('./admin');
const banner = require('./banner');

/*
  Loads controllers for all pages under admin.
*/
function loadControllers(app) {
  admin(app);
  banner(app);
}

module.exports = loadControllers;
