(function () {
    "use strict";
    console.log("reading js");

    // Select DOM elements
    const form = document.getElementById('madLibsForm');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.close');
    const storyResult = document.getElementById('storyResult');

    // Event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Capture the input values
        const animal = document.getElementById('animal').value;
        const food = document.getElementById('food').value;
        const emotion = document.getElementById('emotion').value;
        const adjective = document.getElementById('adjective').value;
        const sound = document.getElementById('sound').value;
        const verb1 = document.getElementById('verb1').value;
        const verb2 = document.getElementById('verb2').value;
        const verb3 = document.getElementById('verb3').value;

        // Construct the story
        const story = `A hungry ${animal} found a basket full of ${food}. He was ${emotion} and started eating. As he ate, he grew ${adjective} and eventually got stuck in the basket. He made a ${sound}, realizing that his greed had trapped him. A ${adjective} old mouse heard his noise and advised, “${verb1} some more ${food} and do a little dance with each ${verb2}.” The young mouse did so. To his surprise, his little ${food} dance worked! He is able to ${verb3} the blanket. He thanked the old mouse and vowed to never let greed lead him into trouble again.`;

        // Display the story in the overlay
        storyResult.textContent = story;
        overlay.classList.remove('hidden');
        overlay.classList.add('showing');
    });

    // Close button event listener
    closeBtn.addEventListener('click', function () {
        overlay.className = "hidden";
    });

    document.querySelector('.open').addEventListener('click', function(){
        document.querySelector('#overlay').className = "showing";
    });

    document.querySelector('.close').addEventListener('click', function(){
        document.querySelector('#overlay').className = "hidden";
    });

    // 'Escape' key event listener
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('#overlay').className='hidden';
        }
    });

})();
