// Install the service worker
self.addEventListener('install', event => {
  console.log('Service worker installed:', event);
});

// Activate the service worker
self.addEventListener('activate', event => {
  console.log('Service worker activated:', event);
  chrome.storage.local.get(null, (items) => {
    console.log(JSON.stringify(items));
  });

  chrome.storage.local.get("groupings_done", (value) => {
    if (value) {
      chrome.tabs.onUpdated.addListener(tabUpdatedListener);
    }
  })
});

function recategorize() {
  console.log('Recategorizing')
}

const tabUpdatedListener = function (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void {
  // If the tab is updated and the url is changed then execute the code
  if (changeInfo.url) {
    // Do your stuff here
    console.log(changeInfo.url);
    // We need to re-categorize the page
    if (changeInfo.url !== "chrome://newtab/") {
      recategorize();
    }
  }
};

chrome.storage.onChanged.addListener((changes) => {
  console.log('Listener triggered')
  if (changes['groupings_done']) {
    // If value is true, add an event listener for the tab update
    console.log('groupings_done changed')

    if (changes['groupings_done'].newValue) {
      chrome.tabs.onUpdated.addListener(tabUpdatedListener);
    }
    // If value is false remove the event listener
    else {
      chrome.tabs.onUpdated.removeListener(tabUpdatedListener);
    }
  }
});
