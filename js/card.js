function Cards(cards) {

	this.targets = [];
    this.cards = cards;
	this.container = document.createElement("div");
	this.container.setAttribute("class","card-container");
	document.body.appendChild(this.container);
	this.pared = 0;
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

	for (let i = 0; i < this.cards.length; i++) {
		((i) => {
			this.container.appendChild(this.cards[i]);
			setTimeout(() => {
				this.cards[i].classList.add("active");
			},100 * (i + 1));
		})(i);

	}
}

Cards.prototype.compare = function() {
	this.t1 = this.targets[0].dataset.value;
	this.t2 = this.targets[1].dataset.value;

	if(this.t1 === this.t2) {
		this.targets[0].classList.add("succses");
		this.targets[1].classList.add("succses");
		this.pared++;
		if (this.pared == this.cards.length / 2) {
			this.restart();
		}
	}


	else {
		this.targets[0].classList.remove("target");
		this.targets[1].classList.remove("target");
	}

}


Cards.prototype.addTarget = function(target) {

	this.target = target;
	this.target.classList.add("target");
	this.targets.push(this.target);

	if (this.targets.length > 1) {
		setTimeout(() => {
			this.compare();
			this.targets = [];
		},700);

	}
}

Cards.prototype.restart = function() {
	this.container.style.left = "100%";
	setTimeout(() => {
		document.body.removeChild(this.container);
	},500);
	this.pared = 0;
	restart();
	this.cards = [];
	let g = new Game();
	g.restart();
}
