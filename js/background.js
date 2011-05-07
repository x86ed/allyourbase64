var selectNotify = function(inString){
 var notification = webkitNotifications.createNotification(
      'icons/icon-48.png',  // icon url - can be relative
      'you have selected',  // notification title
      inString  // notification body text
    );
    notification.show();
    return "SelectNotify()";
}
$(function() {
	chrome.extension.onConnect.addListener(function(port) {
     if(port.name == "selectedText"){
       port.onMessage.addListener(function(msg) {
         if(msg.value.length)
           selectNotify(msg.value); 
       });
     }
  });
});