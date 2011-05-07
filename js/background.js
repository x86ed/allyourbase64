var selectNotify = function(string){
 var notification = webkitNotifications.createNotification(
      'icons/icon-48.png',  // icon url - can be relative
      'you have selected',  // notification title
      selectedText  // notification body text
    );
    notification.show();
}