'use strict';

const admin = require('./admin');
const banner = require('./banner');
const donate =  require('./donate');
const microgrants = require('./microgrants')

/*
  Loads controllers for all pages under admin.
*/
function loadControllers(app) {
  admin(app);
  banner(app);
  donate(app);
  microgrants(app);
}

module.exports = loadControllers;
