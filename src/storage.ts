// Save the groupings to the db chrome.storage
export function saveGrouping(category: string, groupId: number) {
    // Save the groupings to chrome.storage.
    // Create a key for each category
    const key = `category_${category}`
    chrome.storage.local.set({ [key]: groupId }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log(`Data saved successfully for ${key}!`);
        }
    });
}

export function markGroupingsDone() {
    chrome.storage.local.set({ ["groupings_done"]: true }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Data saved successfully!');
        }
    });
}

export async function queryCategories() {
    const keys = await getKeys()
    const categories = keys.filter((key) => key.startsWith("category_"))
    // Strip the category_ prefix
    for (let i = 0; i < categories.length; i++) {
        categories[i] = categories[i].substring(9)
    }
    return categories
}

export async function queryCategory(category: string): Promise<number> {
    const key = `category_${category}`
    return new Promise<number>((resolve, reject) => {
        chrome.storage.local.get(key, (items) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(items[key]);
            }
        }
        );
    });
}

async function getKeys(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        chrome.storage.local.get(null, (items) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(Object.keys(items));
            }
        });
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