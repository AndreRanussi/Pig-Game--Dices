"use strict";

// manipulated DOM elements in a variable

//containers
const landing = document.querySelector(".landing");
const gameMain = document.querySelector(".players-cards");
// elements
const landingMessage = document.querySelector(".landing-message");
const player1Name = document.querySelector("#p1name");
const player2Name = document.querySelector("#p2name");
const player1NameDisplay = document.querySelector(".player-name1-display");
const player2NameDisplay = document.querySelector(".player-name2-display");
const playBtn = document.querySelector(".play-btn");

// read,save and display the name of the players and start game
let player1;
let player2;

playBtn.addEventListener("click", () => {
  if (player1Name.value.length === 0 || player2Name.value.length === 0) {
    landingMessage.innerHTML = "Please enter both player names!";
  } else {
    player1 = player1Name.value;
    player2 = player2Name.value;
    player1NameDisplay.textContent = player1;
    player2NameDisplay.textContent = player2;
    landing.classList.add("hide");
    gameMain.classList.remove("hide");
  }
});
