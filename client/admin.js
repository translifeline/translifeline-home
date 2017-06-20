'use strict';

const imageDataUrl = require('./image-data-url');

/*
JS needed by admin features.
*/
function admin($) {
  var image = $('#admin-donate #image-preview').attr('src');

  // Donate data.
  $('#admin-donate #submit').click(function(event) {
    event.preventDefault();
    var image = $('#admin-donate #image').val();
    var title = $('#admin-donate #title').val();
    var text = $('#admin-donate #text').val();
    var alt = $('#admin-donate #alt').val();
    var goal = $('#admin-donate #goal').val();
    var start = $('#admin-donate #start').val();
    var end = $('#admin-donate #end').val();
    var matchMultiplier = $('#admin-donate #match-multiplier').val();
    var matchMax = $('#admin-donate #match-max').val();
    $.ajax({
      type: 'POST',
      url: '/donate',
      data: {
        title: title,
        text: text,
        img: image,
        alt: alt,
        goal: goal,
        start: start,
        end: end,
        matchMultiplier: matchMultiplier,
        matchMax: matchMax
      },
      success: function() {
        window.location =  '/donate';
      }
    });
  });

  // Add banner image.
  $('#add-image #submit').click(function(event) {
    event.preventDefault();
    var link = $('#add-image #link').val();
    var alt = $('#add-image #alt').val();
    var bg = $('#add-image #bg').val();
    var img = $('#add-image #image').val();
    $.ajax({
      type: 'POST',
      url: '/banner',
      data: { img: img, alt: alt, link: link, bg: bg },
      success: function() {
        window.location =  '/admin'
      }
    });
  });

  // Update and delete.
  $('#admin-banner .update a').click(function(event) {
    event.preventDefault();
    var operation = $(this).attr('data-op');
    var id = $(this).attr('data-id');
    if(id && operation === 'update') {
      var link = $('.info[data-id=' + id + '] .link').val();
      var alt = $('.info[data-id=' + id + '] .alt').val();
      var bg = $('.info[data-id=' + id + '] .bg').val();

      $.ajax({
        type: 'PATCH',
        url: '/banner',
        data: {
          id: id,
          link: link,
          alt: alt,
          bg: bg,
        },
        success: function() {
          window.location =  '/admin'
        }
      });
    }
    if(id && operation === 'remove') {
      $.ajax({
        type: 'DELETE',
        url: '/banner',
        data: { id: id },
        success: function() {
          window.location =  '/admin'
        }
      });
    }
  });
}

module.exports = admin;
