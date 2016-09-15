'use strict';

/*
JS for image upload.
*/
function getImageDataUrl(file, maxWidth, maxHeight, successFunction) {
  // A Temporary img element is passed to our resizeImage() function to resize
  var image = document.createElement('img');
  var reader = new FileReader();
  reader.onloadend = function() {
    image.src = reader.result;
    successFunction(resizeImage(image, maxWidth, maxHeight));
  }
  if (file && file.type.match(/image.*/)) {
    reader.readAsDataURL(file);
  }
}

// Takes an image element, resizes and returns a dataUrl for the resulting image
function resizeImage(image, maxWidth, maxHeight) {
  // We load the given img element into a canvas element which we will use to process the image.
  var canvas = document.createElement('canvas');
  var width = image.width;
  var height = image.height;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL();
}

module.exports = getImageDataUrl;
