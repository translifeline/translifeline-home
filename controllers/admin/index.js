'use strict';

const admin = require('./admin');

/*
  Loads controllers for all pages under about.
*/
function loadControllers(app) {
  // TODO(nina): Restrict to authenticated users.
  admin(app);
}

module.exports = loadControllers;
