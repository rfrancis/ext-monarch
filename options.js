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
