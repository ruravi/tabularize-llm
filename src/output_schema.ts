import { array, object, number, string, z } from 'zod';

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
export const output_schema = array(
    object({
        id: number().describe("id of this entry. This is the same as in the input array"),
        title: string().describe("title of the website"),
        url: string().describe("url of the website"),
        category: string().describe("category of the website"),
    })
)

export function mapCategoryToIds(tabsWithCategories: z.infer<typeof output_schema>) {
    const categoryMap = new Map();

    tabsWithCategories.forEach((obj) => {
        const { id, category } = obj;

        if (categoryMap.has(category)) {
            categoryMap.get(category).push(id);
        } else {
            categoryMap.set(category, [id]);
        }
    });

    return categoryMap;
}