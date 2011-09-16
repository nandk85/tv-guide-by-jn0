var PADDING_TOP = 10;
var PADDING_LEFT = 10;
var ONE_HOUR_EQUALS_PIXEL = 100;
var CHANNEL_HEIGHT = 50;
var CHANNEL_HEADER_WIDTH = 40;
var FORWARD_STEP_IN_MINUTES = 30;
var NUMBER_OF_CHANNEL_TO_DISPLAY = 4;

function TVGuide(id, name){	
	this._id = id;
	this._name = name;
}

TVGuide.prototype.getId = function() {
	return this._id;
}

TVGuide.prototype.getName = function() {
	return this._name;
}


TVGuide.prototype.getChannelsList = function() {
	return this._channelsList;
}

TVGuide.prototype.setChannelsList = function(oChannelsList) {
	this._channelsList = oChannelsList;
}

TVGuide.prototype.addChannel = function(oChannel) {
	if(!this._channelsList) {
		this._channelsList = new Array();
	}
	this._channelsList.push(oChannel);
	oChannel.setTVGuide(this);
}

TVGuide.prototype.getNextChannel = function(oCurrentChannel) {
	var oNextChannel = oCurrentChannel;
	for (var i=0; i<this.getChannelsList().length; i++) {
		if (oCurrentChannel==this.getChannelsList()[i]){
			if (this.getChannelsList().length==i) {
				break;
			} else {
				oNextChannel = this.getChannelsList()[i+1];
			}
		} 
	}
	return oNextChannel;
}

TVGuide.prototype.getPreviousChannel = function(oCurrentChannel) {
	var oPreviousChannel = oCurrentChannel;
	for (var i=this.getChannelsList().length-1; i>=0; i--) {
		if (oCurrentChannel==this.getChannelsList()[i]){
			if (i==0) {
				break;
			} else {
				oPreviousChannel = this.getChannelsList()[i-1];
			}
		} 
	}
	return oPreviousChannel;
}

TVGuide.prototype.getElement = function() {
	return this._element;
}

TVGuide.prototype.setElement = function(eDiv) {
	this._element = eDiv;
}

TVGuide.prototype.getParentElement = function() {
	return this._parentElement;
}

TVGuide.prototype.setParentElement = function(eDiv) {
	this._parentElement = eDiv;
}

TVGuide.prototype.setFocusToFirstProgram = function() {
	this.getChannelsList()[0].getProgramsList()[0].onfocus();
}

TVGuide.prototype.getOneHourInPixel = function() {
	return ONE_HOUR_EQUALS_PIXEL;
}

TVGuide.prototype.getChannelHeight = function() {
	return CHANNEL_HEIGHT;
}

TVGuide.prototype.getChannelHeaderWidth = function() {
	return CHANNEL_HEADER_WIDTH;
}

TVGuide.prototype.getForwardStepInMinutes = function() {
	return FORWARD_STEP_IN_MINUTES;
}

TVGuide.prototype.computeDisplayableEndDate = function(dBeginDate) {
	//compute the end date with the start date and the size of the guide
	var tVGuideSizeInPixel = this.getElement().style.offsetWidth - CHANNEL_HEADER_WIDTH;
	var tvGuideDuration = (tVGuideSizeInPixel/ONE_HOUR_EQUALS_PIXEL) * 3600000;
	var endDate = new Date(dBeginDate.getTime() + tvGuideDuration);
	return endDate;
}

TVGuide.prototype.deleteElement = function() {
//	for (var i=0; i<this.getChannelsList().length; i++) {
//		this.getChannelsList()[i].deleteElement();
//		if (this.getElement()) this.getElement().removeChild(this.getElement().childNodes[0]);
//	}
	if (this.getParentElement()) {
		this.getParentElement().removeChild(this.getElement());
	}
}

TVGuide.prototype.getCurrentStartDate = function() {
	return _startDate;
}

TVGuide.prototype.setCurrentStartDate = function(dStartDate) {
	_startDate = dStartDate;
}

TVGuide.prototype.getNumberOfChannelToDisplay = function() {
	return NUMBER_OF_CHANNEL_TO_DISPLAY;
}

TVGuide.prototype.draw = function(eParent, dStartDate, oChannelToDisplay) {
	this.deleteElement();
	this.setCurrentStartDate(dStartDate);
	this.setParentElement(eParent);
	
	var eDiv= this.getElement();

	eDiv= document.createElement("div");
	this.setElement(eDiv);
	//Position
	eDiv.style.position="absolute";
	eDiv.style.left= PADDING_LEFT + "px";
	eDiv.style.top= PADDING_TOP + "px";
	
	//size
	eDiv.style.offsetWidth=window.innerWidth - 40;
	eDiv.style.width = eDiv.style.offsetWidth+"px";
	eDiv.style.offsetHeight=0;
	
	eDiv.style.border = "1px solid red";
	
	var dDisplayableEndDate = this.computeDisplayableEndDate(dStartDate);
	
	var startNumberChannel = 0;
	var endNumberChannel = this.getNumberOfChannelToDisplay();
	var numberOfChannelInTVGuide = this.getChannelsList().length;
	
	if(!oChannelToDisplay) oChannelToDisplay = this.getChannelsList()[0];
	for (var i=0; i<numberOfChannelInTVGuide; i++) {
		if (this.getChannelsList()[i] == oChannelToDisplay) {
			endNumberChannel = i + this.getNumberOfChannelToDisplay();
			if (endNumberChannel > numberOfChannelInTVGuide) {
				endNumberChannel = numberOfChannelInTVGuide;
			}
			startNumberChannel = endNumberChannel - this.getNumberOfChannelToDisplay();
			if (startNumberChannel < 0) {
				startNumberChannel = 0;
			}
		}
	}

/*	alert("nombre de chaine dans le guide " + numberOfChannelInTVGuide + "\n" +
			"chaine pivot " + oChannelToDisplay + "\n" +
			"start = " + startNumberChannel + "\n" + 
			"end = " + endNumberChannel);
*/
	var nbDisplayedChannel = 0;
	for (var i=startNumberChannel; i<endNumberChannel; i++) {
		this.getChannelsList()[i].draw(eDiv, dStartDate, dDisplayableEndDate);
		var channelDiv = this.getChannelsList()[i].getElement();
		//channelDiv.style.left= PADDING_LEFT + "px";
		//alert(((eDiv.style.top.replace("px","")*1) + (i*channelDiv.style.offsetHeight)));
		channelDiv.style.top= ((nbDisplayedChannel*channelDiv.style.offsetHeight)) + "px";

		eDiv.style.offsetHeight=eDiv.style.offsetHeight + channelDiv.style.offsetHeight;
		nbDisplayedChannel++;
	}
	eDiv.style.height = eDiv.style.offsetHeight+"px";

	eParent.appendChild(eDiv);
}
  

TVGuide.prototype.toString = function() {
	var toReturn = "TVGuide : id=" + this._id; 
	toReturn += " | Name=" + this._name;
	for (var i=0; i<this.getChannelsList().length; i++) {
		toReturn += "<br>&nbsp;" + this.getChannelsList()[i].toString();
	}
	return toReturn;
  }