let humanScore = 0;
let computerScore = 0;
const rb = document.querySelector("#r");
const pb = document.querySelector("#p");
const sb = document.querySelector("#s");
const container = document.querySelector(".score");
const content = document.createElement("p");

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
/*
function getHumanChoice() {
    let choice = prompt("What do you choose between rock, paper, and scissors");
    choice.toLowerCase();

    while (choice != "rock" && choice != "paper" && choice != "scissors") {
        choice = prompt("Please enter a valid option! What do you choose between rock, paper, and scissors");
    }
    return choice;
}
*/

rb.addEventListener("click", () => {
    playRound("rock", getComputerChoice());
})

pb.addEventListener("click", () => {
    playRound("paper", getComputerChoice());
})

sb.addEventListener("click", () => {
    playRound("scissor", getComputerChoice());
})


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
    let ties = 5-humanScore-computerScore;
    content.textContent = "Your Score = " + humanScore + " :" + " Computer Score = " + computerScore + " : Ties = " + ties;
    container.append(content);
    console.log(content.textContent);
    if (5-humanScore-computerScore==0){
        content.textContent = "Your Score = " + humanScore + " :" + " Computer Score = " + computerScore + " : Ties = " + ties + "\n" + " Game over";
        container.append(content);
    } else if (5-humanScore-computerScore<0) {
        content.textContent = "Game over";
        container.append(content);
    }
}

function playGame() {
    let count = 0;
    while (count < 5) {
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection)
        //count++;
    }

    

    return "Your Score = " + humanScore + " :" + " Computer Score = " + computerScore + " : Ties = " + ties;
}

//console.log(playGame());
