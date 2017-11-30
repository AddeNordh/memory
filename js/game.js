function Game() {

    this.cards = [];
    this.values = [];
    this.value = Math.floor((Math.random()) + Math.random());
	this.count = 1;

    this.init = (length) => {
        for (let i = 0; i < length; i++) {

            if (i % 2 === 0 && i != 0) {
				this.count++;
                this.value = Math.ceil(Math.random() + 1  * i + 1 % 2);
                for (let value of this.values) {
                    if (this.value === value) {
                        this.value = Math.ceil(Math.random() * i);
                    }
                }
            }

            this.cardEle = document.createElement("div");
			this.cardFront = document.createElement("div");
			this.cardBack = document.createElement("div");


			this.cardEle.classList.add("card");
			this.cardFront.classList.add("card-front");
			this.cardBack.classList.add("card-back");

			this.cardBack.style.background = `url(imgs/img-${this.count}.png)`;
			this.cardBack.style.backgroundSize = "cover";

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

Game.prototype.restart = function() {
	this.cards = [];
	this.values = [];
	this.count = 1;
	this.value = Math.floor((Math.random()) + Math.random());
	wrapper.style.left = "0%";
	wrapper.style.opacity = "1";
}
