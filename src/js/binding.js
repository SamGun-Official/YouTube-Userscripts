let options = {
	dataFeature01: {
		domElementId: "#no_ads_feature",
		enableState: false,
	},
	dataFeature02: {
		domElementId: "#no_shorts_feature",
		enableState: false,
	},
	dataFeature03: {
		domElementId: "#no_stream_chat_feature",
		enableState: false,
	},
};
let intervalFeature01;
let intervalFeature02;
let intervalFeature03;

function getFeatureState() {
	chrome.storage.local.get(["options"]).then((result) => {
		if (result.options != null) {
			options = result.options;
			for (const [key, value] of Object.entries(options)) {
				$(value.domElementId).prop("checked", value.enableState);
				console.log(`[GET] ${key}: ${value}`);
			}
		}
	});
}

function setFeatureState() {
	chrome.storage.local.set({ options: options }).then(() => {
		for (const [key, value] of Object.entries(options)) {
			console.log(`[SET] ${key}: ${value}`);
		}
	});
}

function changeFeatureAction(dataFeature) {
	if (dataFeature === "dataFeature01") {
		if (options.dataFeature01.enableState) {
			// removeAds();
		} else {
			// allowAds();
		}
	} else if (dataFeature === "dataFeature02") {
		if (options.dataFeature02.enableState) {
			chrome.runtime.sendMessage({ action: "DISABLE_SHORTS" });
			// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			// 	chrome.tabs.sendMessage(tabs[0].id, { action: "DISABLE_SHORTS" });
			// });
		} else {
			chrome.runtime.sendMessage({ action: "ENABLE_SHORTS" });
			// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			// 	chrome.tabs.sendMessage(tabs[0].id, { action: "ENABLE_SHORTS" });
			// });
		}
	} else if (dataFeature === "dataFeature03") {
		if (options.dataFeature03.enableState) {
			//
		} else {
			//
		}
	}
}

function addChangeListeners() {
	for (const [key, value] of Object.entries(options)) {
		$(value.domElementId).change(function (e) {
			e.preventDefault();
			options[key].enableState = $(this).prop("checked");
			setFeatureState();
			changeFeatureAction(key);
		});
	}
}

$(document).ready(function () {
	getFeatureState();
	addChangeListeners();
});
