var getSText = function(){
  var t = '';
  if(window.getSelection){
    t = window.getSelection();
  }
  return t;
}
selectedText = ''
$(function() {
  $('body').mouseup(function(){
    selectedText = getSText();
    //port = chrome.extension.connect({name: "selectedText"});
    //port.postMessage({value: selectedText});
    var notification = webkitNotifications.createNotification(
      'icons/icon-48.png',  // icon url - can be relative
      'you have selected',  // notification title
      selectedText  // notification body text
    );
    if(window.getSelection){
      notification.show();
    }
  });
 });
