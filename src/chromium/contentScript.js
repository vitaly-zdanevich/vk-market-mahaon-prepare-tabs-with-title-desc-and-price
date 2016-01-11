alert('contentscript');

var title = document.getElementById('item_name').value;
var desc = document.getElementById('item_description').value;
var price = document.getElementById('item_price').value;

chrome.runtime.sendMessage({'title':title,'desc':desc,'price':price}, null);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if (request) {
      alert('fill tab here');
      document.getElementsByClassName('market_add_item_lnk t_r')[0].children[0].click();
//   }
})