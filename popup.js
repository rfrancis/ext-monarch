var app = document.querySelector("#app");
var enable = {};
var disable = {};
var enableBox = {};
var disableBox = {};

chrome.management.getAll(function(arr) {
	loadRules(function(en,dis) {
		if (en)
			enable = en;
		if (dis)
			disable = dis;
		Object.keys(enable).forEach(function(k) {
			if (enableBox[k])
				enableBox[k].checked = true;
		});
		Object.keys(disable).forEach(function(k) {
			if (disableBox[k])
				disableBox[k].checked = true;
		});
	});
	var saveButton = document.createElement("button");
	saveButton.innerHTML = "Save";
	saveButton.addEventListener('click',function(ev) {
		chrome.storage.local.set({'enable':enable,'disable':disable},
			function() {
				saveButton.disabled = true;
				execButton.disabled = false;
			});
	});
	saveButton.style.fontSize = "larger";
	saveButton.disabled = true;
	app.appendChild(saveButton);
	var execButton = document.createElement("button");
	execButton.innerHTML = "Execute";
	execButton.addEventListener('click',function() {
		executeRules(enable,disable);
		doNotify("Updating enabled extensions!");
		location.reload();
	});
	execButton.style.fontSize = "larger";
	execButton.style.marginLeft = "1rem";
	app.appendChild(execButton);
	var tab = document.createElement("table");
	tab.innerHTML = '<tr><th>Name</th><th>Y</th><th>N</th></tr>';
	arr.sort(function(a,b) {
		return a.name.localeCompare(b.name);
	}).forEach(function(ext) {
		var r = document.createElement("tr");
		var d = document.createElement("td");
		d.innerHTML = ext.name;
		d.style["white-space"] = "nowrap";
		if (!ext.enabled) {
			d.style.color = '#CCCCCC';
		}
		r.appendChild(d);
		d = document.createElement("td");
		d.innerHTML = '<input type="checkbox"' + (enable[ext.id] ? " checked" : "") + '>';
		d.addEventListener('click',function(ev) {
			if (ev.target.checked)
				enable[ext.id] = true;
			else
				delete enable[ext.id];
			if (ev.target.checked) {
				delete disable[ext.id];
				ev.target.parentNode.nextSibling.firstChild.checked = false;
			}
			saveButton.disabled = false;
			execButton.disabled = true;
		});
		r.appendChild(d);
		enableBox[ext.id] = d.firstChild;
		d = document.createElement("td");
		d.innerHTML = '<input type="checkbox"' + (disable[ext.id] ? " checked" : "") + '>';
		d.addEventListener('click',function(ev) {
			if (ev.target.checked)
				disable[ext.id] = true;
			else
				delete disable[ext.id];
			if (ev.target.checked) {
				delete enable[ext.id];
				ev.target.parentNode.previousSibling.firstChild.checked = false;
			}
			saveButton.disabled = false;
			execButton.disabled = true;
		});
		r.appendChild(d);
		disableBox[ext.id] = d.firstChild;
		tab.appendChild(r);
	});
	app.appendChild(tab);
});
