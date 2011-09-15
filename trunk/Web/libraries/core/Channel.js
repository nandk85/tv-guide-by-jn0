var CHANNEL_HEIGHT = 50;

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

Channel.prototype.draw = function(eParent, dStartDate) {
	var eDiv= this.getElement();

	if (!eDiv) {
		eDiv= document.createElement("div");
		eDiv.style.position="absolute";

		//position : done by parent
		eDiv.style.position="absolute";

		//size
		eDiv.style.offsetHeight=CHANNEL_HEIGHT;
		eDiv.style.height = eDiv.style.offsetHeight+"px";
		eDiv.style.offsetWidth=eParent.style.offsetWidth;
		eDiv.style.width = eDiv.style.offsetWidth+"px";

		eDiv.style.border = "1px solid red";

		//header
		var eDivHeader= document.createElement("div");
		
		//position : done by parent
		eDivHeader.style.position="absolute";

		//size
		eDivHeader.style.offsetHeight=CHANNEL_HEIGHT;
		eDivHeader.style.height = CHANNEL_HEIGHT+"px";
		eDivHeader.style.offsetWidth=CHANNEL_HEIGHT;
		eDivHeader.style.width = CHANNEL_HEIGHT+"px";
		eDivHeader.appendChild(document.createTextNode(this.getName()));
		
		eDivHeader.style.border = "1px solid black";

		eDiv.appendChild(eDivHeader);
		this.setElementHeader(eDivHeader)

		//Content
		var eDivContent= document.createElement("div");

		//position : done by parent
		eDivContent.style.position="absolute";
		eDivContent.style.left = CHANNEL_HEIGHT+"px";

		//size
		eDivContent.style.offsetHeight=CHANNEL_HEIGHT;
		eDivContent.style.height = CHANNEL_HEIGHT+"px";
		
		eDivContent.style.border = "1px solid blue";

		eDiv.appendChild(eDivContent);
		this.setElementContent(eDivContent);

		var previousLeft = 0;
		for (var i=0; i<this.getProgramsList().length; i++) {
			var oProgram = this.getProgramsList()[i]; 
			if (oProgram.getEndDate() > dStartDate) {
				if (oProgram.getBeginDate() < dStartDate) {
					oProgram.setDisplayableDate(dStartDate);
				} else {
					oProgram.setDisplayableDate(oProgram.getBeginDate());
				}
				//alert(oProgram.getDisplayableDate());
				oProgram.draw(eDivContent);
				var programDiv = oProgram.getElement();
				//compute left with beginDate
				programDiv.style.left= previousLeft + "px";
				programDiv.style.top= eDiv.style.top;
				previousLeft = previousLeft + programDiv.style.offsetWidth;
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