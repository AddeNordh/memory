"use strict";

const container = document.getElementById('wrapper');
const initInput = document.getElementsByClassName('init-game')[0];
const start = document.getElementById('button');
const errormsg = document.getElementById('error-msg');
const restartBtn = document.getElementsByClassName('reset-wrapper')[0];
let ready;
let game;
let cards;
let init;
let totalCards;
let prevent = false;

const cardClick = (cards) => {
	for (let card of cards.cards) {
		card.addEventListener("click", () => {
			if (!prevent) {
				cards.addTarget(card);
				prevent = true;
			}
			setTimeout(() => {
				prevent = false;
			},400);
		})
	}
}

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

start.addEventListener("click", () => {

    if (ready) {
		restartBtn.style.opacity = 1;
		wrapper.style.left = "-100%";
		wrapper.style.opacity = "0";
        totalCards = initInput.value;

        game = new Game();
		init = game.init(totalCards);

        cards = new Cards(init);
		cards.shuffle();
		cards.setCards();
		setTimeout(() => {
			cardClick(cards);
		},1000);
    }
    else {
        errormsg.innerHTML = "Insufficient number of cards";
    }
});

restartBtn.addEventListener("click", () => {
	game.restart();
	cards.restart();
})

const restart = () => {
	 restartBtn.style.opacity = 0;
  	 container.style.left = "0%";
     container.style.opacity = "1";
	 initInput.value = "";
	 initInput.focus();
	 game.restart();
	 ready = null;
	 game = null;
	 cards = null;
	 init = null;
	 totalCards = null;
}
