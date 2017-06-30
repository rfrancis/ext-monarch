var loadRules = function(cb) {
	chrome.storage.local.get(["enable","disable"],function(data) {
		cb(data.enable,data.disable);
	});
}

var executeRules = function (enable,disable) {
	chrome.management.getAll(function(a) {
		a.forEach(function(x) {
			if (enable[x.id])
				chrome.management.setEnabled(x.id,true);
			if (disable[x.id])
				chrome.management.setEnabled(x.id,false);
		});
	});
}

