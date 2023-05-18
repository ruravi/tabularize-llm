import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { get_prompt, parse_output, get_recategorize_prompt, parse_output_and_map } from "./prompt";
import { output_schema } from "./output_schema";
import { z } from "zod";

// Instantiate the large language model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    openAIOrganization: process.env.OPENAI_ORGANIZATION,
    temperature: 0.4
});

export async function get_model_response(input: object) {
    const prompt = await get_prompt(input)
    const response = await model.call([
        new HumanChatMessage(prompt)
    ])
    console.log('Received response')
    return await parse_output_and_map(response.text)
}

export async function get_model_response_for_recategorize(input: object, existingCategories: string[]): Promise<z.infer<typeof output_schema>> {
    const prompt = await get_recategorize_prompt(input, existingCategories)
    const response = await model.call([
        new HumanChatMessage(prompt)
    ])
    console.log(`Received response for recategorization: ${response.text}`)
    return await parse_output(response.text)
}
