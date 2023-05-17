export function markGroupingsDone() {
    chrome.storage.local.set({ ["groupings_done"]: true }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Data saved successfully!');
        }
    });
}

export async function clearAll() {
    chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Data cleared successfully!');
        }
    });
}