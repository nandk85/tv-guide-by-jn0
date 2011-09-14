function TVGuide(id, number, name){
	this._id = id;
	this._name = name;
}

TVGuide.prototype.getId() {
	return this._id;
}

TVGuide.prototype.getName() {
	return this._name;
}


TVGuide.prototype.getChannelsList() {
	return this._channelsList;
}

TVGuide.prototype.setChannelsList(oChannelsList) {
	this._channelsList = oChannelsList;
}

TVGuide.prototype.addChannel(oChannel) {
	this._channelsList[oChannel.getNumber()] = oChannel;
}



TVGuide.prototype.draw = function() {
	var eDiv= this._element;

	if (!eDiv) {
		eDiv= document.createElement("div");
		eDiv.className= "gameCell";
		eDiv.style.left= ""+((this._size)*(this._x-1)+2*parseInt((this._x-1)/3))+"px";
		eDiv.style.top= ""+((this._size)*(this._y-1)+2*parseInt((this._y-1)/3))+"px";
		eDiv.style.offsetWidth=this._size-11;
		eDiv.style.width = eDiv.style.offsetWidth+"px";
		eDiv.style.offsetHeight=this._size-11;
		eDiv.style.height = eDiv.style.offsetHeight+"px";
		if (!document.onkeypress) {
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
}
  

TVGuide.prototype.toString = function() {
	var toReturn = "TVGuide : id=" + this._id; 
	toReturn += " | Name=" + this._name;
	return toReturn;
  }