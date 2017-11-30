function Cards(cards) {

    this.cards = cards;
	this.container = document.createElement("div");
	this.container.setAttribute("class","card-container");
	document.body.appendChild(this.container);

}


Cards.prototype.shuffle = function() {

    for (let i = this.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
        if (this.cards[i] === this.cards[j]) {
            let j = Math.floor(Math.random() * (i + 1 + (i - 1 % 3)));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

Cards.prototype.setCards = function() {

    for (let card of this.cards) {
		this.container.appendChild(card)
    }
}
