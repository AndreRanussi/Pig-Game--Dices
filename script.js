"use strict";

// manipulated DOM elements in a variable

//containers
const landing = document.querySelector(".landing");
const gameMain = document.querySelector(".main");
// elements
const landingMessage = document.querySelector(".landing-message");
const enterPlayerName1 = document.querySelector("#p1name");
const enterPlayerName2 = document.querySelector("#p2name");
const playBtn = document.querySelector(".play");
const player1NameDisplay = document.querySelector("#name--0");
const player2NameDisplay = document.querySelector("#name--1");
const player1Total = document.querySelector("#score--0");
const player2Total = document.querySelector("#score--1");
const player1Current = document.querySelector("#current--0");
const player2Current = document.querySelector("#current--1");
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
const player1Card = document.querySelector(".player--0");
const player2Card = document.querySelector(".player--1");
const winnerModal = document.querySelector(".winner");
const modalWinner = document.querySelector(".player-modal");
const modalClose = document.querySelector(".close");
const settings = document.querySelector(".btn--settings");
// read,save and display the name of the players and start game
let player1;
let player2;

playBtn.addEventListener("click", () => {
  if (
    enterPlayerName1.value.length === 0 ||
    enterPlayerName2.value.length === 0
  ) {
    landingMessage.innerHTML = "Please enter both player names!";
  } else {
    player1 = enterPlayerName1.value;
    player2 = enterPlayerName2.value;
    player1NameDisplay.textContent = player1;
    player2NameDisplay.textContent = player2;
    landing.classList.add("hide");
    gameMain.classList.remove("hide");
    newGame();
  }
});

let player1CurrentScore;
let player2CurrentScore;
let player1TotalScore;
let player2TotalScore;
let callRandomNumber;
let activePlayer = player1Card.classList.contains("player--active");
let activePlayerRefresh = function () {
  activePlayer = player1Card.classList.contains("player--active");
};

const randomNumber = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//btn new game click
btnNewGame.addEventListener("click", () => newGame());

//btn roll dice click
btnRollDice.addEventListener("click", () => {
  callRandomNumber = randomNumber();
  // change dice picture
  const source = `dice-${callRandomNumber}.png`;
  dice.src = source;
  // check if dice number is greater than 1
  if (callRandomNumber > 1) {
    //if the dice number is higher than 1, check which player is playing and add dice number to the current score.
    if (activePlayer) {
      player1CurrentScore += callRandomNumber;
      player1Current.textContent = player1CurrentScore;
    } else if (!activePlayer) {
      player2CurrentScore += callRandomNumber;
      player2Current.textContent = player2CurrentScore;
    }
  } else if (callRandomNumber === 1) {
    if (activePlayer) {
      player1CurrentScore = 0;
      player1Current.textContent = player1CurrentScore;
      togglePlayer();
      activePlayerRefresh();
    } else if (!activePlayer) {
      player2CurrentScore = 0;
      player2Current.textContent = player2CurrentScore;
      togglePlayer();
      activePlayerRefresh();
    }
  }
});

btnHold.addEventListener("click", () => {
  //player 1
  if (activePlayer) {
    player1TotalScore += player1CurrentScore;
    player1Total.textContent = player1TotalScore;
    if (player1TotalScore < 100) {
      togglePlayer();
      player1CurrentScore = 0;
      player1Current.textContent = player1CurrentScore;
      activePlayerRefresh();
    } else if (player1TotalScore >= 100) {
      player1Card.classList.add("player--winner");
      winnerModal.classList.remove("hide");
      modalWinner.textContent = player1;
    }
    //player 2
  } else if (!activePlayer) {
    player2TotalScore += player2CurrentScore;
    player2Total.textContent = player2TotalScore;
    if (player2TotalScore < 100) {
      togglePlayer();
      player2CurrentScore = 0;
      player2Current.textContent = player2CurrentScore;
      activePlayerRefresh();
    } else if (player2TotalScore >= 100) {
      player2Card.classList.add("player--winner");
      winnerModal.classList.remove("hide");
      modalWinner.textContent = player2;
    }
  }
});

modalClose.addEventListener("click", () => {
  winnerModal.classList.add("hide");
  newGame();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    winnerModal.classList.add("hide");
    newGame();
  }
});

settings.addEventListener("click", () => {
  gameMain.classList.add("hide");
  landing.classList.add("hide");
});

//toggle player function
function togglePlayer() {
  player1Card.classList.toggle("player--active");
  player2Card.classList.toggle("player--active");
}

// new game function
function newGame() {
  activePlayerRefresh();
  player1Total.textContent = 0;
  player2Total.textContent = 0;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1TotalScore = 0;
  player2TotalScore = 0;
  dice.src = "dice-6.png";

  if (activePlayer) {
    player1Card.classList.remove("player--winner");
    player2Card.classList.remove("player--winner");
  } else if (!activePlayer) {
    player1Card.classList.remove("player--winner");
    player2Card.classList.remove("player--winner");
    togglePlayer();
  }
}
