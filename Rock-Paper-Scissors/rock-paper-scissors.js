document.addEventListener("DOMContentLoaded", function () {
  // Initial results or retrieve from local storage
  let results = JSON.parse(localStorage.getItem("results")) || {
    totalWins: 0,
    totalLosses: 0,
    totalTies: 0,
  };

  // Update UI with initial results
  updateScore(results);

  // Array of game selectors
  const gameSelectors = [".rock", ".paper", ".scissors"];

  // Add event listeners to game selectors
  gameSelectors.forEach((selector) => {
    const pick = document.querySelector(selector);

    if (pick) {
      pick.addEventListener("click", () => {
        const playerPick = selector.slice(1);
        const computerPick = computerLogic();
        playGame(playerPick, computerPick);
      });
    }
  });

  // Play game with player and computer picks
  function playGame(playerPick, computerPick) {
    console.log(`You Picked ${playerPick}`);
    compareResult(playerPick, computerPick, results);
    updateScore(results);
  }

  // Logic to determine computer pick
  function computerLogic() {
    let computerPick;
    let computerNumber = Math.random();
    
    if (computerNumber <= 1 / 3) {
      computerPick = "rock";
    } else if (computerNumber >= 1 / 3 && computerNumber <= 2 / 3) {
      computerPick = "paper";
    } else {
      computerPick = "scissors";
    }

    return computerPick;
  }

  // Compare player and computer picks, update results
  function compareResult(playerPick, computerPick, results) {
    if (playerPick === computerPick) {
      results.ties++;
    } else if (
      (playerPick === "rock" && computerPick === "paper") ||
      (playerPick === "paper" && computerPick === "scissors") ||
      (playerPick === "scissors" && computerPick === "rock")
    ) {
      results.losses++;
    } else {
      results.wins++;
    }
  }

  // Update the UI with current results
  function updateScore(results) {
    document.querySelector(".wins").innerHTML = results.wins;
    document.querySelector(".losses").innerHTML = results.losses;
    document.querySelector(".ties").innerHTML = results.ties;

    // Update results in local storage
    localStorage.setItem("results", JSON.stringify(results));
  }

  // Reset scores to zero
  function resetScores(results) {
    results.ties = 0;
    results.wins = 0;
    results.losses = 0;
    updateScore(results);
  }

  // Event listener for the reset button
  document.querySelector(".reset").addEventListener("click", () => {
    resetScores(results);
  });

  // Event listener for the auto button to play the game automatically
  document.querySelector(".auto").addEventListener("click", () => {
    setInterval(() => {
      const playerPick = playerLogic();
      const computerPick = computerLogic();
      playGame(playerPick, computerPick);
    }, 1000);
  });

  // Logic to determine player pick automatically
  function playerLogic() {
    let playerPick;
    let playerNumber = Math.random();
    
    if (playerNumber <= 1 / 3) {
      playerPick = "rock";
    } else if (playerNumber >= 1 / 3 && playerNumber <= 2 / 3) {
      playerPick = "paper";
    } else {
      playerPick = "scissors";
    }

    return playerPick;
  }
});
