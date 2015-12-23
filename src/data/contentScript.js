self.port.on('start', function(info){
	var title = document.getElementById('item_name').value;
	var desc = document.getElementById('item_description').value;
	var price = document.getElementById('item_price').value;
	self.port.emit('start', {'title':title,'desc':desc,'price':price});	
})

self.port.on('fill', function(info){
	setTimeout(function(){
		if (document.getElementsByClassName('popup_box_container').length == 0) { // if not first tab with manually filled inputs
			document.getElementsByClassName('market_add_item_lnk t_r')[0].children[0].click();
			setTimeout(function(){
				document.getElementById('item_name').value = info.title;
				document.getElementById('item_description').value = info.desc;
				document.getElementById('item_price').value = info.price;			
			}, 2000)
		}
	}, 2000)
})