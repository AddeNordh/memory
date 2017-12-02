"use strict";

const container = document.getElementById('wrapper');
const initInputs = document.getElementsByClassName('init-game');
const start = document.getElementById('button');
const errormsg = document.getElementById('error-msg');
const restartBtn = document.getElementsByClassName('reset-wrapper')[0];
const msg = document.getElementById('msg');
const players = document.getElementById('players');
const playersArray = [];

let ready;
let game;
let cards;
let init;
let totalCards;
let scoreWrapper;
let prevent = false



const cardClick = (cards) => {
	for (let card of cards.cards) {
		card.addEventListener("click", () => {
			if (!prevent) {
				cards.addTarget(card);
				prevent = true;
			}
			setTimeout(() => {
				prevent = false;
			},450);
		})
	}
}

// loops throguh all the input fields and adds an event listener to check the values
for (let initInput of initInputs) {

	initInput.addEventListener("keyup", () => {

		if (initInput.value % 2 != 0 || initInput.value == "" || initInput.value == 0 || initInput.value > 20) {
			ready = false;
			initInput.classList.add("has-content");
			errormsg.innerHTML = "Insufficient number of cards <br> <i>pssst, max 20 cards </i>";
		}

		else {
			initInput.classList.add("has-content");
			ready = true;
			errormsg.innerText = "Good to go!";
		}

		if (initInput.value == "") {
			initInput.classList.remove("has-content");
			ready = false;
			errormsg.innerText = "";

		}
	});
}

start.addEventListener("click", () => {

    if (ready) {
		// creates the score wrapper
		scoreWrapper = document.createElement("div");
		scoreWrapper.classList.add("score");
		document.body.appendChild(scoreWrapper);

		// sets the amount of players to the desired amount or 1 if it is left mpty
		let playerAmount = players.value || 1;
		let i = 1;
		// adds the amount of players
		while (i < parseInt(playerAmount) + parseInt(1)) {
			let player = new Player(i);
			playersArray.push(player);
			scoreWrapper.append(player.p);
			i++;
		}

		// sets the first player to active
		playersArray[0].p.classList.add("active");


		restartBtn.style.opacity = 1;
		wrapper.style.left = "-100%";
		wrapper.style.opacity = "0";
        totalCards = initInputs[0].value;

		// Creates a new instance of the game object
        game = new Game();
		// Calls the init method in the game object to get the array of all the cards.
		init = game.init(totalCards);

		// Creates a new instance of the Cards object and calls the shuffle and setCards methods.
        cards = new Cards(init);
		cards.shuffle();
		cards.setCards();
		// Waits 1 secound before the user can click on the cards to let the board settle.
		setTimeout(() => {
			cardClick(cards);
		},1000);
    }

    else {
        errormsg.innerText = "Insufficient number of cards";
    }

});


restartBtn.addEventListener("click", () => {
	restart();
});


/**
 * @func document.restart();
 * The global function to restart all the global variables aswell as calling for the @func Object.restart();
 * @return {[type]} [description]
 */

const restart = (txt = "") => {
	document.body.removeChild(scoreWrapper);
	msg.innerHTML = `${txt}` + msg.innerText;
	restartBtn.style.opacity = 0;
	container.style.left = "0%";
	container.style.opacity = "1";
	initInputs[0].value = "";
	initInputs[1].value = "";
	errormsg.innerText = "Insufficient number of cards";
	initInputs[0].focus();
	game.restart();
	cards.restart();
	ready = null;
	game = null;
	cards = null;
	init = null;
	totalCards = null;
}

console.warn("%c 404                         No Errors Found!", "color: red; font-size:25px; -webkit-text-stroke: 1px #000")
