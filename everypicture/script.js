// Immediately Invoked Function Expression (IIFE) to encapsulate the code
(function () {
    "use strict"; // Enforces stricter parsing and error handling in the script

    console.log("reading js"); // Logs a message to the console indicating the script is running

    // References to DOM elements used in the overlay zoom feature
    const overlay = document.getElementById('overlay'); // The overlay that will display the zoomed image
    const zoomedImage = document.getElementById('zoomed-image'); // The image element within the overlay for showing the zoomed image
    const closeBtn = document.querySelector('.close'); // The button used to close the overlay
    const imageDescription = document.getElementById('image-description');

    // References and setup for gallery scrolling and caption functionality
    const gallery = document.querySelector('.gallery'); // The container for the gallery images
    const figcaption = document.querySelector('.caption-bar figcaption'); // The figcaption element where captions are updated
    const captions = [ // Array of captions to display for each section of the gallery
        "1. Here are food from different regions, click to see details and scroll to see where they come from and what similarity and difference they have!",
        "2. These are all European food, from French, Portugal, and Turkey! They are really good!!! Can you find which is bovine bone marrow, which is baked apple? ",
        "3. 345",
        "4. 456",
        "5. 567",
        "6. 678"
    ];

    let currentSection = 0; // Tracks the current gallery section being viewed

    // Updates the gallery's caption and adjusts image styling based on the current section
    function adjustGalleryForSection(section) {
        figcaption.innerHTML = captions[section]; // Updates the caption based on the current section

        // Iterates over gallery images to apply transformation and opacity based on their section
        gallery.querySelectorAll('.photo').forEach((img, index) => {
            img.style.transform = ''; // Resets any previous transformations
            img.style.opacity = '1'; // Resets opacity to full

            // Applies a scale transformation to images in the current section for a slight zoom effect
            if (index % 4 === section) {
                img.style.transform = 'scale(1.1)';
            } else {
                img.style.opacity = '0.5'; // Dims images not in the current section
            }
        });
    }

    // Listens for scroll events to update the gallery based on the current viewport section
    window.addEventListener('scroll', () => {
        const scrolledHeight = window.pageYOffset; // Gets the vertical scroll position
        const heightPerSection = window.innerHeight; // Determines the height of each gallery section based on the viewport height
        
        // Calculates the current section based on the scroll position
        let newSection = Math.floor(scrolledHeight / heightPerSection);

        // If the section has changed, updates the gallery to reflect the new section
        if (newSection !== currentSection) {
            currentSection = newSection;
            adjustGalleryForSection(currentSection % captions.length); // Cycles through captions based on the new section
        }
    });

    // Enables zoom functionality on click for each image in the gallery
    // document.querySelectorAll('.gallery img').forEach(img => {
    //     img.addEventListener('click', function() {
    //         zoomedImage.src = this.src; // Sets the zoomed image's source to that of the clicked image
    //         overlay.classList.remove('hidden'); // Shows the overlay
    //         overlay.classList.add('showing'); // Applies a class for potential animation or styling
    //     });
    // });

    document.querySelectorAll('.gallery img').forEach(img => {
        img.addEventListener('click', function() {
            // Example check to ignore clicks on placeholder images
            if (this.alt !== "placeholder") {
                zoomedImage.src = this.src; // Sets the zoomed image's source
                zoomedImage.style.display = 'block'; // Makes the zoomed image visible
                overlay.classList.remove('hidden'); // Shows the overlay
                overlay.classList.add('showing'); // Applies showing class for styling
                imageDescription.textContent = this.dataset.description;
            }
        });
    });
    

    // Closes the overlay when the close button is clicked
    closeBtn.addEventListener('click', function () {
        overlay.classList.add('hidden'); // Hides the overlay
        overlay.classList.remove('showing'); // Removes the showing class for cleanliness
    });

    // Allows closing the overlay by pressing the Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            overlay.classList.add('hidden'); // Hides the overlay
            overlay.classList.remove('showing'); // Removes the showing class
        }
    });

    // Initializes the gallery for the first section upon script execution
    adjustGalleryForSection(0);

    
})(); // End of IIFE
