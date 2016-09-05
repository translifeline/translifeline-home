'use strict';

const about = require('./about');
const home = require('./home');
const getInvolved = require('./get-involved');
const donate = require('./donate');
const press = require('./press');
const sidebar = require('./common/sidebar');

/*
  Loads controllers for all pages.
*/
function loadControllers(app) {
  home(app);
  about(app);
  getInvolved(app);
  donate(app);
  press(app);
  sidebar(app);
}

module.exports = loadControllers;
