var pad = function(number, base) {
	base = parseInt(base);
   	switch(base){
		case 2:
			base = 8;
			break;
		case 10:
			base = 3;
			break;
		case 16:
			base = 2;
			break;
		default:
			base = 0;
			break;
	}
    while (number.length < base)
        number = '0' + number;
    return number;

}
var encodeBase = function(inString, base){
	var output = "";
	base = parseInt(base);
	if(base<63)
		for (var i = 0; i < inString.length; i++) 
			output +=  pad(inString.charCodeAt(i).toString(base), base) + " ";
	else if (base == 64)
		output = btoa(inString);
	else
		output = inString;
	return output;
}

var decodeBase = function(inString,base){
	var output = "";
	base = parseInt(base);
	if(base<63){
		var baseArray = inString.split(" ")
		for (var i = 0; i < baseArray.length; i ++){
			output += String.fromCharCode(parseInt(baseArray[i],base).toString(10));
			}
	}else if (base == 64){
		output = atob(inString);
	}else{
		output = inString;
	}
	return output;
}

$(function() {
	$("textarea").keyup(function(e){
		$(this).addClass("selected")
		e.preventDefault();
		var pushVal = decodeBase($(this).val(),$(this).attr("rel"));
		$("textarea:not(.selected)").each(function (index, item) {
			$(item).attr("id","")
			$(item).val(encodeBase(pushVal,$(item).attr("rel")))
		});
		
		//changes image
		$(".b64-imageOutput").attr("src","data:image/png;base64," + $("#b64-base64").val());		
	});
});