var selectNotify = function(inArray){
 var notification = webkitNotifications.createNotification(
      'icons/icon-48.png',  // icon url - can be relative
      'you have selected',  // notification title
      inArray.value  // notification body text
    );
    notification.ondisplay = function(){
      chrome.browserAction.setBadgeBackgroundColor({color: [218 , 17 , 2 , 255]});
      chrome.browserAction.setBadgeText({text:inArray.badge});
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
           selectNotify(msg);
           oldVal = msg.value;
       });
     }
  });
  
  var allYourContext = chrome.contextMenus.create({"title": "All your base64", contexts:['selection']});
    var stringContext = chrome.contextMenus.create({"title": "String", "parentId": allYourContext});
  var divider = chrome.contextMenus.create({contexts:['separator']});
});