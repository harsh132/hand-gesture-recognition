var socket = io.connect("http://localhost:8080");

// 'okay', 'peace', 'thumbs up', 'thumbs down', 'call me', 'stop', 'rock', 'live long', 'fist', 'smile'
var state = {
    stop: "toggle_video_pause",
    rock: "toggle_video_play",
    "thumbs up": "toggle_video_volume_up",
    "thumbs down": "toggle_video_volume_down",
    peace: "toggle_playlist_next",
    okay: "toggle_video_skip",
    fist: "toggle_video_replay",
};
socket.on("event1", function (data) {
    console.log(data.gesture);
    chrome.tabs.query({ url: "*://www.youtube.com/watch?v*" }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: state[data.gesture], tabId: tabs[0].id }, function (response) {
            console.log("done");
        });
    });
    chrome.runtime.sendMessage({ msg: "socket", text: data.text }, function (response) {});
});
