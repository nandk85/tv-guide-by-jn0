function Actor(id, sName){
	this._id = id;
	this._name = sName;
}

Actor.prototype.getId() {
	return this._id;
}

Actor.prototype.getName() {
	return this._name;
}


Actor.prototype.getFirstName() {
	return this._firstName;
}

Actor.prototype.setFirstName(sFirstName) {
	this._firstName = sFirstName;
}

Actor.prototype.getBirthDate() {
	return this._birthDate;
}

Actor.prototype.setBirthDate(dBirthDate) {
	this._birthDate = dBirthDate;
}

Actor.prototype.getPhoto() {
	return this._photo;
}

Actor.prototype.setPhoto(sPhoto) {
	this._photo = sPhoto;
}

Actor.prototype.getBiography() {
	return this._biography;
}

Actor.prototype.setBiography(sBiography) {
	this._biography = sBiography;
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