function Game() {

    this.cards = [];
    this.values = [];
	// The start value for the first 2 cards
    this.value = Math.floor((Math.random()) + Math.random());
	this.count = 1;

	/**
	 * @func Game.init()
	 * The function to initiat the game board
	 * @param  {[int]} 		  length 		  [ The desired amount of cards ]
	 * @return {[array]} @var this.Cards      [An array containg all the cards, unshuffled]
	 */

    this.init = (length) => {
        for (let i = 0; i < length; i++) {

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
			this.cardEle.setAttribute('data-value', this.value);
			this.cardEle.appendChild(this.cardFront);
			this.cardEle.appendChild(this.cardBack);


            this.values.push(this.value);
            this.cards.push(this.cardEle);
			this.cardEle = null;
        }
		return this.cards;
    }
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
