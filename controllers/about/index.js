'use strict';

const mission = require('./mission');
const faq = require('./faq');
const contact = require('./contact');

/*
  Loads controllers for all pages under about.
*/
function loadControllers(app) {
  mission(app);
  faq(app);
  contact(app);
}

module.exports = loadControllers;
