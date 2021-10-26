chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var video = document.getElementsByTagName("video")[0];
    if (video) {
        if (request.message === "toggle_video_state") {
            if (video.paused) {
                video.play();
                sendResponse({ paused: false, tabId: request.tabId });
            } else {
                video.pause();
                sendResponse({ paused: true, tabId: request.tabId });
            }
        }
        if (request.message === "toggle_video_play") {
            video.play();
            sendResponse({ paused: false, tabId: request.tabId });
        }
        if (request.message === "toggle_video_pause") {
            video.pause();
            sendResponse({ paused: true, tabId: request.tabId });
        }
        if (request.message === "toggle_video_volume_up") {
            if (video.volume < 0.9) video.volume += 0.1;
            else video.volume = 1;
            sendResponse({ paused: true, tabId: request.tabId });
        }
        if (request.message === "toggle_video_volume_down") {
            if (video.volume > 0.1) video.volume -= 0.1;
            else video.volume = 0;
            sendResponse({ paused: true, tabId: request.tabId });
        }
        if (request.message === "toggle_video_skip") {
            video.currentTime += 10;
            sendResponse({ paused: true, tabId: request.tabId });
        }
        if (request.message === "toggle_video_replay") {
            video.currentTime = 0;
            sendResponse({ paused: true, tabId: request.tabId });
        }
    } else {
        sendResponse({ error: "No video object found" });
    }

    if (request.message === "toggle_playlist_next") {
        var nextButton = document.getElementsByClassName("ytp-next-button")[0];
        if (nextButton) {
            nextButton.click();
            sendResponse({ next: true, tabId: request.tabId });
        } else {
            sendResponse({ error: "Cannot play next video" });
        }
    }
});
