import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { output_schema, mapCategoryToIds } from "./output_schema";
import { z } from "zod";
const jsonStringify = require("json-stringify");

const output_parser = StructuredOutputParser.fromZodSchema(
    output_schema);

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

export async function parse_output_and_map(output: string) {
    // TODO: add error handling
    const parsed_output = await output_parser.parse(output);
    return mapCategoryToIds(parsed_output);
}

export async function parse_output(output: string): Promise<z.infer<typeof output_schema>> {
    // TODO: add error handling
    return await output_parser.parse(output);
}

const recategorize_prompt = new PromptTemplate({
    template:
    "I will provide a website url with its title. Your task is to assign the website to a category. You can suggest a new category or chose from a list that I will provide.\n{format_instructions}\n Here is the input data:\n{input}\nHere are the categories:{existing_categories}",
    inputVariables: ["existing_categories", "input"],
    partialVariables: { format_instructions: formatInstructions },
});

export async function get_recategorize_prompt(input: object, existingCategories: string[]) {
    const input_json = jsonStringify(input)
    const existing_categories_json = jsonStringify(existingCategories)
    return await recategorize_prompt.format({
        input: input_json,
        existing_categories: existing_categories_json,
    });
}