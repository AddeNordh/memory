"use strict";

const container = document.getElementById('wrapper');
const initInput = document.getElementsByClassName('init-game')[0];
const start = document.getElementById('button');
const errormsg = document.getElementById('error-msg');

initInput.addEventListener("keyup", () => {
		if (initInput.value % 2 != 0 || initInput.value == "") {
			errormsg.innerHTML = "Insufficient number of cards";
		}
		else {
			errormsg.innerHTML = "Good to go!";
		}
});

start.addEventListener("click", () => {

    if (initInput.value != "" && initInput.value % 2 == 0) {
		wrapper.style.display = "none";
        let totalCards = initInput.value;

        let game = new Game();
		let init = game.init(totalCards);

        let cards = new Cards(init);
		cards.shuffle();
		cards.setCards();

    }
    else {
        errormsg.innerHTML = "Insufficient number of cards";
    }
});
