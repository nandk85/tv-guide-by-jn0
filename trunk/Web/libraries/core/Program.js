function Program(id){
	this._id = id;
}  

Program.prototype.getId() {
	return this._id;
}


Program.prototype.getBeginDate() {
	return this._beginDate;
}

Program.prototype.setBeginDate(dBeginDate) {
	this._beginDate = dBeginDate;
}

Program.prototype.getEndDate() {
	return this._endDate;
}

Program.prototype.setEndDate(dEndDate) {
	this._endDate = dEndDate;
}

Program.prototype.draw = function() {

}

Program.prototype.toString = function() {
	var toReturn = "Program : id=" + this._id; 
	toReturn += " | Begin date =" + this._beginDate;
	toReturn += " | End Date=" + this._endDate;
	return toReturn;
}
