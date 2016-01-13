// ui button
chrome.tabs.onUpdated.addListener(function(tabId,  changeInfo,  tab){
  if (~tab.url.indexOf('vk.com')) // if we at vk
    chrome.pageAction.show(tabId) // make ui button active (colored and functional)
})

// onclick - insert & execute contentScript
chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file:"contentScript.js"});
  setTimeout(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // alert('tabs[0].id: ' + tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, {xxx:'xxx'}, function(response){
        // alert('background.js: callback of sending message to contentScript');
      });
    });
  }, 3000)
})

// getted message from contentScript with data of form
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  // alert('getted message from contentScript: \n\n' + request.title + '\n\n' +
                                                    // request.desc + '\n\n' +
                                                    // request.price + '\n\n');
  fill(request, sender.tab.url);
})

var i = 0;
function fill(request, url) {
	if (i < 10 && request.title.length > 0) {
        chrome.tabs.create({url:url}); // open tab

        setTimeout(function(){ // wait before newly opened tab loads
          // insert contentScript into page
          chrome.tabs.executeScript(null, {file:"contentScript.js"});
        },2000);
        setTimeout(function(){
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // alert('fill: tabs[0].id: ' + tabs[0].id);
            // alert('request.title: ' + request.title);
            chrome.tabs.sendMessage(tabs[0].id, {request:request}, function(response){
              // alert('callback of sending message to contentScript');
            });
          });
        }, 3000)
		setTimeout(function(){
			i++;
			fill(request, url);
		}, 5000);
	} else {
		i = 0;
	}
}
