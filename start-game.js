/*********************************************
 * Update the page with the game elements and
 * remove the initial play button.
 *********************************************/

const body = document.querySelector('body');
const contentDiv = document.getElementById('content');

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
        justify-content: space-evenly;
    `;
    // create and add round indicator to scoreboard
    roundCounter = document.createElement('div');
    roundCounter.textContent = 'Round: 1'
    roundCounter.style.fontSize = '24px';
    scoreboard.appendChild(roundCounter);
    // create indicator for player and CPU's score
    const playerScore = document.createElement('div');
    const cpuScore = document.createElement('div');
    playerScore.textContent = 'You: 0';
    cpuScore.textContent = 'CPU: 0';
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
        justify-content: space-evenly;
    `;
    // add a button for each choice
    ['✊', '✋', '✌️'].forEach(choice => {
        // create and style choice button
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.classList.toggle('choice'); // already in styles.css
        choicesWrapper.appendChild(choiceButton);
    });
    // show choices wrapper
    contentDiv.appendChild(choicesWrapper);
}

function showMessage() {
    const message = document.createElement('div');
    message.textContent = 'Make your first choice...';
    message.style.cssText = `
        font-size: 24px;
        margin: 0 24px;
        text-align: center;
    `;
    contentDiv.appendChild(message);
}

// listen for play button to be clicked
document.querySelector('button#play').addEventListener('click', () => {
    // remove start page nodes
    document.getElementById('instructions').remove();
    document.querySelector('button#play').remove();
    // set up initial game
    showScoreboard();
    showCpuChoice();
    showPlayerChoices();
    showMessage();
});