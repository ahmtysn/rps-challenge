const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const finish = document.getElementById("finish");
const modal = document.querySelector(".modal");
const scoreBoard = {
  player: 0,
  computer: 0
};
restartGame();

function play(e) {
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

function modalClose(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

function restartGame(e) {
  scoreBoard.player = 0;
  scoreBoard.computer = 0;
  score.innerHTML = `<p>Player : ${scoreBoard.player}</p>
  <p>Computer : ${scoreBoard.computer}</p>
  ;`;
}
function finishGame() {
  modal.style.display = "block";
  if (scoreBoard.player > scoreBoard.computer) {
    result.innerHTML = `
    <h1>Player Won</h1>
    <p class='text-win'>Player Score : ${scoreBoard.player}</p>
    <p class='text-lose'>Computer Score : ${scoreBoard.computer}</p>`;
  } else if (scoreBoard.player < scoreBoard.computer) {
    result.innerHTML = `
    <h1>Computer Won</h1>
    <p class='text-win'>Computer Score : ${scoreBoard.computer}</p>
    <p class='text-lose'>Player Score : ${scoreBoard.player}</p>`;
  } else {
    result.innerHTML = `
    <h1>Draw !!!</h1>
    <p class='text-draw'>Player Score : ${scoreBoard.player}</p>
    <p class='text-draw'>Computer Score : ${scoreBoard.computer}</p>`;
  }
  restartGame();
}

// *********** Event Listeners ***********

choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", modalClose);
restart.addEventListener("click", restartGame);
finish.addEventListener("click", finishGame);

function getComputerChoice() {
  const choiceList = [];
  choices.forEach(choice => choiceList.push(choice.id));
  random = Math.floor(Math.random() * choiceList.length);
  return choiceList[random];
}

function getWinner(p, c) {
  if (p === c) {
    return "draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "scissors") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === "player") {
    scoreBoard.player++;
    result.innerHTML = `<h1 class="text-win">You Win</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice[0].toUpperCase() +
      computerChoice.slice(1)}</strong></p>`;
  } else if (winner === "computer") {
    scoreBoard.computer++;
    result.innerHTML = `<h1 class="text-lose">You Lose</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice[0].toUpperCase() +
      computerChoice.slice(1)}</strong></p>`;
  } else {
    result.innerHTML = `<h1>It's A Draw</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice[0].toUpperCase() +
      computerChoice.slice(1)}</strong></p>`;
  }
  score.innerHTML = `<p>Player : ${scoreBoard.player}</p>
  <p>Computer : ${scoreBoard.computer}</p>
  ;`;
  modal.style.display = "block";
}
