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

Program.prototype.getDisplayableBeginDate = function() {
	return this._displayableBeginDate;
}

Program.prototype.setDisplayableBeginDate = function(dDisplayableBeginDate) {
	this._displayableBeginDate = dDisplayableBeginDate;
}

Program.prototype.getDisplayableEndDate = function() {
	return this._displayableEndDate;
}

Program.prototype.setDisplayableEndDate = function(dDisplayableEndDate) {
	this._displayableEndDate = dDisplayableEndDate;
}

Program.prototype.getVideoDescriptor = function() {
	return this._videoDescriptor;
}

Program.prototype.setVideoDescriptor = function(oVideoDescriptor) {
	this._videoDescriptor = oVideoDescriptor;
	oVideoDescriptor.setProgram(this);
}

Program.prototype.getChannel = function() {
	return this._channel;
}

Program.prototype.setChannel = function(oChannel) {
	this._channel = oChannel;
}

Program.prototype.getDurationInMinutes = function() {
	return (this.getDisplayableEndDate() - this.getDisplayableBeginDate())/60000;
}

Program.prototype.getWidthInPixels = function() {
	var durationInMinutes = this.getDurationInMinutes();
	
/*	alert(this.getVideoDescriptor().getTitle() + "\n" +
			"Begin " + this.getDisplayableBeginDate() + "\n" +
			"End " + this.getDisplayableEndDate() + "\n" +
			"Duration " + durationInMinutes + "\n" +	
			"width = " + ((durationInMinutes/60) * this.getChannel().getTVGuide().getOneHourInPixel()));
*/	
	return ((durationInMinutes/60) * this.getChannel().getTVGuide().getOneHourInPixel());
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
		//eDiv.style.float="right";
		
		this.getVideoDescriptor().draw(eDiv);
		var videoDiv = this.getVideoDescriptor().getElement();
		
		if (!document.onkeypress) {
			window.focusedProgram= this;
			document.onkeypress= function(evt) {
				if (window.focusedProgram) return window.focusedProgram.onkeypress(evt);
			};
			document.onkeydown= function(evt) {
				if (window.focusedProgram) return window.focusedProgram.onkeydown(evt);
			};
		}
		eDiv._parent = this;
		eDiv.onclick= function(evt) {
			this._parent.onfocus(evt);
		};

		
		eParent.appendChild(eDiv);
	}
	this.setElement(eDiv);
}

Program.prototype.onfocus= function(evt) {
	if (window.focusedProgram) window.focusedProgram.onblur(evt);
	this.getElement().style.border = "1px solid green";
	window.focusedProgram= this;
}
 
Program.prototype.onblur= function(evt) {
	this.getElement().style.border = "1px solid yellow";
}
 
Program.prototype.onkeypress= function(evt) {
/*	if (!evt) evt= window.event;
 
	var iKeyValue= evt.charCode?evt.charCode:evt.keyCode;
	alert(iKeyValue);
	if (iKeyValue < 48 || iKeyValue > 57) {
		//alert("unknown code:"+iKeyValue);
		return;
	}
	iKeyValue-= 48;
	
	if (!this.isPossible(iKeyValue)) {
		alert("The value "+iKeyValue+" is not allowed here.");
		return;
	}
 
	if (iKeyValue != this._value) {
		this.setValue(iKeyValue);
		if (iKeyValue) {
			this._element.style.color= "#A0A0A0";
		}
		else {
			this._element.style.color= "";
		}
		this._element.style.backgroundColor= "";
		this.draw();
	}
	return false;
	*/
}
 
Program.prototype.onkeydown= function(evt) {
	if (!evt) evt= window.event;
 
	var iKeyValue= evt.keyCode;
	
	switch(iKeyValue) {
	case 37: //LEFT
		var oPreviousProgram = this.getChannel().getPreviousProgram(this);
		if (oPreviousProgram) oPreviousProgram.onfocus();
		break;
	case 38: //UP
		var oPreviousChannel = this.getChannel().getTVGuide().getPreviousChannel(this.getChannel());
		if (oPreviousChannel) {
			var oProgram = oPreviousChannel.getProgramByDate(this.getBeginDate());
			if (oProgram) oProgram.onfocus();
		}
		break;
	case 39: //RIGHT
		var oNextProgram = this.getChannel().getNextProgram(this);
		if (oNextProgram) oNextProgram.onfocus();
		break;
	case 40: //DOWN
		var oNextChannel = this.getChannel().getTVGuide().getNextChannel(this.getChannel());
		if (oNextChannel) {
			var oProgram = oNextChannel.getProgramByDate(this.getBeginDate());
			if (oProgram) oProgram.onfocus();
		}
		break;
	default:
		return;
	}
 
	return false;
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
