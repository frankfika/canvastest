function getSelectedArea() {
  var image = document.getElementById('image');
  var canvas = document.getElementById('mosaicCanvas');
  var ctx = canvas.getContext('2d');
  
  var imageRect = image.getBoundingClientRect();
  var canvasRect = canvas.getBoundingClientRect();
  
  var relativeX = (canvasRect.left - imageRect.left) / imageRect.width;
  var relativeY = (canvasRect.top - imageRect.top) / imageRect.height;
  var relativeWidth = canvasRect.width / imageRect.width;
  var relativeHeight = canvasRect.height / imageRect.height;
  
  console.log("相对位置信息：");
  console.log("相对X坐标: " + relativeX);
  console.log("相对Y坐标: " + relativeY);
  console.log("相对宽度: " + relativeWidth);
  console.log("相对高度: " + relativeHeight);
  
  // Apply mosaic effect to the selected area
  ctx.drawImage(image, relativeX * image.width, relativeY * image.height, relativeWidth * image.width, relativeHeight * image.height, 0, 0, canvas.width, canvas.height);
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    for (var j = 0; j < 3; j++) {
      data[i + j] = Math.floor(data[i + j] / 20) * 20; // Apply mosaic effect
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

var image = document.getElementById('image');
var canvas = document.getElementById('mosaicCanvas');
var ctx = canvas.getContext('2d');
var startX, startY, endX, endY;

canvas.addEventListener('touchstart', function(e) {
  var touch = e.touches[0];
  startX = touch.clientX - canvas.offsetLeft;
  startY = touch.clientY - canvas.offsetTop;
});

canvas.addEventListener('touchmove', function(e) {
  e.preventDefault();
  var touch = e.touches[0];
  endX = touch.clientX - canvas.offsetLeft;
  endY = touch.clientY - canvas.offsetTop;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect(Math.min(startX, endX), Math.min(startY, endY), Math.abs(endX - startX), Math.abs(endY - startY));
});

canvas.addEventListener('touchend', function(e) {
  getSelectedArea();
});
