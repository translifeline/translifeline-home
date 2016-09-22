'use strict';

/*
JS needed by banner features.
*/
function banner($) {
  let numImages = $('.banner ul').attr('data-num');
  $('#banner0').addClass('active');
  if (numImages > 1) {
    let index = 0;
    window.setInterval(
      function() {
        let nextIndex = (index + 1) % numImages;
        $('#banner'  + index).removeClass('active');
        $('#banner' + nextIndex).addClass('active');
        index = nextIndex;
      },
      5000
    );
  }

  $('.banner').height($('.banner img').height());
}

module.exports = banner;
