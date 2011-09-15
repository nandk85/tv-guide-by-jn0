function VideoDescriptor(id){
	this._id = id;
}  

VideoDescriptor.prototype.getId = function() {
	return this._id;
}

VideoDescriptor.prototype.getTitle = function() {
	return this._title;
}

VideoDescriptor.prototype.setTitle = function(sTitle) {
	this._title = sTitle;
}

VideoDescriptor.prototype.getOriginalTitle = function() {
	return this._originalTitle;
}

VideoDescriptor.prototype.setOriginalTitle = function(sOriginalTitle) {
	this._originalTitle = sOriginalTitle;
}

VideoDescriptor.prototype.getDuration = function() {
	return this._duration;
}

VideoDescriptor.prototype.setDuration = function(iDuration) {
	this._duration = iDuration;
}

VideoDescriptor.prototype.getCreationDate = function() {
	return this._creationDate;
}

VideoDescriptor.prototype.setCreationDate = function(sDate) {
	this._creationDate = sDate;
}

VideoDescriptor.prototype.getSummary = function() {
	return this._summary;
}

VideoDescriptor.prototype.setSummary = function(sSummary) {
	this._summary = sSummary;
}

VideoDescriptor.prototype.getImage = function() {
	return this._image;
}

VideoDescriptor.prototype.setImage = function(sImage) {
	this._image = sImage;
}

VideoDescriptor.prototype.getActorsList = function() {
	return this._actorsList;
}

VideoDescriptor.prototype.setActorsList = function(oActorsList) {
	this._actorsList = oActorsList;
}

VideoDescriptor.prototype.addActor = function(oActor, sRole) {
	this._actorsList.push[sRole] = oActor;
}

VideoDescriptor.prototype.getProductionPersonsList = function() {
	return this._productionPersonsList;
}

VideoDescriptor.prototype.setProductionPersonsList = function(oProductionPersonsList) {
	this._productionPersonsList = oProductionPersonsList;
}

VideoDescriptor.prototype.addPersonToProductionList = function(oPerson) {
	this._productionPersonsList.push(oPerson);
}

VideoDescriptor.prototype.getStaffPersonsList = function() {
	return this._staffPersonsList;
}

VideoDescriptor.prototype.setStaffPersonsList = function(oStaffPersonsList) {
	this._staffPersonsList = oStaffPersonsList;
}

VideoDescriptor.prototype.addPersonToStaff = function(oPerson) {
	this._staffPersonsList.push(oPerson);
}

VideoDescriptor.prototype.getElement = function() {
	return this._element;
}

VideoDescriptor.prototype.setElement = function(eDiv) {
	this._element = eDiv;
}

VideoDescriptor.prototype.draw = function(eParent) {
	var eDiv= this.getElement();

	if (!eDiv) {
		eDiv= document.createElement("div");

		eDiv.style.offsetHeight=eParent.style.offsetHeight;
		eDiv.style.height = eParent.style.offsetHeight+"px";
		eDiv.style.offsetWidth=eParent.style.offsetWidth;
		eDiv.style.width = eParent.style.offsetWidth+"px";
		//eDiv.style.border = "1px solid yellow";
		
		eDiv.appendChild(document.createTextNode(this.getTitle()));
		
		eParent.appendChild(eDiv);
	}
	this.setElement(eDiv);
}

VideoDescriptor.prototype.toString = function() {
	toReturn = "Video : id=" + this.getId();
	toReturn += " | Title=" + this.getTitle();
	toReturn += " | Original title=" + this.getOriginalTitle();
	toReturn += " | Summary=" + this.getSummary();
	return toReturn;
  }