'use strict';

/*
JS needed by header features.
*/
function header($) {
  $('#menu-button').click(function() {
    $('nav').toggleClass('expanded');
    $('#menu-button').hide();
  });
  $('nav').click(function() {
    $('nav').removeClass('expanded');
    $('#menu-button').show();
  });
  $('.menu span').click(function() {
    $(this).siblings('.submenu').toggleClass('submenu-collapsed');
    $(this).children('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
    event.stopPropagation();
  });
}

module.exports = header;
