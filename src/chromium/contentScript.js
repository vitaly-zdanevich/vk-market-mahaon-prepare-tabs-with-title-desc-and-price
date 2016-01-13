alert('contentscript injected');

// TODO this not reveice the call at new tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if (request) {
      alert('contentscript: message received');

      // open modal for adding new product
      if (request.title) {
        document.getElementsByClassName('market_add_item_lnk t_r')[0].children[0].click();
      } else { // script only started and now on original page - grub data
        var title = document.getElementById('item_name').value;
        var desc = document.getElementById('item_description').value;
        var price = document.getElementById('item_price').value;
        chrome.runtime.sendMessage({'title':title,'desc':desc,'price':price}, null);
      }
//   }
})
