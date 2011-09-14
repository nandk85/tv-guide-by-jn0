function Channel(id, iNumber, sName){
	this._id = id;
	this._number = iNumber;
	this._name = sName;
}

Channel.prototype.getId() {
	return this._id;
}
Channel.prototype.getNumber() {
	return this._number;
}
Channel.prototype.getName() {
	return this._name;
}


Channel.prototype.getDescription() {
	return this._description;
}

Channel.prototype.setDescription(sDescription) {
	this._description = sDescription;
}

Channel.prototype.getLogo() {
	return this._logo;
}

Channel.prototype.setLogo(sLogo) {
	this._logo = sLogo;
}

Channel.prototype.getProgramsList() {
	return this._programsList;
}

Channel.prototype.setProgramsList(oProgramList) {
	this._programsList = oProgramsList;
}

Channel.prototype.addProgram(oProgam) {
	this._programsList[oProgram.getBeginningDate] = oProgram;
}

Channel.prototype.draw = function() {
}


Cell.prototype.toString = function() {
	var toReturn = "Cell : x=" + this._x; 
	toReturn += " | y=" + this._y;
	toReturn += " | Valeur=" + this._value; 
	toReturn += " | Valeurs possibles=";
	toReturn += " (" + this._possibleValues.length + ")";
	for (var i in this._possibleValues){
		toReturn += this._possibleValues[i] + " ";
	}
	return toReturn;
  }