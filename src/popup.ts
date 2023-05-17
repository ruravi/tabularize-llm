import { groupTabs } from "./group_tabs"
import '../styles/popup.scss';
import { clearAll } from "./storage";

const tabs = await chrome.tabs.query({
    url: "<all_urls>"
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname;

    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async () => {
        // need to focus window as well as the active tab
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
    });

    elements.add(element);
}
document.querySelector("ul").append(...elements);

// Remove tabs that already have a group.
const ungrouped_tabs = tabs.filter((tab) => tab.groupId == -1)

const groupButton = document.querySelector("#groupTabs");
groupButton.addEventListener("click", async () => {
    // TODO: Add a spinner when processing.
    await groupTabs(ungrouped_tabs);
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