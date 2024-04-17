console.log("START BACKGROUND");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Content Action: ", request.action);
	if (request.action === "DISABLE_SHORTS") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "DISABLE_SHORTS" });
		});
	} else if (request.action === "ENABLE_SHORTS") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "ENABLE_SHORTS" });
		});
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// if (changeInfo.status === "complete") {
	chrome.storage.local.get(["options"]).then((result) => {
		if (result.options != null) {
			if (result.options.dataFeature01.enableState) {
			} else {
			}
			if (result.options.dataFeature02.enableState) {
				console.log(result.options.dataFeature02.enableState);
				chrome.runtime.sendMessage({ action: "DISABLE_SHORTS" });
				// chrome.tabs.sendMessage(tabId, {
				//     action: "DISABLE_SHORTS",
				// });
			} else {
				console.log(result.options.dataFeature02.enableState);
                chrome.runtime.sendMessage({ action: "ENABLE_SHORTS" });
				// chrome.tabs.sendMessage(tabId, {
				// 	action: "ENABLE_SHORTS",
				// });
			}
			if (result.options.dataFeature03.enableState) {
			} else {
			}
		}
	});
	// }
});
