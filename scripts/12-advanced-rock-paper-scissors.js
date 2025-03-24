const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  let comptMove = "";
  const randomNumber = Math.round(Math.random() * 100) / 100;
  if (randomNumber >= 0 && randomNumber < 1 / 3) comptMove = "rock";
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) comptMove = "paper";
  else comptMove = "scissors";

  // console.log(`Computer move is  '${comptMove}' (${randomNumber}) `);
  // console.log("\n");
  return comptMove;
}

let isAutoPlaying = false;
let intervalId;
const autoBtnElement = document.querySelector(".js-auto-play-button");

/*
// Below code is not recommended to write a function. 
// Because of not supporting hoisting and not easy to read. 
const autoPlay = () => {
  
  
};

*/

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoBtnElement.innerHTML = "Stop Play";
    autoBtnElement.style.backgroundColor = "rgb(200, 0, 0)";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoBtnElement.innerHTML = "Auto Play";
    autoBtnElement.style.backgroundColor = "greenyellow";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector(".js-reset-button").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
  document.querySelectorAll(".js-result, .js-moves").forEach((el) => {
    el.innerHTML = "";
  });
});

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  // console.log(`Your move is '${playerMove}'`);
  const comptMove = pickComputerMove();

  let result = "";
  if (playerMove === comptMove) {
    result = `Tie.`;
    score.ties++;
  } else if (
    (playerMove === "rock" && comptMove === "scissors") ||
    (playerMove === "paper" && comptMove === "rock") ||
    (playerMove === "scissors" && comptMove === "paper")
  ) {
    result = `You win.`;
    score.wins++;
  } else {
    result = `You lose.`;
    score.losses++;
  }

  // Local Storage. Sayfa yenilense bile bilgiler tarayıcı üzerinde saklanır. Cookies gibi...
  // localStorage.setItem metodu yalnızca string'de çalışır
  // score lacolStorage'da saklamak için json'a çevir.
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${comptMove}-emoji.png" class="move-icon"> Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}
