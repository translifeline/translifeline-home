'use strict';

const admin = require('./admin');

/*
  Loads controllers for all pages under about.
*/
function loadControllers(app) {
  admin(app);
}

module.exports = loadControllers;
