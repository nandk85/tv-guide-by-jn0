function Actor(id, sName){
    this.superclass = Person;
    this.prototype = new this.superclass(id, sName);
    this.superclass();
    delete this.superclass;
}

Actor.prototype.getVideosList() {
	return this._videosList;
}

Actor.prototype.setVideosList(sVideosList) {
	this._videosList = sVideosList;
}

Actor.prototype.addVideo(oVideoDescriptor) {
	this._videosList.push(oVideoDescriptor);
}

Actor.prototype.toString = function() {
	var toReturn = "Actor : id=" + this._id; 
	toReturn += " | Name =" + this._name + " " + this._firstName;
	toReturn += " | NickName=" + this._nickName;
	toReturn += " | BirthDate=" + this._birthDate;
	toReturn += " | Photos=" + this._photo;
	toReturn += " | Biography=" + this._biography;
	return toReturn;
  }