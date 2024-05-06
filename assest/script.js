function adjustCanvasSize() {
  var image = document.getElementById('image');
  var canvas = document.getElementById('mosaicCanvas');
  canvas.width = image.clientWidth;  // Adjusting canvas width to match displayed image width
  canvas.height = image.clientHeight;  // Adjusting canvas height to match displayed image height
}

function applyMosaic() {
  var canvas = document.getElementById('mosaicCanvas');
  var ctx = canvas.getContext('2d');
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  // Sample mosaic effect by averaging colors in 10x10 pixel blocks
  var blockSize = 10; // Size of each block for the mosaic
  var width = imageData.width;
  var height = imageData.height;

  for (var y = 0; y < height; y += blockSize) {
    for (var x = 0; x < width; x += blockSize) {
      var red = 0, green = 0, blue = 0, alpha = 0, count = 0;

      // Calculate the average color of the block
      for (var ny = 0; ny < blockSize; ny++) {
        for (var nx = 0; nx < blockSize; nx++) {
          var ix = (y + ny) * width + (x + nx);
          if (ix >= data.length) continue; // Skip if the index is out of bounds
          red += data[ix * 4];
          green += data[ix * 4 + 1];
          blue += data[ix * 4 + 2];
          alpha += data[ix * 4 + 3];
          count++;
        }
      }

      // Set the average color to each pixel in the block
      for (var ny = 0; ny < blockSize; ny++) {
        for (var nx = 0; nx < blockSize; nx++) {
          var ix = (y + ny) * width + (x + nx);
          if (ix >= data.length) continue; // Skip if the index is out of bounds
          data[ix * 4] = red / count;
          data[ix * 4 + 1] = green / count;
          data[ix * 4 + 2] = blue / count;
          data[ix * 4 + 3] = alpha / count;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

var canvas = document.getElementById('mosaicCanvas');
var ctx = canvas.getContext('2d');
var startX, startY, endX, endY;

canvas.addEventListener('touchstart', function(e) {
  var touch = e.touches[0];
  startX = touch.clientX - canvas.offsetLeft;
  startY = touch.clientY - canvas.offsetTop;
  e.preventDefault();
});

canvas.addEventListener('touchmove', function(e) {
  var touch = e.touches[0];
  endX = touch.clientX - canvas.offsetLeft;
  endY = touch.clientY - canvas.offsetTop;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.beginPath();
  ctx.rect(startX, startY, endX - startX, endY - startY); // Draw the rectangle
  ctx.stroke();
  e.preventDefault();
});

canvas.addEventListener('touchend', function(e) {
  applyMosaic(); // Apply mosaic to the selected area
  alert(`Selected area coordinates: startX: ${startX}, startY: ${startY}, endX: ${endX}, endY: ${endY}`);
  e.preventDefault();
});
