const { parse_output } = require('../src/prompt'); // Import the function to be tested

describe('mapCategoryToIds', () => {
  test('should map objects to categories correctly', async () => {
    const sample_output = `[
            {
              "id": 112107549,
              "title": "[Rukmani] Creating SQLite Table with SQLAlchemy",
              "url": "https://chat.openai.com/c/8bf8fe29-c3df-47ef-a314-df815ceec9c2",
              "category": "Programming"
            },
            {
              "id": 112108100,
              "title": "Agents - Jupyter Notebook",
              "url": "http://localhost:8888/notebooks/Agents.ipynb",
              "category": "Programming"
            },
            {
              "id": 112107543,
              "title": "Character.AI - Stella",
              "url": "https://beta.character.ai/chat?char=EEI6sjnddRIJTVC59MODiYjL0-JyDIVI2IEGLkPx2Jk",
              "category": "AI Chatbot"
            },
            {
              "id": 112107765,
              "title": "ChatGPT - Poe",
              "url": "https://poe.com/ChatGPT",
              "category": "AI Chatbot"
            },
            {
              "id": 112107928,
              "title": "chrome-extensions-samples/sidepanel.js at main · GoogleChrome/chrome-extensions-samples · GitHub",
              "url": "https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/sample.sidepanel-dictionary/sidepanel.js",
              "category": "Chrome Extension Development"
            },
            {
              "id": 112107895,
              "title": "chrome.tabs - Chrome Developers",
              "url": "https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab",
              "category": "Chrome Extension Development"
            },
            {
              "id": 112107958,
              "title": "dotenv-webpack/README.md at master · mrsteele/dotenv-webpack · GitHub",
              "url": "https://github.com/mrsteele/dotenv-webpack/blob/master/README.md",
              "category": "Webpack"
            },
            {
              "id": 112107813,
              "title": "Extensions",
              "url": "chrome://extensions/?errors=ccbhcooicigeldeianpmmacplnadohnp",
              "category": "Chrome Extension Development"
            },
            {
              "id": 112107542,
              "title": "Feed | LinkedIn",
              "url": "https://www.linkedin.com/feed/",
              "category": "Social Network"
            },
            {
              "id": 112107541,
              "title": "Google Calendar - Week of May 14, 2023",
              "url": "https://calendar.google.com/calendar/u/0/r/week",
              "category": "Productivity"
            },
            {
              "id": 112108073,
              "title": "Google keynote",
              "url": "https://io.google/2023/program/396cd2d5-9fe1-4725-a3dc-c01bb2e2f38a/",
              "category": "Event"
            },
            {
              "id": 112108145,
              "title": "hackAIthon presented by Craft Ventures",
              "url": "https://www.hackaithon.ai/",
              "category": "Hackathon"
            },
            {
              "id": 112108096,
              "title": "Home Page - Select or create a notebook",
              "url": "http://localhost:8888/tree",
              "category": "Programming"
            },
            {
              "id": 112107540,
              "title": "Inbox - lakhi.r@gmail.com - Gmail",
              "url": "https://mail.google.com/mail/u/0/#inbox",
              "category": "Email"
            },
            {
              "id": 112107689,
              "title": "LLM Foundations - The Full Stack",
              "url": "https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/llm-foundations/",
              "category": "Education"
            },
            {
              "id": 112107739,
              "title": "Manage tabs - Chrome Developers",
              "url": "https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/",
              "category": "Chrome Extension Development"
            },
            {
              "id": 112107915,
              "title": "motdotla/dotenv: Loads environment variables from .env for nodejs projects.",
              "url": "https://github.com/motdotla/dotenv",
              "category": "Node.js"
            },
            {
              "id": 112107768,
              "title": "OpenPlayground",
              "url": "https://nat.dev/compare",
              "category": "Machine Learning"
            },
            {
              "id": 112107900,
              "title": "Output Parsers | 🦜️🔗 Langchain",
              "url": "https://js.langchain.com/docs/modules/prompts/output_parsers/#structured-output-parser-with-zod-schema",
              "category": "Programming"
            },
            {
              "id": 112108155,
              "title": "Output Parsers | 🦜️🔗 Langchain",
              "url": "https://js.langchain.com/docs/modules/prompts/output_parsers/#structured-output-parser-with-zod-schema",
              "category": "Programming"
            },
            {
              "id": 112108090,
              "title": "Roasted Red Pepper Pasta - Plant Based School",
              "url": "https://theplantbasedschool.com/red-pepper-pasta/#ingredients",
              "category": "Cooking"
            },
            {
              "id": 112107924,
              "title": "ruravi/tabularize-llm",
              "url": "https://github.com/ruravi/tabularize-llm",
              "category": "Programming"
            },
            {
              "id": 112108148,
              "title": "Schedule (1)",
              "url": "https://craft-ventures.notion.site/Schedule-1-55a4a0a924f940c1a54c4ea43096a685",
              "category": "Event"
            },
            {
              "id": 112107544,
              "title": "Search results - Google Drive",
              "url": "https://drive.google.com/drive/search?q=resume",
              "category": "Cloud Storage"
            },
            {
              "id": 112107931,
              "title": "sszczep/chrome-extension-webpack: Get started with Chrome extensions development using webpack, TypeScript, Sass, and more.",
              "url": "https://github.com/sszczep/chrome-extension-webpack",
              "category": "Chrome Extension Development"
            },
            {
              "id": 112108065,
              "title": "Usage - OpenAI API",
              "url": "https://platform.openai.com/account/usage",
              "category": "AI Platform"
            }
          ]`

    const result = await parse_output(sample_output)

    expect(result.length).toBe(26)
  });
});
