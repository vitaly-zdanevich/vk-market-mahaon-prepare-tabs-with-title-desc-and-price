const { getMostRecentBrowserWindow } = require('sdk/window/utils');
let { Cu } = require('chrome');
Cu.import('resource://gre/modules/Timer.jsm'); // without this will not work setTimer of usual js

var
	i = 0,
	self = require('sdk/self'),
	data = require('sdk/self').data,
	tabs = require('sdk/tabs'),
	prefs = require('sdk/simple-prefs').prefs,
	{ ActionButton } = require('sdk/ui/button/action'),
	prefs = require('sdk/simple-prefs').prefs,

	button = ActionButton({
		id: 'button',
		label: 'open form with title, desc, price, how-many-tabs',
		icon: './ico.png',
		onClick: function(){
			var worker = tabs.activeTab.attach({
				contentScriptFile: './contentScript.js'
			});
			worker.port.emit('start'); // call 'start' in contentScript
			worker.port.on('start', function(info){ // here we receiving data from contentScript
				fill(info);
			});
		}
	})
;

function fill(info) {
	if (i < prefs.tabs && info.title.length > 0) {
		var url = tabs.activeTab.url;
		tabs.open(url);
		var worker = tabs.activeTab.attach({
			contentScriptFile: './contentScript.js'
		});
		worker.port.emit('fill', info); // call method 'fill' from contentScript
		setTimeout(function(){
			i++;
			fill(info);
		}, 2000);
	} else {
		i = 0;
	}
}
