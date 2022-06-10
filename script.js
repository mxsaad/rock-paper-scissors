/**
 * Rely on the fact that the play at the nth index loses
 * to the play at the (n + 1)th index, hence the duplicate
 * "rock" entry at the end to beat scissors.
 * */
const choices = ["rock", "paper", "scissors", "rock"];

/**
 * Randomly chooses what the CPU will play in a round.
 * @returns The CPU's choice.
 */
function getCpuChoice() {
	const cpuChoice = Math.floor(Math.random() * 3); // no need to add 1 because desired indexes range from 0-2
	return choices[cpuChoice];
}

/**
 * Prompts the user for what they choose to play.
 * @returns The player's choice.
 */
function getPlayerChoice() {
	let playerChoice;
	do {
		playerChoice = prompt("What will you play? (rock/paper/scissors): ").toLowerCase().trim();
	} while (choices.indexOf(playerChoice) < 0);
	return playerChoice;
}

/**
 * Play a round given both players' choices.
 * @param {string} cpuChoice The CPU's choice.
 * @param {string} playerChoice The player's choice.
 * @returns The result of the round.
 */
function playRound(cpuChoice, playerChoice) {
	let roundMessage;
	if (choices.lastIndexOf(playerChoice) == choices.indexOf(cpuChoice) + 1)
		roundMessage = `You win, ${playerChoice} beats ${cpuChoice}!`;
	else if (choices.lastIndexOf(cpuChoice) == choices.indexOf(playerChoice) + 1)
		roundMessage = `You lose, ${playerChoice} gets beaten by ${cpuChoice}!`;
	else
		roundMessage = `It's a draw! You both picked ${playerChoice} ${cpuChoice}.`;
	return roundMessage;
} 

/**
 * Play a game consisting of five rounds.
 * @returns The result of the game.
 */
function playGame() {
	let playerWins = 0,
		cpuWins = 0;
	for (let i = 1; i <= 5; i++) {
		// play a round
		let cpuChoice = getCpuChoice(),
			playerChoice = getPlayerChoice();
		let roundMessage = playRound(cpuChoice, playerChoice);
		// display the reuslts of the round
		console.log(roundMessage);
		if (roundMessage.includes("win"))
			playerWins++;
		else if (roundMessage.includes("lose"))
			cpuWins++;
		console.log(`You've won ${playerWins} rounds so far.`);
	}
	// find the result of the game
	if (playerWins > cpuWins)
		return "You won the game!";
	else if (cpuWins > playerWins)
		return "You lost the game..."
	else
		return "The game ends in a draw."
}

// play the game!
console.log(playGame());