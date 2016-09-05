'use strict';

/*
JS needed by sidebar features.
*/
function sidebar($) {
  $('#validate').hide();
  $('#required').hide();
  $('#submit').click(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    var first = $('#first').val();
    var last = $('#last').val();
    if(email) {
      $.ajax({
        type: 'POST',
        url: '/subscribe',
        data: { email: email, first: first, last: last },
        success: function() {
          console.log('success');
          $('#validate').show();
          $('#required').hide();
          $('#subscribe').hide();
        },
        dataType: 'json'
      });
    } else {
      $('#required').show();
    }
  });
}

module.exports = sidebar;
