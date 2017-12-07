class Game {
	/**
	 * The constructor method for the game object, it sets the amount of cards aswell as creates all the cards
	 * @param  {[type]} length [The amount of cards desired]
	 * @return {[void]}
	 */
	constructor(length) {
		this.cards = [];
		this.values = [];
		// The start value for the first 2 cards
		this.value = Math.floor((Math.random()) + Math.random());
		this.count = 1;
		this.length = length;
	}

}


/**
 * @func Game.init()
 * The function to initiat the game board
 * @return {[array]}	@var this.Cards      [ An array containg all the cards, unshuffled ]
 */

Game.prototype.init = function() {
	for (let i = 0; i < this.length; i++) {

		// every secound card the values for the next 2 cards are set.
		if (i % 2 === 0 && i != 0) {
			this.count++;
			this.value = Math.ceil(Math.random() + 1  * i + 1 % 2);
			/** loops through the @var this.values[] to see if the new @var this.values already exists */
			for (let value of this.values) {
				if (this.value === value) {
					this.value = Math.ceil(Math.random() * i);
				}
			}
		}

		// The card wrapper
		this.cardEle = document.createElement("div");
		// The front of the card which is displayed
		this.cardFront = document.createElement("div");
		// The back of the card containg the img
		this.cardBack = document.createElement("div");


		this.cardEle.classList.add("card");
		this.cardFront.classList.add("card-front");
		this.cardBack.classList.add("card-back");

		// Sets the cardback to a img depening on how far the looped as gone.
		this.cardBack.style.background = `url(imgs/img-${this.count}.png)`;
		this.cardBack.style.backgroundSize = "cover";

		// adds the value to the card wrapper
		this.cardEle.dataset.value = this.value;
		this.cardEle.appendChild(this.cardFront);
		this.cardEle.appendChild(this.cardBack);


		this.values.push(this.value);
		this.cards.push(this.cardEle);

		this.cardEle = null;

	} // For loop ends
	return this.cards;
}



/**
 * @func Game.restart()
 * The function to restart the game, i.e, reseting the @var this.cards[]
 * @return {[type]} [description]
 */

Game.prototype.restart = function() {
	this.cards = [];
	this.values = [];
	this.count = 1;
	this.value = Math.floor((Math.random()) + Math.random());
}
