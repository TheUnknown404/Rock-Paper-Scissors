// Event listener for when the DOM content has loaded
document.addEventListener('DOMContentLoaded', function () {

  // Selecting HTML elements for wins, ties, and losses
  let lossesHTML = document.querySelector('.losses');
  let winsHTML = document.querySelector('.wins');
  let tiesHTML = document.querySelector('.ties');

  // Store the results and check for errors while storing them in local storage
  let results = {};
  const storedResults = localStorage.getItem('results');
  if (storedResults) {
    try {
      results = JSON.parse(storedResults);
    } catch (error) {
      console.error('Error parsing local storage data:', error);
    }
  } else {
    results = {
      totalWins: 0,
      totalLosses: 0,
      totalTies: 0,
    };
  }
  updateScore();

  // Event listeners for rock, paper, and scissors selections
  const gameSelectors = ['rock', 'paper', 'scissors'];
  gameSelectors.forEach(function (selector) {
    document.querySelector(`.${selector}`).addEventListener('click', () => {
      let playerPick = selector;
      let computerPick = generateComputerPick();
      game(playerPick, computerPick);
      updateScore();
    });
  });

  // Game function which compares the computer pick and player pick and updates the score
  function game(playerPick, computerPick) {
    switch (true) {
      case playerPick === computerPick:
        results.totalTies++;
        break;
      case (
        (playerPick === 'rock' && computerPick === 'paper') ||
        (playerPick === 'paper' && computerPick === 'scissors') ||
        (playerPick === 'scissors' && computerPick === 'rock')
      ):
        results.totalLosses++;
        break;
      default:
        results.totalWins++;
    }
  }

  // Function to get the computer to pick rock paper or scissors
  function generateComputerPick() {
    let number = Math.random();
    return number < 1 / 3
      ? 'rock'
      : number > 2 / 3
      ? 'paper'
      : 'scissors';
  }

  // Function to update the score
  function updateScore() {
    winsHTML.innerHTML = results.totalWins;
    tiesHTML.innerHTML = results.totalTies;
    lossesHTML.innerHTML = results.totalLosses;

    localStorage.setItem('results', JSON.stringify(results));
  }

  // Event listener for the reset button
  document.querySelector('.reset').addEventListener('click', () => {
    results.totalWins = 0;
    results.totalTies = 0;
    results.totalLosses = 0;
    updateScore();
  });

  // Function for auto-playing the game at regular intervals
  function autoPlay() {
    let playerPick = generateComputerPick();
    let computerSelection = generateComputerPick();
    game(playerPick, computerSelection);
    updateScore();
  }

  // Event listener for the auto-play button
  let autoPlayInterval;
  document.querySelector('.auto').addEventListener('click', () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    } else {
      autoPlayInterval = setInterval(autoPlay, 500);
    }
  });
});