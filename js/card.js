function Game(length) {

    this.cards = [];
    this.values = [];
    this.value = Math.floor((Math.random()) + Math.random());

    this.init = () => {
        for (let i = 0; i < length; i++) {

            if (i % 2 === 0) {
                this.value = Math.ceil(Math.random() + 1  * i + 1 % 2);
                for (let value of this.values) {
                    if (this.value === value) {
                        this.value = Math.ceil(Math.random() * i);
                    }
                }
            }

            let cardEle = document.createElement("div");
            cardEle.classList.add("card");
            cardEle.setAttribute('data-value', this.value);

            this.values.push(this.value);
            this.cards.push(cardEle);

        }

        this.shuffle(this.cards);
    }

}


Game.prototype.shuffle = function(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
        if (cards[i] === cards[j]) {
            let j = Math.floor(Math.random() * (i + 1 + (i - 1 % 3)));
            let temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    new Cards(cards);

}

function Cards(cards) {

    this.cards = cards;
	this.container = document.createElement("div");
	this.container.setAttribute("class","card-container");
	document.body.appendChild(this.container);

    for (let card of this.cards) {
        this.setCard(card)
    }
}

Cards.prototype.setCard = function(card) {
    this.container.appendChild(card)

}
