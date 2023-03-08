// the URL of bing chat
var newTabURL = "https://www.bing.com/search?q=Bing+AI&showconv=1";

// listen for new tab creation
chrome.tabs.onCreated.addListener(function (tab) {
    // check if the new tab is blank
    if (tab.url === "chrome://newtab/" || tab.url === "edge://newtab/") {
        // redirect the new tab to the URL
        chrome.tabs.update(tab.id, { url: newTabURL });
    }
});
