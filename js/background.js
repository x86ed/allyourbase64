var selectNotify = function(inString){
 var notification = webkitNotifications.createNotification(
      'img/catsmouth.gif',  // icon url - can be relative
      'you have selected',  // notification title
      inString  // notification body text
    );
    notification.ondisplay = function(){
      chrome.browserAction.setBadgeBackgroundColor({color: [218,17,2,255]});
      chrome.browserAction.setBadgeText({text:"str"});
      chrome.browserAction.setPopup({popup: 'popup.html'});
    }
    notification.show();
    return "SelectNotify()";
}
var oldVal= "";
$(function() {
	chrome.extension.onConnect.addListener(function(port) {
     if(port.name == "selectedText"){
       port.onMessage.addListener(function(msg) {
         if(msg.value.length && oldVal != msg.value)
           selectNotify(msg.value);
           oldVal = msg.value;
       });
     }
  });
});