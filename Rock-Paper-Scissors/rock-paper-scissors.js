// Get references to HTML elements
let textElement1 = document.getElementById("text");
let textElement2 = document.getElementById("results");
let result;

// Variable to store the computer's move
let computerMove;

// Function to determine the computer's move (rock, paper, or scissors)
function opponent() {
  let randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
}

// Variables to keep track of game statistics
let totalWins = 0;
let totalLosses = 0;
let totalTies = 0;

// Function to update and display game outcome statistics
function outcome() {
  if (result === "won") {
    totalWins += 1;
    document.getElementById("wins").innerHTML = totalWins;
  } else if (result === "tied") {
    totalTies += 1;
    document.getElementById("ties").innerHTML = totalTies;
  } else {
    totalLosses += 1;
    document.getElementById("losses").innerHTML = totalLosses;
  }
}

// Function to handle user's choice and determine the game outcome
function handleUserChoice(userChoice) {
  // Display the user's choice
  textElement1.textContent = "You Picked " + userChoice;

  // Determine the computer's move
  opponent();

  // Compare user's choice with the computer's move to determine the result
  if (computerMove === userChoice) {
    result = "tied";
  } else if (
    (userChoice === "rock" && computerMove === "scissors") ||
    (userChoice === "paper" && computerMove === "rock") ||
    (userChoice === "scissors" && computerMove === "paper")
  ) {
    result = "won";
  } else {
    result = "lost";
  }

  // Display the game result
  textElement2.textContent = "You have " + result;

  // Update and display game outcome statistics
  outcome();
}

// Event listeners for user's choices (rock, paper, scissors)
document.getElementById("rock").addEventListener("click", () => handleUserChoice("rock"));
document.getElementById("paper").addEventListener("click", () => handleUserChoice("paper"));
document.getElementById("scissors").addEventListener("click", () => handleUserChoice("scissors"));