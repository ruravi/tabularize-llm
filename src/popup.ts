import { groupTabsEndToEnd } from "./group_tabs"
import '../styles/popup.scss';
import { clearAll } from "./storage";

const tabs = await chrome.tabs.query({
    url: "<all_urls>"
});

// Remove tabs that already have a group.
const ungrouped_tabs = tabs.filter((tab) => tab.groupId == -1)

const groupButton = document.querySelector("#groupTabs");
groupButton.addEventListener("click", async () => {
    // TODO: Add a spinner when processing.
    await groupTabsEndToEnd(ungrouped_tabs);
});

const debugCheckbox = document.getElementById("debugCheckbox");
debugCheckbox.addEventListener("change", async (event) => {
    document.getElementById('debugMessage').style.display = event.target.checked ? 'block' : 'none';
    // Read contents of chrome storage.
    chrome.storage.local.get(null, (items) => {
        document.getElementById("debugMessage").textContent = JSON.stringify(items);
    });
});

document.getElementById("clearStorage").addEventListener("click", async () => {
    clearAll();
    document.getElementById("debugMessage").textContent = "Storage cleared";
});