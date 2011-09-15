function Person(id, sName){
	this._id = id;
	this._name = sName;
}

Person.prototype.getId = function() {
	return this.prototype._id;
}

Person.prototype.getName = function() {
	return this.prototype._name;
}

Person.prototype.getFirstName = function() {
	return this._firstName;
}

Person.prototype.setFirstName = function(sFirstName) {
	this._firstName = sFirstName;
}

Person.prototype.getBirthDate = function() {
	return this._birthDate;
}

Person.prototype.setBirthDate = function(dBirthDate) {
	this._birthDate = dBirthDate;
}

Person.prototype.getPhoto = function() {
	return this._photo;
}

Person.prototype.setPhoto = function(sPhoto) {
	this._photo = sPhoto;
}

Person.prototype.getBiography = function() {
	return this._biography;
}

Person.prototype.setBiography = function(sBiography) {
	this._biography = sBiography;
}

Person.prototype.getRole = function() {
	return this._role;
}

Person.prototype.setRole = function(sRole) {
	this._role = sRole;
}

Person.prototype.getFunction = function() {
	return this._function;
}

Person.prototype.setFunction = function(sFunction) {
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