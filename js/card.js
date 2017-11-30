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
