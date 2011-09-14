function Episode(id, number, oSeason){
	/* héritage */
    this.superclass = VideoDescriptor;             // classe parente
    this.prototype = new this.superclass(id); // héritage des méthodes
    this.superclass();                    //appel du super constructeur
    delete this.superclass;              // inutile de garder la classe parente
	
	this._number = number;
	this._season = oSeason;
}

Episode.prototype.getId() {
	return this.prototype.getId();
}

Episode.prototype.getNumber() {
	return this._number;
}

Episode.prototype.getSeason() {
	return this._season;
}

Episode.prototype.toString = function() {
	var toReturn = "Episode : id=" + this._id; 
	toReturn += " | Title=" + this.prototype.getTitle();
	toReturn += " | Summary=" + this.prototype.getSummary();
	toReturn += " | Actors=";
	for (var i in this.prototype.getActorsList()){
		toReturn += this.prototype.getActorsList()[i].toString() + " ";
	}
	return toReturn;
}