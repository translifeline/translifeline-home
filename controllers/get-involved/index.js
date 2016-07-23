'use strict';

const help = require('./help');
const resources = require('./host-resources');
const fundraiser = require('./fundraiser');

/*
  Loads controllers for all pages under "Get Involved".
*/
function loadControllers(app) {
  help(app);
  resources(app);
  fundraiser(app);
}

module.exports = loadControllers;
