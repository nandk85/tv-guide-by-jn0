function VideoDescriptor(id){
	this._id = id;
}  

VideoDescriptor.prototype.getId() {
	return this._id;
}

VideoDescriptor.prototype.getTitle() {
	return this._title;
}

VideoDescriptor.prototype.setTitle(sTitle) {
	this._title = sTitle;
}

VideoDescriptor.prototype.getOriginalTitle() {
	return this._originalTitle;
}

VideoDescriptor.prototype.setOriginalTitle(sOriginalTitle) {
	this._originalTitle = sOriginalTitle;
}

VideoDescriptor.prototype.getCreationDate() {
	return this._creationDate;
}

VideoDescriptor.prototype.setCreationDate(sDate) {
	this._creationDate = sDate;
}

VideoDescriptor.prototype.getSummary() {
	return this._summary;
}

VideoDescriptor.prototype.setSummary(sSummary) {
	this._summary = sSummary;
}

VideoDescriptor.prototype.getImage() {
	return this._image;
}

VideoDescriptor.prototype.setImage(sImage) {
	this._image = sImage;
}

VideoDescriptor.prototype.getActorsList() {
	return this._actorsList;
}

VideoDescriptor.prototype.setActorsList(oActorsList) {
	this._actorsList = oActorsList;
}

VideoDescriptor.prototype.addActor(oActor) {
	this._actorsList.push(oActor);
}

VideoDescriptor.prototype.getProductionPersonsList() {
	return this._productionPersonsList;
}

VideoDescriptor.prototype.setProductionPersonsList(oProductionPersonsList) {
	this._productionPersonsList = oProductionPersonsList;
}

VideoDescriptor.prototype.addPersonToProductionList(oPerson) {
	this._productionPersonsList.push(oPerson);
}

VideoDescriptor.prototype.getStaffPersonsList() {
	return this._staffPersonsList;
}

VideoDescriptor.prototype.setStaffPersonsList(oStaffPersonsList) {
	this._staffPersonsList = oStaffPersonsList;
}

VideoDescriptor.prototype.addPersonToStaff(oPerson) {
	this._staffPersonsList.push(oPerson);
}


VideoDescriptor.prototype.draw = function() {
}

VideoDescriptor.prototype.toString = function() {
	var toReturn = "Program : id=" + this.getId();
	var toReturn = "Program : Title=" + this.getTitle();
	var toReturn = "Program : Original title=" + this.getOriginalTitle();
	return toReturn;
  }