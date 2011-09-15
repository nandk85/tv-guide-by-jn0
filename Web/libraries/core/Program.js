var ONE_HOUR_EQUALS_PIXEL = 100;

function Program(id, dBeginDate, dEndDate){
	this._id = id;
	this._beginDate = dBeginDate;
	this._endDate = dEndDate;
}  

Program.prototype.getId = function() {
	return this._id;
}

Program.prototype.getBeginDate = function() {
	return this._beginDate;
}

Program.prototype.getEndDate = function() {
	return this._endDate;
}

Program.prototype.getDisplayableDate = function() {
	return this._displayableDate;
}

Program.prototype.setDisplayableDate = function(dDisplayableDate) {
	this._displayableDate = dDisplayableDate;
}

Program.prototype.getVideoDescriptor = function() {
	return this._videoDescriptor;
}

Program.prototype.setVideoDescriptor = function(oVideoDescriptor) {
	this._videoDescriptor = oVideoDescriptor;
}

Program.prototype.getDurationInMinutes = function() {
	return (this.getEndDate() - this.getDisplayableDate())/60000;
}

Program.prototype.getWidthInPixels = function() {
	var durationInMinutes = this.getDurationInMinutes();
	return (durationInMinutes/60) * ONE_HOUR_EQUALS_PIXEL;
}

Program.prototype.getElement = function() {
	return this._element;
}

Program.prototype.setElement = function(eDiv) {
	this._element = eDiv;
}

Program.prototype.draw = function(eParent) {
	var eDiv= this.getElement();

	if (!eDiv) {
		eDiv= document.createElement("div");
		
		//position
		eDiv.style.position="absolute";
		
		//size
		eDiv.style.offsetHeight=eParent.style.offsetHeight;
		eDiv.style.height = eParent.style.offsetHeight + "px";

		//compute width with beginDate and endDate
		eDiv.style.offsetWidth=this.getWidthInPixels();
		eDiv.style.width = eDiv.style.offsetWidth+"px";

		eDiv.style.border = "1px solid yellow";
		eDiv.style.float="right";
		
		this.getVideoDescriptor().draw(eDiv);
		var videoDiv = this.getVideoDescriptor().getElement();
		
		eParent.appendChild(eDiv);
	}
	this.setElement(eDiv);
}

Program.prototype.toString = function() {
	var toReturn = "Program : id=" + this.getId(); 
	toReturn += " | Begin date =" + this.getBeginDate();
	toReturn += " | End Date=" + this.getEndDate();
	toReturn += " | Description=<BR>";
	oVideo = this.getVideoDescriptor();
	toReturn += "&nbsp;&nbsp;" + oVideo.toString();
	return toReturn;
}
