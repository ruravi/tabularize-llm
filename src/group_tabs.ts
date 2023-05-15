// import { ChatOpenAI } from "langchain/llms/openai";

// const { ChatOpenAI } = require("langchain/llms/openai");

// const model = new ChatOpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     openAIOrganization: process.env.OPENAI_ORGANIZATION,
//     temperature: 0.4
// });

// Export a function to generate a tab grouping list.
export async function generateGroupList() {
    return ["Test1", "Test2", "Test3", process.env.OPENAI_API_KEY, process.env.OPENAI_ORGANIZATION]
}