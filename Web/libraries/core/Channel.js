function Channel(id, iNumber, sName){
	this._id = id;
	this._number = iNumber;
	this._name = sName;
}

Channel.prototype.getId = function() {
	return this._id;
}
Channel.prototype.getNumber = function() {
	return this._number;
}
Channel.prototype.getName = function() {
	return this._name;
}


Channel.prototype.getDescription = function() {
	return this._description;
}

Channel.prototype.setDescription = function(sDescription) {
	this._description = sDescription;
}

Channel.prototype.getLogo = function() {
	return this._logo;
}

Channel.prototype.setLogo = function(sLogo) {
	this._logo = sLogo;
}

Channel.prototype.getProgramsList = function() {
	return this._programsList;
}

Channel.prototype.setProgramsList = function(oProgramList) {
	this._programsList = oProgramsList;
}

Channel.prototype.addProgram = function(oProgram) {
	if(!this._programsList) {
		this._programsList = new Array();
	}
	this._programsList.push(oProgram);
	oProgram.setChannel(this);
}

Channel.prototype.getNextProgram = function(oCurrentProgram) {
	var oNextProgram;
	for (var i=0; i<this.getProgramsList().length; i++) {
		if (oCurrentProgram==this.getProgramsList()[i]){
			if (this.getProgramsList().length==i) {
				break;
			} else {
				oNextProgram = this.getProgramsList()[i+1];
			}
		} 
	}
	return oNextProgram;
}

Channel.prototype.getPreviousProgram = function(oCurrentProgram) {
	var oPreviousProgram;
	for (var i=this.getProgramsList().length-1; i>=0; i--) {
		if (oCurrentProgram==this.getProgramsList()[i]){
			if (i==0) {
				break;
			} else {
				oPreviousProgram = this.getProgramsList()[i-1];
			}
		} 
	}
	return oPreviousProgram;
}

Channel.prototype.getProgramByDate = function(dDate) {
	var oCurrentProgram;
	for (var i=0; i<this.getProgramsList().length; i++) {
		var oCurrentProgram = this.getProgramsList()[i];
		if ((oCurrentProgram.getBeginDate() >= dDate) || ((oCurrentProgram.getBeginDate() <= dDate) && (oCurrentProgram.getEndDate() >= dDate))){
			return oCurrentProgram;
			break;
		} 
	}
	return oCurrentProgram;
}

Channel.prototype.getTVGuide = function() {
	return this._tvGuide;
}

Channel.prototype.setTVGuide = function(oTVGuide) {
	this._tvGuide = oTVGuide;
}

Channel.prototype.getElement = function() {
	return this._element;
}

Channel.prototype.setElement = function(eDiv) {
	this._element = eDiv;
}

Channel.prototype.getElementHeader = function() {
	return this._elementHeader;
}

Channel.prototype.setElementHeader = function(eDiv) {
	this._elementHeader = eDiv;
}

Channel.prototype.getElementContent = function() {
	return this._elementContent;
}

Channel.prototype.setElementContent = function(eDiv) {
	this._elementContent = eDiv;
}

Channel.prototype.computeLeft = function(oProgram, dTVGuideStartDate) {
	var dBeginDate = oProgram.getDisplayableBeginDate();
	
/*	alert("TVGuideStart " + dTVGuideStartDate + "\n" +
			oProgram.getVideoDescriptor().getTitle() + "\n" + 
			"Begin " + oProgram.getBeginDate() + "\n" +
			"End " + oProgram.getEndDate());
*/
	
	if (dBeginDate <= dTVGuideStartDate) {
		return 0;
	} else {
		return ((dBeginDate - dTVGuideStartDate)/3600000) * this.getTVGuide().getOneHourInPixel();
	}
}

Channel.prototype.draw = function(eParent, dStartDate, dEndDate) {
	var eDiv= this.getElement();
	if (!eDiv) {
		eDiv= document.createElement("div");
		eDiv.style.position="absolute";

		//position : done by parent
		eDiv.style.position="absolute";

		//size
		eDiv.style.offsetHeight=this.getTVGuide().getChannelHeight();
		eDiv.style.height = eDiv.style.offsetHeight+"px";
		eDiv.style.offsetWidth=eParent.style.offsetWidth;
		eDiv.style.width = eDiv.style.offsetWidth+"px";

		eDiv.style.border = "1px solid red";

		//header
		var eDivHeader= document.createElement("div");
		
		//position : done by parent
		eDivHeader.style.position="absolute";

		//size
		eDivHeader.style.offsetHeight=this.getTVGuide().getChannelHeight();
		eDivHeader.style.height = this.getTVGuide().getChannelHeight()+"px";
		eDivHeader.style.offsetWidth=this.getTVGuide().getChannelHeight();
		eDivHeader.style.width = this.getTVGuide().getChannelHeight()+"px";
		eDivHeader.appendChild(document.createTextNode(this.getName()));
		
		eDivHeader.style.border = "1px solid black";

		eDiv.appendChild(eDivHeader);
		this.setElementHeader(eDivHeader)

		//Content
		var eDivContent= document.createElement("div");

		//position : done by parent
		eDivContent.style.position="absolute";
		eDivContent.style.left = this.getTVGuide().getChannelHeight()+"px";

		//size
		eDivContent.style.offsetHeight=this.getTVGuide().getChannelHeight();
		eDivContent.style.height = this.getTVGuide().getChannelHeight()+"px";
		
		eDivContent.style.border = "1px solid blue";

		eDiv.appendChild(eDivContent);
		this.setElementContent(eDivContent);

		for (var i=0; i<this.getProgramsList().length; i++) {
			var oProgram = this.getProgramsList()[i]; 
			if (oProgram.getEndDate() > dStartDate) {
				if (oProgram.getBeginDate() < dStartDate) {
					oProgram.setDisplayableBeginDate(dStartDate);
				} else {
					oProgram.setDisplayableBeginDate(oProgram.getBeginDate());
				}
				if (oProgram.getEndDate() > dEndDate) {
					oProgram.setDisplayableEndDate(dEndDate);
				} else {
					oProgram.setDisplayableEndDate(oProgram.getEndDate());
				}
/*				alert("TVGuideStart " + dStartDate + "\n" +
						"TVGuideEnd " + dEndDate + "\n" +
						oProgram.getVideoDescriptor().getTitle() + "\n" + 
						"Begin " + oProgram.getDisplayableBeginDate() + "\n" +
						"End " + oProgram.getDisplayableEndDate());
*/
				
				//alert(oProgram.getDisplayableDate());
				oProgram.draw(eDivContent);
				var programDiv = oProgram.getElement();
				//compute left with beginDate
				programDiv.style.left= this.computeLeft(oProgram, dStartDate) + "px";
				programDiv.style.top= eDiv.style.top;
			}
		}
		eParent.appendChild(eDiv);
	}
	this.setElement(eDiv);
}


Channel.prototype.toString = function() {
	var toReturn = "Channel : id=" + this.getId(); 
	toReturn += " | Name=" + this.getName();
	toReturn += " | Number=" + this.getNumber(); 
	for (var i=0; i<this.getProgramsList().length; i++) {
		toReturn += "<br>&nbsp;" + this.getProgramsList()[i].toString();
	}
	return toReturn;
  }