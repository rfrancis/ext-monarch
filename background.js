var execID;

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		"id": "extme_execute",
		"title": "Execute Rules",
		"contexts": ["browser_action"],
		"enabled": true
	});
	chrome.contextMenus.onClicked.addListener(function(info) {
		if (info.menuItemId == "extme_execute") {
			var enable, disable;
			loadRules(function(en,dis) {
				enable = en;
				disable = dis;
				executeRules(enable,disable);
			});
		}
	});
});

