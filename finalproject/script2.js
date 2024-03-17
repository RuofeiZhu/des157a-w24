(function () {
    'use strict';
    console.log("reading js");

    //---------------------------Overlay----------------------------//
    const overlay = document.querySelectorAll('.overlay');

    function closeOverlay() {
        overlay.forEach(function (overlayItem) {
            overlayItem.classList.add('hidden');
            // overlayItem.classList.add('showing');
        });
    } //hides overlay initially

    document.querySelectorAll('.close').forEach(function (closeButton) {
        closeButton.addEventListener('click', function (event) {
            event.preventDefault();
            closeOverlay();
        }); //close overlay when close button is clicked
    });

    overlay.forEach(function (overlayItem) {
        overlayItem.addEventListener('click', function (event) {
            if (event.target === overlayItem) {
                closeOverlay();
            }
        }); //close overlay when background is clicked
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeOverlay();
        }
    }); //close overlay when esc key pressed

    window.addEventListener('load', function () {
        'use strict';
    
        // Add event listener to each photo for click
        const photos = document.querySelectorAll('.photo');
        photos.forEach(function (photo) {
            photo.addEventListener('click', function (event) {
                // Prevent the default action of the click event
                event.preventDefault();
    
                // Get the ID of the corresponding overlay from the data-overlay attribute
                const overlayId = this.getAttribute('data-overlay');
    
                // Hide all overlays
                const overlays = document.querySelectorAll('.overlay');
                overlays.forEach(function (overlay) {
                    overlay.classList.add('hidden');
                });
    
                // Show the overlay associated with the clicked image
                const overlay = document.querySelector(overlayId);
                overlay.classList.remove('hidden');
            });
        });
    });

 //------------------------Photo Zoom and Highlight-------------------------------//
 window.addEventListener('load', function () {
    const photos = document.querySelectorAll('.photo');
    let currentPhotoIndex = 0;

    // Function to update the caption
    function updateCaption(captionText) {
        const captionBar = document.querySelector('.animate-enterup');
        if (captionBar) {
            captionBar.textContent = captionText;
        }
    }

    // Function to zoom and highlight the photo
    function zoomAndHighlightPhoto() {
        // Skip placeholders
        while (photos[currentPhotoIndex].alt === " ") {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        }

        photos.forEach((photo, index) => {
            if (index === currentPhotoIndex) {
                photo.classList.add('zoomed');
                photo.style.opacity = '1';
                updateCaption(photo.alt);
            } else {
                photo.classList.remove('zoomed');
                photo.style.opacity = '0.5';
            }
        });

        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    }

    // Initialize the interval with a delay
    setTimeout(() => {
        setInterval(zoomAndHighlightPhoto, 2000); // Change photo every 2 seconds
    }, 3000); // Start after 4 seconds delay

    // Make placeholders unclickable
    photos.forEach(photo => {
        photo.addEventListener('click', (event) => {
            if (photo.alt === " ") {
                event.preventDefault(); // Prevent action if placeholder
            } else {
                // Your code to handle click for non-placeholder images
            }
        });
    });

    //------------------------Caption Draggable-------------------------------//
    const captionBar = document.querySelector('.caption-bar');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    captionBar.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - captionBar.offsetLeft;
        offsetY = event.clientY - captionBar.offsetTop;
        captionBar.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            captionBar.style.left = event.clientX - offsetX + 'px';
            captionBar.style.top = event.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        captionBar.style.cursor = 'grab';
    });
});




})();
