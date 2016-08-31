'use strict';

const $ = require('jquery-browserify');
const header = require('./header');
const banner = require('./banner');

$(document).ready(function() {
  header($);
  banner($);
});
