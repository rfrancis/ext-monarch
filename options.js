var auto = document.querySelector("#opt_autostart");
chrome.storage.local.get("opt_autostart",function(data) {
	auto.checked = data["opt_autostart"];
	auto.addEventListener("change",function() {
		chrome.storage.local.set({
			"opt_autostart":auto.checked
		},function() {
			doNotify("Options saved!");
		});
	});
});

document.querySelector("#opt_export").addEventListener("click",function() {
	chrome.storage.local.get(null,function(data) {
		var blob = new Blob([JSON.stringify(data)],{ type: "application/json" });
		var url = URL.createObjectURL(blob);
		chrome.downloads.download({url:url,filename:"ext-monarch.json",saveAs:true});
	});
});

