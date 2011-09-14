function Episode(id, number, oSeason){
    this.superclass = VideoDescriptor;
    this.prototype = new this.superclass(id);
    this.superclass();
    delete this.superclass;
	
	this._number = number;
	this._season = oSeason;
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