function adjustCanvasSize() {
  var image = document.getElementById('image');
  var canvas = document.getElementById('mosaicCanvas');
  // 使用图片的自然尺寸，而不是其可能被CSS样式调整后的显示尺寸
  canvas.width = image.naturalWidth;  // Set canvas width to image's original width
  canvas.height = image.naturalHeight;  // Set canvas height to image's original height
}

function drawMosaic(x, y, size) {
  var blockSize = size;
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";  // Semi-transparent white
  ctx.fillRect(x, y, blockSize, blockSize);
  rectCoordinates.push({x: x, y: y, size: blockSize});
}

var canvas = document.getElementById('mosaicCanvas');
var ctx = canvas.getContext('2d');
var rectCoordinates = []; // To store coordinates of each mosaic block

canvas.addEventListener('touchstart', function(e) {
  e.preventDefault();
});

canvas.addEventListener('touchmove', function(e) {
  if (e.touches.length > 0) {
    var touch = e.touches[0];
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width; // 关键：计算X轴的缩放因子
    var scaleY = canvas.height / rect.height; // 关键：计算Y轴的缩放因子
    var x = (touch.clientX - rect.left) * scaleX; // 转换触摸坐标到画布坐标
    var y = (touch.clientY - rect.top) * scaleY; // 转换触摸坐标到画布坐标
    drawMosaic(x, y, 20);  // 假设马赛克块大小为20
  }
  e.preventDefault();
}, false);

canvas.addEventListener('touchend', function(e) {
  e.preventDefault();
});

// 确保图片加载完毕后调整画布大小
window.addEventListener('load', adjustCanvasSize);
