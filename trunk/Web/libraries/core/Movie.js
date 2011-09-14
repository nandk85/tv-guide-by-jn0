function Movie(id, title){
	/* h�ritage */
    this.superclass = VideoDescriptor;             // classe parente
    this.prototype = new this.superclass(id); // h�ritage des m�thodes
    this.superclass();                    //appel du super constructeur
    delete this.superclass;              // inutile de garder la classe parente

    this.prototype.setTitle(title);
}

Movie.prototype.toString = function() {
	var toReturn = "Movie : id=" + this._id; 
	toReturn += " | Title=" + this.prototype.getTitle();
	toReturn += " | Summary=" + this.prototype.getSummary();
	toReturn += " | Actors=";
	for (var i in this.prototype.getActorsList()){
		toReturn += this.prototype.getActorsList()[i].toString() + " ";
	}
	return toReturn;
}