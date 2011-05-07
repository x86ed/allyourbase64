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
    port = chrome.extension.connect({name: "selectedText"});
    port.postMessage({value: selectedText});
  });
 });
