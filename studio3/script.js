(function(){
    "use strict";
    console.log("reading js");

    const startGame = document.getElementById('start');
    const gameControl = document.querySelector('.start-button-container');
    const score1 = document.querySelector('#score-player1');
    const score2 = document.querySelector('#score-player2');
    const dice1 = document.querySelector('.dice1');
    const dice2 = document.querySelector('.dice2');
    const dice3 = document.querySelector('.dice3'); // Add this selector based on your actual HTML
    const dice4 = document.querySelector('.dice4'); // Add this selector based on your actual HTML

    const rollButton = document.querySelector('.roll');
    const passButton = document.querySelector('.pass');
    const message = document.querySelector('#message');

    const gameData = {
        dice: ['photos/dice1.png', 'photos/dice2.png', 'photos/dice3.png', 'photos/dice4.png', 'photos/dice5.png', 'photos/dice6.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '<h2>The Game Has Started</h2>';
        document.getElementById('x').addEventListener('click', function(){
            location.reload();
        });
        setUpTurn();
    });

    function setUpTurn(){
        message.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        showRollAndPassOptions();
        updateActivePlayer();
    }


    /***********THROW DICE FUNCTION***********/
    function throwDice(){
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        updateDiceImages(); // Update the dice images immediately after rolling
    
        gameData.rollSum = gameData.roll1 + gameData.roll2;
    
        if (gameData.rollSum === 2) {
            // Snake eyes logic
            message.innerHTML = '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            updateScores();
            switchPlayer(); // Function to switch player
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            // One of the dice is a one logic
            switchPlayer();
            message.innerHTML = `<p>One of your rolls was a one, switching to ${gameData.players[gameData.index]}</p >`;
        } else {
            // Regular dice roll logic
            gameData.score[gameData.index] += gameData.rollSum;
            updateScores();
            checkWinningCondition();
            showRollAndPassOptions();
        }

    }

    /* 
       Updates the dice images on the game board.
    */
    

       function updateDiceImages() {
        // Check which player's turn it is and update the dice images accordingly
        if (gameData.index === 0) {
            // Update dice images for Player 1
            dice1.src = gameData.dice[gameData.roll1 - 1];
            dice2.src = gameData.dice[gameData.roll2 - 1];
        } else {
            // Update dice images for Player 2
            dice3.src = gameData.dice[gameData.roll1 - 1]; // Assuming dice3 & dice4 are for Player 2
            dice4.src = gameData.dice[gameData.roll2 - 1]; // Adjust according to your actual HTML setup
        }
        
    }
    
    

    /* 
       Switches the turn from the current player to the other player.
    */
    function switchPlayer() {
        gameData.index = (gameData.index === 0) ? 1 : 0;
        setTimeout(function() {
            setUpTurn();
            updateActivePlayer(); // Ensure the visual update happens after the turn is set up
        }, 100); // Ensure this delay does not affect the update of scores and dice images
    }

    function updateActivePlayer() {
        // Select both player elements
        const player1Div = document.getElementById('player1');
        const player2Div = document.getElementById('player2');
    
        // Remove active-player class from both to reset the state
        player1Div.classList.remove('active-player');
        player2Div.classList.remove('active-player');
    
        // Add the active-player class to the current player's div
        if (gameData.index === 0) {
            player1Div.classList.add('active-player');
        } else {
            player2Div.classList.add('active-player');
        }
    }


    /* 
       Updates the scores on the game board.
    */
    function updateScores() {
        score1.innerHTML = `${gameData.players[0]}: ${gameData.score[0]}`;
        console.log(score1.innerHTML);
        score2.innerHTML = `${gameData.players[1]}: ${gameData.score[1]}`;
        console.log(score2.innerHTML);
    }


    const successSound = new Audio('sounds/success.mp3');

    function checkWinningCondition() {

        if (gameData.score[gameData.index] > gameData.gameEnd) {
            successSound.play().catch(error => console.error("Playback failed", error));  
            //? complicated, but don't know how to make this more simple
            gameControl.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2> <br>`;  
            //why <br> doesn't work

            document.getElementById('overlay').classList.add('hidden'); // Hide the overlay, as the game has ended
    
            gameControl.innerHTML += '<button id="newGame">Start a New Game</button>';
            
            document.getElementById('newGame').addEventListener('click', function () {
                location.reload();
            });
        } else {
            updateScores();
        }
    }


    /* 
       Shows the roll and pass options for the current player.
    */

    function showRollAndPassOptions() {
    
        // Clear existing event listeners to prevent duplicates
        rollButton.removeEventListener('click', throwDice);
        passButton.removeEventListener('click', passTurn);
    
        // Add an event listener to the 'roll' button
        rollButton.addEventListener('click', throwDice);
    
        // Add an event listener to the 'pass' button
        passButton.addEventListener('click', passTurn);
    }



    /* 
       Handles the action when a player passes their turn.
    */
    function passTurn(){
        gameData.index = gameData.index === 0 ? 1 : 0; // Switch to the next player
        setUpTurn();
    }

    
    //------------------------------overlay---------------------------------
    document.getElementById('start').addEventListener('click', function() {
        document.getElementById('overlay').classList.remove('hidden');
    });
    
    document.getElementById('x').addEventListener('click', function() {
        document.getElementById('overlay').classList.add('hidden');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.getElementById('overlay').className = 'hidden';
        }
    });

    //-------------------sound--------------------------
    // const clickBtn = document.getElementById('start');
    // // const clickStart = document.getElementById('newGame');
    // const clickSound = new Audio('sounds/click.mp3');

    // clickBtn.addEventListener('mousedown', function () {
    //     clickSound.play();
    // });
    // clickStart.addEventListener('mousedown', function () {
    //     clickSound.play();
    // });

    // const closeBtn = document.getElementById('x');
    // const closeSound = new Audio('sounds/close.mp3');

    // closeBtn.addEventListener('mousedown', function () {
    //     closeSound.play();
    // });
    
    

    document.addEventListener('DOMContentLoaded', function() {
        // Existing setup for the start button sound
        const clickBtn = document.getElementById('start');
        const clickSound = new Audio('sounds/click.mp3');

        const diceRollSound = new Audio('sounds/diceroll.mp3');

        clickBtn.addEventListener('mousedown', function () {
            clickSound.play();
        });
    
        // Setup for the roll button sound
        const rollButton = document.querySelector('.roll'); // Assumes there's a single element with class 'roll'
        rollButton.addEventListener('mousedown', function() {
            diceRollSound.play();
        });
    
        // Setup for the pass button sound
        const passButton = document.querySelector('.pass'); // Assumes there's a single element with class 'pass'
        passButton.addEventListener('mousedown', function() {
            diceRollSound.play();
        });
    
        // Existing setup for the close button sound
        const closeBtn = document.getElementById('x');
        const closeSound = new Audio('sounds/close.mp3');

        closeBtn.addEventListener('mousedown', function () {
            closeSound.play();
        });



    });
    
    


})();




