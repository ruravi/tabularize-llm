import { array, object, number, string } from 'zod';
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const output_parser = StructuredOutputParser.fromZodSchema(
    array(
        object({
            index: number().describe("index of this entry in the input array"),
            title: string().describe("title of the website"),
            url: string().describe("url of the website"),
            category: string().describe("category of the website"),
        })
    ));

const formatInstructions = output_parser.getFormatInstructions();

const prompt = new PromptTemplate({
    template:
        "I will provide a list of website titles and urls. Your task is to assign each of them a category. Provide a short and descriptive name for each category. Use no more than 7 categories.\n{format_instructions}\n Here is the input data:\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
});

export async function get_prompt(input_json: string) {
    const input = await prompt.format({
        question: input_json,
    });
    return input
}