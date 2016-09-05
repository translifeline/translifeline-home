'use strict';

const $ = require('jquery-browserify');
const header = require('./header');
const banner = require('./banner');
const sidebar = require('./sidebar');

$(document).ready(function() {
  header($);
  banner($);
  sidebar($);
});
