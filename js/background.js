var selectNotify = function(string){
 var notification = webkitNotifications.createNotification(
      'icons/icon-48.png',  // icon url - can be relative
      'you have selected',  // notification title
      selectedText  // notification body text
    );
    notification.show();
}$(function() {
	chrome.extension.onConnect.addListener(function(port) {
    if(port.name == " ")
    port.onMessage.addListener(function(msg) {
      if (msg.joke == "Knock knock")
        port.postMessage({question: "Who's there?"});
      else if (msg.answer == "Madame")
        port.postMessage({question: "Madame who?"});
      else if (msg.answer == "Madame... Bovary")
        port.postMessage({question: "I don't get it."});
    });
  });
});