var oldVal= "";
var sendVal= "";
var typeVal ="";
var sendMessageP = true;
var selectNotify = function(inString,badgeType){
  if(sendMessageP){
     var notification = webkitNotifications.createNotification(
        'icons/icon-48.png',  // icon url - can be relative
        'you have selected',  // notification title
        inString  // notification body text
      );
      notification.ondisplay = function(){
        chrome.browserAction.setBadgeBackgroundColor({color: [218 , 17 , 2 , 255]});
        chrome.browserAction.setBadgeText({text:badgeType});
      }
      notification.show();
      switch (badgeType){
        case 'b64':
          typeVal = '#bs-base64';
          break;
         case '010':
          typeVal = '#bs-binary';
          break;
         case 'dec':
          typeVal = '#bs-dec';
          break;
         case 'hex':
          typeVal = '#bs-hex';
          break;
         case 'url':
          typeVal = '#bs-url';
          break;
         case 'url+':
          typeVal = '#bs-urlC';
          break;
         default:
           typeVal ="#bs-string";   
      }
      sendMessageP = false;
  }
  return "SelectNotify()";
}

function encodeImage(info) {
          url = info.srcUrl;
          /*$.get(url, function(data) {
  			    var raw = data.toString();
            var charCounted = 0;
            var binaryEncoded = '';
            var bitarray =[];
            while (charCounted<raw.length-1);
              binaryEncoded += raw.charCodeAt(charCounted);
            for (var i=0; i<binaryEncoded.length; i+=interval)
              bitarray.push(string.substring (i, i+interval));
			      sendVal = bitarray;
			      console.log(sendVal);
		  });*/
        BinaryAjax(
        url,
        function(oHTTP) {
            console.log(oHTTP.binaryResponse.getBytesAt(0,oHTTP.binaryResponse.getLength()));
        }
    )
		  typeVal = '#bs-string';
          var notification = webkitNotifications.createNotification(
            'icons/icon-48.png',  // icon url - can be relative
            'you have encoded',  // notification title
             url  // notification body text
          );
          notification.ondisplay = function(){
            chrome.browserAction.setBadgeBackgroundColor({color: [218 , 17 , 2 , 255]});
            chrome.browserAction.setBadgeText({text:"img"});
          }
          notification.show();
}

$(function() {
	chrome.extension.onConnect.addListener(function(port) {
     if(port.name == "selectedText"){
       port.onMessage.addListener(function(msg) {
         if(msg.value.length && oldVal != msg.value)
           sendMessageP = true;
           sendVal = oldVal = msg.value;
       });
     }
  });
    //Selected menu options
    var stringContext = chrome.contextMenus.create({title: "ASCII", contexts:['selection'],onclick:function(){selectNotify(sendVal,'str')}});
    var base64Context = chrome.contextMenus.create({title: "Base64", contexts:['selection'],onclick:function(){selectNotify(sendVal,'b64')}});
    var binaryContext = chrome.contextMenus.create({title: "Binary", contexts:['selection'],onclick:function(){selectNotify(sendVal,'010')}});
    var decimalContext = chrome.contextMenus.create({title: "Decimal", contexts:['selection'],onclick:function(){selectNotify(sendVal,'dec')}});
    var hexContext = chrome.contextMenus.create({title: "Hexadecimal", contexts:['selection'],onclick:function(){selectNotify(sendVal,'hex')}});
    var urlContext = chrome.contextMenus.create({title: "URL Encoded", contexts:['selection'],onclick:function(){selectNotify(sendVal,'url')}});
    var urlComponentContext = chrome.contextMenus.create({title: "URL Component",contexts:['selection'],onclick:function(){selectNotify(sendVal,'url+')}});
    
    //Image menu options
    var imageContext = chrome.contextMenus.create({title: "base64 this", contexts:['image'],onclick:function(item){encodeImage(item)}});
});