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
		var blob = new Blob([JSON.stringify({id:"extension-monarch",data:data})],{ type: "application/json" });
		var url = URL.createObjectURL(blob);
		chrome.downloads.download({url:url,filename:"ext-monarch.json",saveAs:true});
	});
});

document.querySelector("#opt_import").addEventListener("click",function() {
	var fc = document.createElement("input");
	fc.type = "file";
	fc.accept = "json";
	fc.addEventListener("change",function() {
		fd = new FileReader();
		fd.addEventListener("loadend", function(ev) {
			js = JSON.parse(ev.target.result);
			if (js.id && js.id == "extension-monarch") {
				chrome.storage.local.clear(function() {
					chrome.storage.local.set(js.data,function() {
						chrome.runtime.reload();
					});
				});
			}
		});
		fd.readAsText(this.files[0]);
	});
	fc.click();
});
