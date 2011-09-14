function Person(id, sName){
	this._id = id;
	this._name = sName;
}

Person.prototype.getId() {
	return this.prototype._id;
}

Person.prototype.getName() {
	return this.prototype._name;
}

Person.prototype.getFirstName() {
	return this._firstName;
}

Person.prototype.setFirstName(sFirstName) {
	this._firstName = sFirstName;
}

Person.prototype.getBirthDate() {
	return this._birthDate;
}

Person.prototype.setBirthDate(dBirthDate) {
	this._birthDate = dBirthDate;
}

Person.prototype.getPhoto() {
	return this._photo;
}

Person.prototype.setPhoto(sPhoto) {
	this._photo = sPhoto;
}

Person.prototype.getBiography() {
	return this._biography;
}

Person.prototype.setBiography(sBiography) {
	this._biography = sBiography;
}

Person.prototype.getRole() {
	return this._role;
}

Person.prototype.setRole(sRole) {
	this._role = sRole;
}

Person.prototype.getFunction() {
	return this._function;
}

Person.prototype.setFunction(sFunction) {
	this._function = sFunction;
}

Person.prototype.toString = function() {
	var toReturn = "Actor : id=" + this._id; 
	toReturn += " | Name =" + this._name + " " + this._firstName;
	toReturn += " | NickName=" + this._nickName;
	toReturn += " | BirthDate=" + this._birthDate;
	toReturn += " | Photos=" + this._photo;
	toReturn += " | Biography=" + this._biography;
	return toReturn;
  }