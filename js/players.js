class Player {

	constructor(id) {
		// Creates an unique id and score for each player
		// also creates a new <p> for every player to be visually nice
		this.id = id;
		this.score = 0;
		this.p = document.createElement("p");
		this.p.innerHTML = `<br><b>player ${this.id} - </b><br> ${this.score} points`;
		document.body.appendChild(this.p);
	}

}
