/*********************************************
 * Update the page with the game elements and
 * play Rock, Paper, Scissors!
 *********************************************/

const body = document.querySelector('body');
const contentDiv = document.getElementById('content');

let isPlayingGame = false;
let currentRound = 1;
let currentPlayerScore = 0;
let currentCpuScore = 0; 

/**
 * Show the current score and round below the
 * title.
 */
function showScoreboard() {
    // create and style scorebaord
    const scoreboard = document.createElement('div');
    scoreboard.style.cssText = `
        width: 100%;
        margin-top: 24px;
        display: flex;
        justify-content: space-evenly;`;
    // create and add round indicator to scoreboard
    const roundCounter = document.createElement('div');
    roundCounter.style.fontSize = '24px';
    roundCounter.textContent = `Round: ${currentRound}`;
    roundCounter.setAttribute('id', 'round-counter');
    scoreboard.appendChild(roundCounter);
    // create indicator for player and CPU's score
    const playerScore = document.createElement('div');
    const cpuScore = document.createElement('div');
    playerScore.setAttribute('id', 'player-score');
    cpuScore.setAttribute('id', 'cpu-score');
    playerScore.textContent = `You: ${currentPlayerScore}`;
    cpuScore.textContent = `CPU: ${currentCpuScore}`;
    [playerScore, cpuScore].forEach(score => {
        score.style.fontSize = '24px';
        scoreboard.appendChild(score);
    });
    // show scoreboard
    body.insertBefore(scoreboard, content);
}

/**
 * Show the CPU's choice, which is initially
 * unknown.
 */
function showCpuChoice() {
    const cpuChoice = document.createElement('div');
    cpuChoice.textContent = '🤔';
    cpuChoice.classList.toggle('choice'); // already in styles.css
    contentDiv.appendChild(cpuChoice);
}

/**
 * Show buttons for rock, paper, and scissors
 * that the player can choose from.
 */
function showPlayerChoices() {
    // create and style choices wrapper
    const choicesWrapper = document.createElement('div');
    choicesWrapper.style.cssText = `
        width: 100%;
        display: flex;
        justify-content: space-evenly;`;
    // add a button for each choice to choices wrapper
    ['✊', '✋', '✌️'].forEach(choice => {
        // create and style choice button
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', () => { playRound(choice); });
        choiceButton.classList.toggle('choice'); // already in styles.css
        choicesWrapper.appendChild(choiceButton);
    });
    // show choices wrapper
    contentDiv.appendChild(choicesWrapper);
}

/**
 * Show a message at the bottom of the scren that
 * informs the player of the result of each round.
 * Initially asks the player to make a choice.
 */
function showRoundMessage() {
    const roundMessage = document.createElement('div');
    roundMessage.textContent = 'Make your first choice...';
    roundMessage.style.cssText = `
        font-size: 24px;
        margin: 0 24px;
        text-align: center;`;
    roundMessage.setAttribute('id', 'round-message');
    contentDiv.appendChild(roundMessage);
}

/**
 * Randomly chooses what the CPU will play in a round.
 * @returns The CPU's choice.
 */
 function getCpuChoice() {
    let choices = ['✊', '✋', '✌️'];
	const cpuChoice = Math.floor(Math.random() * 3); // no need to add 1 because desired indexes range from 0-2
	return choices[cpuChoice];
}

/**
 * Displays the results of the round on the scoreboard.
 * @param {string} result 
 * @param {string} message 
 */
function displayResults(result, message) {
    switch(result) {
        case 'win':
            document.getElementById('player-score').textContent = `You: ${currentPlayerScore}`;
            break;
        case 'loss':
            document.getElementById('cpu-score').textContent = `CPU: ${currentCpuScore}`;
            break;
    }
    if (currentRound <= 5)
        document.getElementById('round-counter').textContent = `Round: ${currentRound}`;
    else
        document.getElementById('round-counter').textContent = 'GAME OVER';
    document.getElementById('round-message').textContent = message;
}

/**
 * Plays a round of RPS and determines the winner
 * based on the fact that choices[i] beats
 * choices[i + 1]. Only plays if the game is still
 * ongoing.
 * @param {string} playerChoice The player's choice of rock, paper, or scissors.
 */
function playRound(playerChoice) {
    // only play if game is not over yet
    if (!isPlayingGame) return;
    // determine result of the round
    let result;
    let message;
    let cpuChoice = getCpuChoice();
    let choices = ['✊', '✋', '✌️', '✊'];
    if (choices.lastIndexOf(playerChoice) == choices.indexOf(cpuChoice) + 1) {
		message = `You win, ${playerChoice} beats ${cpuChoice}!`;
        result = 'win';
        currentPlayerScore++;
    } else if (choices.lastIndexOf(cpuChoice) == choices.indexOf(playerChoice) + 1) {
		message = `You lose, ${playerChoice} gets beaten by ${cpuChoice}!`;
        result = 'loss';
        currentCpuScore++;
    } else {
		message = `It's a draw! You both picked ${playerChoice}.`;
        result = 'draw';
    }
    // update current round and game status if necessary
    if (result != 'draw')
        currentRound++;
    // update  scoreboard with the results
    displayResults(result, message);
    // end game if round five is over
    if (currentRound > 5)
        endGame();
}

/**
 * Ends the game of RPS and displays the results.
 * Displays a rematch button to play again.
 */
function endGame() {
    // decide result of the game
    isPlayingGame = false;
    let gameOutcome;
    if (currentPlayerScore > currentCpuScore)
        gameOutcome = "You won the game! Good job!";
    else if (currentCpuScore > currentPlayerScore) 
        gameOutcome = "You lost the game..."
    else
        gameOutcome = "The game ended in a draw.";
    // display result of the game
    document.getElementById('round-message').textContent = gameOutcome;
    // display a rematch button
    showRematchButton();
}

/**
 * Displays a rematch button when the game is over.
 * Pressing the button resets the game.
 */
function showRematchButton() {
    // create and style rematch button
    rematchButton = document.createElement('button');
    rematchButton.classList.toggle('play');
    rematchButton.textContent = "REMATCH";
    // reset game when pressed
    rematchButton.addEventListener('click', () => {
        rematchButton.remove();
        isPlayingGame = true;
        currentRound = 1;
        currentPlayerScore = 0;
        currentCpuScore = 0;
        document.getElementById('round-counter').textContent = 'Round: 1';
        document.getElementById('player-score').textContent = 'You: 0';
        document.getElementById('cpu-score').textContent = 'CPU: 0';
    });
    // display rematch button
    contentDiv.appendChild(rematchButton);
}

// listen for play button to be clicked
document.querySelector('button.play').addEventListener('click', () => {
    // remove start page nodes
    document.getElementById('instructions').remove();
    document.querySelector('button.play').remove();
    // set up initial game
    showScoreboard();
    showCpuChoice();
    showPlayerChoices();
    showRoundMessage();
    // update game status
    isPlayingGame = true;
});