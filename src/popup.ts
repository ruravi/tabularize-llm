import { groupTabsEndToEnd } from "./group_tabs"
import '../styles/popup.scss';
import { clearAll } from "./storage";

const groupButton = document.querySelector("#groupTabs");
groupButton.addEventListener("click", async () => {
    // Show a spinner when processing.
    document.getElementById("loading").style.display = "block";

    const tabs = await chrome.tabs.query({
        url: "<all_urls>"
    });
    
    // Remove tabs that already have a group.
    const ungrouped_tabs = tabs.filter((tab) => tab.groupId == -1)
    if (ungrouped_tabs.length > 0) {
        await groupTabsEndToEnd(ungrouped_tabs);
    }
    
    // Hide the spinner
    document.getElementById("loading").style.display = "none";
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