console.log("START CONTENT SCRIPTING");

let refreshInterval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Content Action: ", request.action);
	if (request.action === "DISABLE_SHORTS") {
		disableShorts();
	} else if (request.action === "ENABLE_SHORTS") {
		enableShorts();
	}
});

function disableShorts() {
	refreshInterval = setInterval(() => {
		const regexPattern = /^.*\/shorts\/([a-zA-Z0-9_-]+).*$/;
		const shortsURL = window.location.href;
		const matchResult = shortsURL.match(regexPattern);
		console.log("MATCH");
		if (matchResult) {
			const videoID = matchResult[1];
			const watchURL = `https://www.youtube.com/watch?v=${videoID}`;
			window.history.back();
			window.location.href = watchURL;
			clearInterval(refreshInterval);
		}
	}, 100);
}

function enableShorts() {
	clearInterval(refreshInterval);
}
