import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { get_prompt, parse_output } from "./prompt";

// Instantiate the large language model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    openAIOrganization: process.env.OPENAI_ORGANIZATION,
    temperature: 0.4
});

const sample_output = `[{"index":0,"url":"https://chat.openai.com/c/8bf8fe29-c3df-47ef-a314-df815ceec9c2","category":"Chat","title":"[Rukmani] Creating SQLite Table with SQLAlchemy"},{"index":1,"url":"https://beta.character.ai/chat?char=EEI6sjnddRIJTVC59MODiYjL0-JyDIVI2IEGLkPx2Jk","category":"Chat","title":"Character.AI - Stella"},{"index":2,"url":"https://poe.com/ChatGPT","category":"Chat","title":"ChatGPT - Poe"},{"index":3,"url":"https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/sample.sidepanel-dictionary/sidepanel.js","category":"Chrome Extensions","title":"chrome-extensions-samples/sidepanel.js at main · GoogleChrome/chrome-extensions-samples · GitHub"},{"index":4,"url":"https://developer.chrome.com/docs/extensions/reference/tabs/","category":"Chrome Extensions","title":"chrome.tabs - Chrome Developers"},{"index":5,"url":"https://github.com/mrsteele/dotenv-webpack/blob/master/README.md","category":"Development","title":"dotenv-webpack/README.md at master · mrsteele/dotenv-webpack · GitHub"},{"index":6,"url":"chrome://extensions/","category":"Chrome Extensions","title":"Extensions"},{"index":7,"url":"https://www.linkedin.com/feed/","category":"Social Media","title":"Feed | LinkedIn"},{"index":8,"url":"https://js.langchain.com/docs/modules/models/chat/","category":"Development","title":"Getting Started: Chat Models | 🦜️🔗 Langchain"},{"index":9,"url":"https://calendar.google.com/calendar/u/0/r/week","category":"Productivity","title":"Google Calendar - Week of May 14, 2023"},{"index":10,"url":"https://io.google/2023/program/396cd2d5-9fe1-4725-a3dc-c01bb2e2f38a/","category":"Events","title":"Google keynote"},{"index":11,"url":"https://mail.google.com/mail/u/0/#inbox","category":"Email","title":"Inbox - lakhi.r@gmail.com - Gmail"},{"index":12,"url":"https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/llm-foundations/","category":"Education","title":"LLM Foundations - The Full Stack"},{"index":13,"url":"https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/","category":"Chrome Extensions","title":"Manage tabs - Chrome Developers"},{"index":14,"url":"https://github.com/motdotla/dotenv","category":"Development","title":"motdotla/dotenv: Loads environment variables from .env for nodejs projects."},{"index":15,"url":"https://nat.dev/compare","category":"Development","title":"OpenPlayground"},{"index":16,"url":"https://github.com/ruravi/tabularize-llm","category":"Development","title":"ruravi/tabularize-llm"},{"index":17,"url":"https://drive.google.com/drive/search?q=resume","category":"Productivity","title":"Search results - Google Drive"},{"index":18,"url":"https://github.com/sszczep/chrome-extension-webpack","category":"Chrome Extensions","title":"sszczep/chrome-extension-webpack: Get started with Chrome extensions development using webpack, TypeScript, Sass, and more."},{"index":19,"url":"https://platform.openai.com/account/usage","category":"Development","title":"Usage - OpenAI API"}]
`

export async function get_model_response(input: object) {
    const prompt = await get_prompt(input)
    const response = await model.call([
        new HumanChatMessage(prompt)
    ])
    return await parse_output(response.text)
}