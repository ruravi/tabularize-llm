import { get_model_response } from "./language_model"


// Export a function to generate a tab grouping list.
async function generateGroupList(tabs: chrome.tabs.Tab[]) {
    // Create a json object with the tab and url.
    const tabInfo = tabs.map(({ title, url, id }) => {
        const pathname = new URL(url).toString();
        return {
            id: id,
            url: pathname,
            title: title,
        };
    });
    // response is a map of category -> an array of tab ids.
    return await get_model_response(tabInfo)
}

// Group the given tabs using LLMs
export async function groupTabs(tabs: chrome.tabs.Tab[]) {
    const categoryMap = await generateGroupList(tabs)
    // For each category, create a group.
    for (const [category, tabIds] of categoryMap) {
        // Create a group with the given tabs.
        const group = await chrome.tabs.group({
            tabIds: tabIds,
        });
        // Set the group title to the category name.
        await chrome.tabGroups.update(group, { title: category });
    }
}