'use strict';

const admin = require('./admin');
const banner = require('./banner');
const donate =  require('./donate');

/*
  Loads controllers for all pages under admin.
*/
function loadControllers(app) {
  admin(app);
  banner(app);
  donate(app);
}

module.exports = loadControllers;
