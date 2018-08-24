chrome.pageAction.onClicked.addListener(tab => {
    chrome.tabs.executeScript(tab.ib, {
        file: 'inject.js'
    });
});
