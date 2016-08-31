'use strict';

/*
JS needed by banner features.
*/
function banner($) {
  let numImages = $('.banner ul').attr('data-num');
  $('#banner0').addClass('active');
  let index = 0;
  window.setInterval(
    function() {
      let nextIndex = (index + 1) % numImages;
      console.log('curent:' + index + ' next:' + nextIndex);
      $('#banner'  + index).removeClass('active');
      $('#banner' + nextIndex).addClass('active');
      index = nextIndex;
    },
    5000
  );
}

module.exports = banner;
