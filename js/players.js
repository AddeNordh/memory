function Player(id) {
	this.id = id;
	this.score = 0;
	this.p = document.createElement("p");
	this.p.innerText = `player ${this.id} - ${this.score} points`;
	document.body.appendChild(this.p);
}
