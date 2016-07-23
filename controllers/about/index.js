'use strict';

const mission = require('./mission');
const faq = require('./faq');
const board = require('./board');
const leadership = require('./leadership');
const staff = require('./staff');

/*
  Loads controllers for all pages under about.
*/
function loadControllers(app) {
  mission(app);
  faq(app);
  board(app);
  leadership(app);
  staff(app);
}

module.exports = loadControllers;
