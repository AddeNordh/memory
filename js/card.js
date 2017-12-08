class Cards {

	/**
	 * The construct method the the cards object,
	 * @param  {[type]} cards [All the cards created from the game object constructor, unshuffled and not yet set on the board]
	 * @return {[void]}       []
	 */

	constructor(cards) {
		this.completed = [];
		this.targets = [];
	    this.cards = cards;
		this.ready = true;

		this.pared = 0;
		this.track = 0;
		// the container for all the cards

		this.container = document.createElement("div");
		this.container.setAttribute("class","card-container");
		document.body.appendChild(this.container);
		this.container.style.opacity = 1;
	}
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
			this.container.appendChild(this.cards[i]);
			setTimeout(() => {
				requestAnimationFrame(() => {
					this.cards[i].classList.add("active");
				})
			},100 * (i + 1));
	}
}


/**
 * The function for adding a target in the @var this.targets[]
 * @param  {[type]} target [The card that the user clicked on]
 * @return {[void]}
 */

Cards.prototype.addTarget = function(target) {
	if (this.ready) {
		this.ready = false;
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
		setTimeout(() => {
			this.ready = true;
		},800);
		// If the array contaning all the targets exceeds the length of 1 the user has clicked 2 cards.
		if (this.targets.length > 1) {
			setTimeout(() => {
				this.compare();
			},700);
		}
	}
}


/**
 * The function for comparing the values of 2 cards from @var this.targets[]
 * @return {[void]}
 */

Cards.prototype.compare = function() {

	// get the currnet player from the array containing all the player objects
	this.player = playersArray[this.track];

	// The values of the 2 cards selected
	this.t1 = this.targets[0].dataset.value;
	this.t2 = this.targets[1].dataset.value;

	// If the card values matches
	if(this.t1 === this.t2) {

		this.targets[0].classList.add("succses");
		this.targets[1].classList.add("succses");

		// Increments the current players score by 1
		this.player.score++;
		this.player.p.innerHTML = ` <br><b>player ${this.player.id} - </b><br> ${this.player.score} points`;

		this.completed.push(this.targets[0]);
		this.completed.push(this.targets[1]);

		this.pared++;

		// if all the cards has been matches, restart the game
		if (this.pared == this.cards.length / 2) {
			setTimeout(() => {
				restart("Wanna play again?<br>");
			},1500);
		}
	}

	// else flip the cards over again.
	else {
		this.targets[0].classList.remove("target");
		this.targets[1].classList.remove("target");
	}
	// removes the active state from the current player <p> and increments the tracker
	this.player.p.classList.remove("active");
	this.track++;

	// if the tracker exceeds the amount of players it is set back to 0 to start over.
	if (this.track == playersArray.length) {
		this.track = 0;
	}

	// adds the active state to the next player
	playersArray[this.track].p.classList.add("active");
	this.targets = [];
	}


/**
 * The function the restart the game
 * @return {[void]}
 */

Cards.prototype.restart = function() {
	this.container.style.opacity = "0";
	setTimeout(() => {
		// Removes the card board from the document.
		document.body.removeChild(this.container);
	},500);
	/** resets all the values of the @var {Card object}  */

	this.pared = 0;
	this.cards = [];
	this.completed = [];

	/** Calls the global restart function wich calls for the @var {game object} to @func game.restart()  */
}
