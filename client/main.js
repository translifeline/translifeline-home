'use strict';

const $ = require('jquery-browserify');
const header = require('./header');
const banner = require('./banner');
const sidebar = require('./sidebar');
const admin = require('./admin');

$(document).ready(function() {
  header($);
  banner($);
  sidebar($);
  admin($);
});
