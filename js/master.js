"use strict";

const container = document.getElementById('container');
const initInput = document.getElementById('init-game');
const start = document.getElementById('button');
const errormsg = document.getElementById('error-msg');

start.addEventListener("click", () => {

    if (initInput.value != "" && initInput.value % 2 == 0) {

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
