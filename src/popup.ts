import { groupTabs } from "./group_tabs"

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
const ungrouped_tabs = tabs.filter((tab) => tab.groupId !== -1)

const button = document.querySelector("button");
button.addEventListener("click", async () => {
    // TODO: Add a spinner when processing.
    await groupTabs(ungrouped_tabs);
});