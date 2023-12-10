let textElement1 = document.getElementById("text");
let textElement2 = document.getElementById("results");



let computerMove;

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


let totalWins = 0;
let totalLosses = 0;
let totalTies= 0;

function outcome() {


    if (result === "won") {
        totalWins +=1;
        document.getElementById("wins").innerHTML = totalWins;
    } else if (result === "tied") {
        totalTies +=1;
        document.getElementById("ties").innerHTML = totalTies;
    }    
        else {totalLosses +=1;
              document.getElementById("losses").innerHTML = totalLosses;}
}


let result;



document.getElementById("rock").addEventListener("click", () => {
    textElement1.textContent = "You Picked Rock";
    opponent();
    if (computerMove === "rock") {
        result = "tied";
    } else if (computerMove === "paper") {
        result = "lost"
    }else result = "won";
    textElement2.textContent = "you have " + result;

    outcome();
})


document.getElementById("paper").addEventListener("click", () => {
    textElement1.textContent = "You Picked Paper"
    opponent();
    if (computerMove === "rock") {
        result = "won";
    } else if (computerMove === "paper") {
        result = "tied";
    }else result = "lost";
    textElement2.textContent = "you have " + result;

    outcome();
})



document.getElementById("scissors").addEventListener("click", () => {
    textElement1.textContent = "You Picked Scissors";
    opponent();
    if (computerMove === "rock") {
        result = "lost";
    } else if (computerMove === "paper") {
        result = "won";
    }else result = "tied";
    textElement2.textContent = "you have " + result;

    outcome();
})
