ZeroClipboard.setMoviePath( '../flash/ZeroClipboard.swf' );
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
	if(base<63 && inString)
		for (var i = 0; i < inString.length; i++)
            if(base == 16)
                output +=  "&#x" + pad(inString.charCodeAt(i).toString(base), base) + "; ";
            else if(base == 10)
                output += "&#" + pad(inString.charCodeAt(i).toString(base), base) + "; ";
            else
                output +=  pad(inString.charCodeAt(i).toString(base), base) + " ";
	else if (base == 64)
		output = btoa(inString);
	else if (base == 80)
		output = encodeURI(inString);
	else if (base == 443)
		output = encodeURIComponent(inString);
	else
		output = inString;
	return output;
}

var decodeBase = function(inString,base){
	var output = "";
	base = parseInt(base);
	if(base<63 && inString){
		var baseArray = inString.split(" ");
		for (var i = 0; i < baseArray.length; i ++){
			output += String.fromCharCode(parseInt(baseArray[i].replace(/(&#x|&#)/, ""),base).toString(10));
			}
	}else if (base == 64){
		output = atob(inString);
	}else if (base == 80){
		output = decodeURI(inString);
	}else if (base == 443){
		output = decodeURIComponent(inString);
	}else{
		output = inString;
	}
	return output;
}

$(function() {
  chrome.browserAction.setBadgeText({text: ""});
	$("textarea").keyup(function(e){
		$("textarea").removeClass("selected");
		$(this).addClass("selected");
        //alert(e.keyCode);
		e.preventDefault();
		var pushVal = decodeBase($(this).val(),$(this).attr("rel"));
		$("textarea:not(.selected)").each(function (index, item) {
			//$(item).attr("id","");
			$(item).val(encodeBase(pushVal,$(item).attr("rel")));
		});
		
		//changes image
		var imgType = pushVal.substring(0,3);
			if (imgType == 'Ø¯Ø') {
				imgType = "jpeg";
			}else if (imgType == "GIF") {
					imgType = "gif";
			}else if (imgType == "PNG") {
					imgType = "png";
			}else {
					imgType = 0;
			}
		if (imgType) {
			$(".bs-imageOutput").attr("src", "data:image/" + imgType + ";base64," + $("#bs-base64").val());
			$(".bs-imageBox").css('display', 'block');
		}
		else {
			$(".bs-imageBox").css('display', 'none');
		}	
	});
  var bgOb = chrome.extension.getBackgroundPage();
  if(bgOb.sendVal.length && bgOb.typeVal.length)
    $(bgOb.typeVal).val(bgOb.sendVal).keyup();
});