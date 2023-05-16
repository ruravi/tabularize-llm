import { array, object, number, string, ZodTypeAny } from 'zod';
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
const jsonStringify = require("json-stringify");

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const output_parser = StructuredOutputParser.fromZodSchema(
    array(
        object({
            id: number().describe("id of this entry. This is the same as in the input array"),
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

export async function get_prompt(input: object) {
    const input_json = jsonStringify(input)
    return await prompt.format({
        question: input_json,
    });
}

export async function parse_output(output: string) {
    // TODO: add error handling
    return await output_parser.parse(output);
}