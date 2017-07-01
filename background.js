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
			loadRules(function(enable,disable) {
				executeRules(enable,disable);
				doNotify("Updating enabled extensions!");
			});
		}
	});
});

chrome.storage.local.get("opt_autostart",function(data) {
	if (data["opt_autostart"]) {
		loadRules(function(enable,disable) {
			executeRules(enable,disable);
			doNotify("Updating enabled extensions!");
		});
	}
});
