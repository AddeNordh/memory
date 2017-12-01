function Cards(cards) {

	this.completed = [];
	this.targets = [];
    this.cards = cards;
	this.container = document.createElement("div");
	// the container for all the cards
	this.container.setAttribute("class","card-container");
	document.body.appendChild(this.container);
	this.pared = 0;
	this.r = false;
}

/**
 * Shuffles the array with with all the cards in it @var this.cards
 * @return {[void]}
 */
Cards.prototype.shuffle = function() {
	// loop through arrya backwards to prevent an index of being skipped
    for (let i = this.cards.length - 1; i > 0; i--) {
		// get a randomized value depending on the value of i
        let j = Math.floor(Math.random() * (i + 1));

		// stores the value to be replaced in a temp var
        let temp = this.cards[i];

		// switch places of the 2 indexses
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;

		// if the index of j and i is the same do the switch again.
        if (this.cards[i] === this.cards[j]) {

            let j = Math.floor(Math.random() * (i + 1 + (i - 1 % 3)));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;

        }
    }
}

/**
 * Sets all the cards on the board - @var this.container
 * @return {[void]}
 */
Cards.prototype.setCards = function() {

	for (let i = 0; i < this.cards.length; i++) {
		/** calling a self invoking function to be able to use @var i inisde the setTimeout  */
		((i) => {
			this.container.appendChild(this.cards[i]);
			setTimeout(() => {
				this.cards[i].classList.add("active");
			},100 * (i + 1));
		})(i);

	}
}


/**
 * The function for adding a target in the @var this.targets[]
 * @param  {[type]} target [The card that the user clicked on]
 * @return {[void]}
 */

Cards.prototype.addTarget = function(target) {

	this.target = target;
	for (let item of this.completed) {
		/**
		 * Checks if the clicked target exists in the already completed array @var this.completed[]
		 * Or if the user clicks the same card twice.
		 */
		if (item == this.target) {
			return false;
		}
	}

	if (this.target == this.targets[0]) {
		return false;
	}



	// adds the "target" class to the card in order to flip it
	// and pushes the card into the targets array
	this.target.classList.add("target");
	this.targets.push(this.target);

	// If the array contaning all the targets exceeds the length of 1 the user has clicked 2 cards.
	if (this.targets.length > 1) {
		setTimeout(() => {
			this.compare();
			this.targets = [];
		},700);
	}
}


/**
 * The function for comparing the values of 2 cards from @var this.targets[]
 * @return {[void]}
 */

Cards.prototype.compare = function() {

	// The values of the 2 cards selected
	this.t1 = this.targets[0].dataset.value;
	this.t2 = this.targets[1].dataset.value;

	this.f1 = this.targets[0];
	this.f2 = this.targets[1];

	// If the card values matches
	if(this.t1 === this.t2) {

		this.targets[0].classList.add("succses");
		this.targets[1].classList.add("succses");

		this.completed.push(this.targets[0]);
		this.completed.push(this.targets[1]);

		this.pared++;
		// if all the cards has been matches, restart the game
		if (this.pared == this.cards.length / 2) {
			setTimeout(() => {
				this.restart();
			},1000);
		}
	}

	// else flip the cards over again.
	else {
		this.targets[0].classList.remove("target");
		this.targets[1].classList.remove("target");
	}

}

/**
 * The function the restart the game
 * @return {[void]}
 */

Cards.prototype.restart = function() {
	this.container.style.left = "100%";
	setTimeout(() => {
		// Removes the card board from the document.
		document.body.removeChild(this.container);
	},500);
	/** resets all the values of the @var {Card object}  */

	this.pared = 0;
	this.cards = [];
	this.completed = [];

	/** Calls the global restart function wich calls for the @var {game object} to @func game.restart()  */
	restart();
}
