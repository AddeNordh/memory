"use strict";

const container = document.getElementById('wrapper');
const initInput = document.getElementsByClassName('init-game')[0];
const start = document.getElementById('button');
const errormsg = document.getElementById('error-msg');
let ready;

const cardClick = (cards) => {
	for (let card of cards.cards) {
		card.addEventListener("click", () => {
			cards.addTarget(card);
		})
	}
}

initInput.addEventListener("keyup", () => {
		if (initInput.value % 2 != 0 || initInput.value == "" || initInput.value == 0) {
			ready = false;
			initInput.classList.add("has-content");
			errormsg.innerHTML = "Insufficient number of cards";
		}

		else {
			initInput.classList.add("has-content");
			ready = true;
			errormsg.innerHTML = "Good to go!";
		}

		if (initInput.value == "" || initInput.value == 0) {
			initInput.classList.remove("has-content");

		}
});

start.addEventListener("click", () => {

    if (ready) {
		wrapper.style.left = "-100%";
		wrapper.style.opacity = "0";
        let totalCards = initInput.value;

        let game = new Game();
		let init = game.init(totalCards);

        let cards = new Cards(init);
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
