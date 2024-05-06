function adjustCanvasSize() {
  var image = document.getElementById('image');
  canvas.width = image.clientWidth; // Set canvas width to image's display width
  canvas.height = image.clientHeight; // Set canvas height to image's display height
}

var canvas = document.getElementById('mosaicCanvas');
var ctx = canvas.getContext('2d');
var rectCoordinates = []; // Array to store each mosaic block's coordinates

canvas.addEventListener('touchmove', function(e) {
  var touch = e.touches[0];
  var rect = canvas.getBoundingClientRect();
  var x = (touch.clientX - rect.left); // Adjusted for any offset
  var y = (touch.clientY - rect.top);
  drawMosaic(x, y, 20); // Example block size of 20 pixels
  e.preventDefault();
}, false);

function drawMosaic(x, y, size) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Example color
  ctx.fillRect(x, y, size, size);
  rectCoordinates.push({x: x, y: y, size: size});
}

function getSelectedArea() {
  if (rectCoordinates.length === 0) {
      alert("No mosaic area has been marked.");
      return;
  }
  var minX = rectCoordinates[0].x;
  var maxX = rectCoordinates[0].x;
  var minY = rectCoordinates[0].y;
  var maxY = rectCoordinates[0].y;

  rectCoordinates.forEach(function(coord) {
      if (coord.x < minX) minX = coord.x;
      if (coord.x + coord.size > maxX) maxX = coord.x + coord.size;
      if (coord.y < minY) minY = coord.y;
      if (coord.y + coord.size > maxY) maxY = coord.y + coord.size;
  });

  alert("Mosaic area bounds:\n" + "Top-left: (" + minX + ", " + minY + ")\n" + 
        "Bottom-right: (" + maxX + ", " + maxY + ")");
}

window.onload = adjustCanvasSize;
  