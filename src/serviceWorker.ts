import { queryCategories, queryCategory, saveGrouping } from "./storage";
import { get_model_response_for_recategorize } from "./language_model";
import { categorize_tabs_new, categorize_existing } from "./group_tabs";

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

async function recategorize(tab: chrome.tabs.Tab) {
  console.log(`Recategorizing: ${tab.url}`)
  // Read from local storage all the category keys.
  const existingCategories = await queryCategories()
  // Ask the model for the category for this new web page
  const response = await get_model_response_for_recategorize({ id: tab.id, url: tab.url, title: tab.title }, existingCategories)
  // Update the local storage with the new category if there is a new one.
  console.log(`Parsed response: ${JSON.stringify(response)}`)
  
  if (!existingCategories.includes(response[0].category)) {
    console.log('New category')

    // Set the category for the tab
    const newGroupId = await categorize_tabs_new([tab.id], response[0].category)
    saveGrouping(response[0].category, newGroupId)

  } else {
    console.log('Existing category')
    // Add this tab id to the existing category value
    const existingGroupId = await queryCategory(response[0].category)
    await categorize_existing(tab.id, existingGroupId)
  }
}

const tabUpdatedListener = async function (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void {
  // If the tab is updated and the url is changed then execute the code
  if (changeInfo.url) {
    // Do your stuff here
    console.log(changeInfo.url);
    // We need to re-categorize the page
    if (changeInfo.url !== "chrome://newtab/") {
      await recategorize(tab);
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
