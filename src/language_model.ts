import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { get_prompt, parse_output } from "./prompt";

// Instantiate the large language model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    openAIOrganization: process.env.OPENAI_ORGANIZATION,
    temperature: 0.4
});

export async function get_model_response(input: object) {
    const prompt = await get_prompt(input)
    console.log(prompt)
    const response = await model.call([
        new HumanChatMessage(prompt)
    ])
    console.log('Received response')
    return await parse_output(response.text)
}