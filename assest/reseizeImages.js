function resizeImages() {
    var imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(function(container) {
        var image = container.querySelector('img');
        if (image) {
            var containerWidth = container.offsetWidth;
            var imageNaturalWidth = image.naturalWidth;
            var imageNaturalHeight = image.naturalHeight;
            var aspectRatio = imageNaturalWidth / imageNaturalHeight;
            var newHeight = containerWidth / aspectRatio;
            image.style.height = newHeight + 'px';
        }
    });
}

// Call the function on window resize
window.addEventListener('resize', resizeImages);

// Initial resize on page load
window.addEventListener('load', resizeImages);
