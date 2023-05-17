import { get_model_response } from "./language_model"
import { markGroupingsDone } from "./storage"


// A helper function to generate a tab grouping list.
async function generateGroupList(tabs: chrome.tabs.Tab[]): Promise<Map<string, number[]>> {
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
export async function groupTabsEndToEnd(tabs: chrome.tabs.Tab[]) {
    const categoryMap = await generateGroupList(tabs)
    // For each category, create a group and add the tabs to it.
    for (const [category, tabIds] of categoryMap.entries()) {
        const groupId = await categorize_tabs_new(tabIds, category)
    }
    // Finally, add a special key to make that the initial groupings are complete.
    markGroupingsDone()
}

export async function categorize_tabs_new(tabIds:number[], category:string): Promise<number> {
    // Create a group with the given tabs.
    const groupId = await chrome.tabs.group({
        tabIds: tabIds,
    });
    // Set the group title to the category name.
    await chrome.tabGroups.update(groupId, { title: category });
    return groupId
}

export async function categorize_existing(tabId: number, groupId: number) {
    // Add the tab to the group.
    await chrome.tabs.group({
        tabIds: tabId,
        groupId: groupId,
    });
}

export async function getAllTabGroups(): Promise<Map<string, number>> {
    const groups = await chrome.tabGroups.query({})
    // Convert the groups to a map of title to group id.
    const groupMap = new Map<string, number>()
    groups.forEach((group: chrome.tabGroups.TabGroup) => {
        groupMap.set(group.title, group.id)
    })
    return groupMap
}
