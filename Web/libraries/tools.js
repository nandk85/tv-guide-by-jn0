function include(fileName){
	//window.document.write("<script type='text/javascript' src='libraries/"+fileName+"'></script>" );
}

remove=function(){
	var tab = arguments[0];
	var valueToRemove = arguments[1]; 
	for(var i=0; i < tab.length; i++){
		if (tab[i]==valueToRemove)
			tab.splice(i,1);
	}
	return tab;
};
 
 function getObject (the_id) {
	if (typeof the_id != 'string') {
		return the_id;
	}
	if (typeof document.getElementById != 'undefined') {
		return document.getElementById(the_id);
	} else if (typeof document.all != 'undefined') {
		return document.all[the_id];
	} else if (typeof document.layers != 'undefined') {
		return document.layers[the_id];
	} else {
		return null;
	}
}
