import { get_model_response } from "./language_model"

// Export a function to generate a tab grouping list.
export async function generateGroupList(tabs: chrome.tabs.Tab[]) {
    // Create a json object with the tab and url.
    const tabInfo = tabs.map(({ title, url }, index) => {
        const pathname = new URL(url).toString();
        return {
            index: index,
            url: pathname,
            title: title,
        };
    });
    return await get_model_response(tabInfo)
}