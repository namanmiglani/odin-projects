let humanScore = 0;
let computerScore = 0;


function getComputerChoice() {
    let num = Math.floor(Math.random() * 3);
    if (num === 0) {
        return "rock";
    } else if (num === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getHumanChoice() {
    let choice = prompt("What do you choose between rock, paper, and scissors");
    choice.toLowerCase();

    while (choice != "rock" && choice != "paper" && choice != "scissors") {
        choice = prompt("Please enter a valid option! What do you choose between rock, paper, and scissors");
    }
    return choice;
}

function playRound(human, computer) {
    if (human === computer) {
        //
    } else if (human === "rock" && computer === "scissors") {
        humanScore++;
    } else if (human === "paper" && computer === "rock") {
        humanScore++;
    } else if (human === "scissors" && computer === "paper") {
        humanScore++;
    } else {
        computerScore++;
    }
}

function playGame() {
    let count = 0;
    while (count < 5) {
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection)
        count++;
    }

    let ties = 5-humanScore-computerScore;

    return "Your Score = " + humanScore + " :" + " Computer Score = " + computerScore + " : Ties = " + ties;
}

console.log(playGame());
