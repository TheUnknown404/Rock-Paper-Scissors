// Get references to HTML elements
let textElement1 = document.getElementById("text");
let textElement2 = document.getElementById("results");

// Object to keep track of game statistics, retrieve from localStorage or initialize
let score = JSON.parse(localStorage.getItem("score")) || {
  totalWins: 0,
  totalLosses: 0,
  totalTies: 0,
};

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

// Function to update and display game outcome statistics
function outcome() {
  if (result === "won") {
    score.totalWins++;
    document.getElementById("wins").innerHTML = score.totalWins;
  } else if (result === "tied") {
    score.totalTies++;
    document.getElementById("ties").innerHTML = score.totalTies;
  } else {
    score.totalLosses++;
    document.getElementById("losses").innerHTML = score.totalLosses;
  }
  // Save the updated score to localStorage
  localStorage.setItem("score", JSON.stringify(score));
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

// Function to reset scores
function resetScores() {
  // Reset scores to zero
  score.totalWins = 0;
  score.totalLosses = 0;
  score.totalTies = 0;

  // Update the HTML to display the reset scores
  document.getElementById("wins").innerHTML = score.totalWins;
  document.getElementById("ties").innerHTML = score.totalTies;
  document.getElementById("losses").innerHTML = score.totalLosses;

  // Save the reset scores to localStorage
  localStorage.setItem("score", JSON.stringify(score));
}

// Initialize scores when the page loads
document.getElementById("wins").innerHTML = score.totalWins;
document.getElementById("ties").innerHTML = score.totalTies;
document.getElementById("losses").innerHTML = score.totalLosses;

// Event listeners for user's choices (rock, paper, scissors)
document.getElementById("rock").addEventListener("click", () => handleUserChoice("rock"));
document.getElementById("paper").addEventListener("click", () => handleUserChoice("paper"));
document.getElementById("scissors").addEventListener("click", () => handleUserChoice("scissors"));

// Event listener for the reset button
document.getElementById("reset").addEventListener("click", resetScores);