// alert('contentscript injected');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if (request) {
      // alert('contentscript: message received');
      // alert('JSON.stringify(request): ' + JSON.stringify(request));
      // open modal for adding new product
      if (request.request && request.request.title) {
        var info = request.request;
        // alert('info: ' + JSON.stringify(info))
        document.getElementsByClassName('market_add_item_lnk t_r')[0].children[0].click();
        setTimeout(function(){
          if (document.getElementById('item_name')) {
            document.getElementById('item_name').value = info.title;
            document.getElementById('item_description').value = info.desc;
            document.getElementById('item_price').value = info.price;
          } else {
            alert('open edit form of product');
          }
        }, 2000)
      } else { // script only started and now on original page - grub data
        var title = document.getElementById('item_name').value;
        var desc = document.getElementById('item_description').value;
        var price = document.getElementById('item_price').value;
        chrome.runtime.sendMessage({'title':title,'desc':desc,'price':price}, null);
      }
//   }
})
