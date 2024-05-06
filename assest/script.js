// Adjust canvas size to match the image when the image loads
function adjustCanvasSize() {
  var image = document.getElementById('image');
  var canvas = document.getElementById('mosaicCanvas');
  canvas.width = image.clientWidth; // Set canvas width to image displayed width
  canvas.height = image.clientHeight; // Set canvas height to image displayed height
}

// Function to apply a mosaic effect within the selected rectangle area
// This is just a placeholder and should be replaced with actual mosaic application logic
function applyMosaic(x, y, width, height) {
  var canvas = document.getElementById('mosaicCanvas');
  var ctx = canvas.getContext('2d');
  // Your mosaic effect code would go here
  console.log(`Mosaic applied to area: ${x}, ${y}, ${width}, ${height}`);
}

var canvas = document.getElementById('mosaicCanvas');
var ctx = canvas.getContext('2d');
var startX, startY, isDrawing = false;

// Listen for touch start event
canvas.addEventListener('touchstart', function(e) {
  var rect = canvas.getBoundingClientRect(); // Get canvas position and size
  var touch = e.touches[0]; // Get the first touch object
  startX = touch.clientX - rect.left; // Calculate the x coordinate relative to the canvas
  startY = touch.clientY - rect.top; // Calculate the y coordinate relative to the canvas
  isDrawing = true; // Set drawing flag to true
  e.preventDefault(); // Prevent default touch behaviors like scroll
}, false);

// Listen for touch move event
canvas.addEventListener('touchmove', function(e) {
  if (isDrawing) { // Check if drawing mode is active
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
    var endX = touch.clientX - rect.left;
    var endY = touch.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath(); // Begin a new path
    ctx.rect(startX, startY, endX - startX, endY - startY); // Draw a rectangle from start to current touch point
    ctx.stroke(); // Render the outline of the rectangle
    e.preventDefault(); // Prevent default behaviors
  }
}, false);

// Listen for touch end event
canvas.addEventListener('touchend', function(e) {
  if (isDrawing) { // Check if drawing mode was active
    var rect = canvas.getBoundingClientRect();
    var touch = e.changedTouches[0];
    var endX = touch.clientX - rect.left;
    var endY = touch.clientY - rect.top;

    // Finalize drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Optionally clear the canvas or leave the rectangle
    ctx.beginPath();
    ctx.rect(startX, startY, endX - startX, endY - startY);
    ctx.stroke();

    // Apply mosaic effect within the rectangle
    applyMosaic(startX, startY, endX - startX, endY - startY);

    // Output coordinates for debugging
    alert(`Rectangle coordinates: startX: ${startX}, startY: ${startY}, endX: ${endX}, endY: ${endY}`);
    isDrawing = false; // Reset drawing flag
    e.preventDefault();
  }
}, false);
