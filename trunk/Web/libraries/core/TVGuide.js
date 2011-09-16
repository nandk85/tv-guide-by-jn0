var PADDING_TOP = 10;
var PADDING_LEFT = 10;
var ONE_HOUR_EQUALS_PIXEL = 100;
var CHANNEL_HEIGHT = 50;

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

TVGuide.prototype.setFocusToFirstProgram = function() {
	this.getChannelsList()[0].getProgramsList()[0].onfocus();
}

TVGuide.prototype.getOneHourInPixel = function() {
	return ONE_HOUR_EQUALS_PIXEL;
}

TVGuide.prototype.getChannelHeight = function() {
	return CHANNEL_HEIGHT;
}

TVGuide.prototype.computeDisplayableEndDate = function(dBeginDate) {
	//compute the end date with the start date and the size of the guide
	var tVGuideSizeInPixel = this.getElement().style.offsetWidth - CHANNEL_HEIGHT;
	var tvGuideDuration = (tVGuideSizeInPixel/ONE_HOUR_EQUALS_PIXEL) * 3600000;
	var endDate = new Date(dBeginDate.getTime() + tvGuideDuration);
	return endDate;
}

TVGuide.prototype.draw = function(eParent, dStartDate) {
	var eDiv= this.getElement();

	if (!eDiv) {
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
		
		for (var i=0; i<this.getChannelsList().length; i++) {
			this.getChannelsList()[i].draw(eDiv, dStartDate, dDisplayableEndDate);
			var channelDiv = this.getChannelsList()[i].getElement();
			//channelDiv.style.left= PADDING_LEFT + "px";
			//alert(((eDiv.style.top.replace("px","")*1) + (i*channelDiv.style.offsetHeight)));
			channelDiv.style.top= ((i*channelDiv.style.offsetHeight)) + "px";

			eDiv.style.offsetHeight=eDiv.style.offsetHeight + channelDiv.style.offsetHeight;
		}
		eDiv.style.height = eDiv.style.offsetHeight+"px";

		eParent.appendChild(eDiv);
	}
	
/*		if (!document.onkeypress) {
			window.currentGrid= this._parentGrid;
			document.onkeypress= function(evt) {
				if (window.currentGrid.focusedCell) return window.currentGrid.focusedCell.onkeypress(evt);
			};
			document.onkeydown= function(evt) {
				if (window.currentGrid.focusedCell) return window.currentGrid.focusedCell.onkeydown(evt);
			};
		}
		eDiv.onclick= function(evt) {
			this.oCell.onfocus(evt);
		};
		this._parentGrid._element.appendChild(eDiv);

		eDiv.oCell= this;
		this._element= eDiv;

	}

	
	if (eDiv.childNodes.length > 0) {
		for (var i=eDiv.childNodes.length-1; i>=0;i--) {
			eDiv.removeChild(eDiv.childNodes[i]);
		}
	}
	if (this.getValue()!=undefined) {
		var eValue= document.createElement("div");
		eValue.className = "cellValue";
		eValue.appendChild(document.createTextNode(this.getValue()));
		eDiv.appendChild(eValue);
	}
	for (var i=0; i<this._possibleValues.length;i++) {
		var val = this._possibleValues[i];
		//if(this._x==1 && this._y==1){
		//	alert("val=" + val);
		//}
		var eVal= document.createElement("div");
		eVal.className = "possibleValue";

		if (val==1 || val==4 || val==6 || val==8) {
			eVal.style.left = 2+"px";				
		} else if (val==2){
			eVal.style.left = (eDiv.style.offsetWidth/2)+"px";
		} else {
			eVal.style.left = (eDiv.style.offsetWidth+2)+"px";
		}

		if (val==1 || val==2 || val==3) {
			eVal.style.top = 2+"px";				
		} else if (val==4 || val==5){
			eVal.style.top = (eDiv.style.offsetHeight/3)+"px";
		} else if (val==6 || val==7){
			eVal.style.top = ((eDiv.style.offsetHeight/3)*2)+"px";
		} else {
			eVal.style.top = (eDiv.style.offsetHeight)+"px";
		}
		
		eVal.appendChild(document.createTextNode(val));

		eDiv.appendChild(eVal);
	}


	//if (eDiv.childNodes[0]) eDiv.removeChild(eDiv.childNodes[0]);
	//if (this._value) eDiv.appendChild(document.createTextNode(this._value));
	*/
}
  

TVGuide.prototype.toString = function() {
	var toReturn = "TVGuide : id=" + this._id; 
	toReturn += " | Name=" + this._name;
	for (var i=0; i<this.getChannelsList().length; i++) {
		toReturn += "<br>&nbsp;" + this.getChannelsList()[i].toString();
	}
	return toReturn;
  }