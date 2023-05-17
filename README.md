## Inspiration
The sheer versatility of large language models got me excited about harnessing their power to improve the way I browse the internet. One feature I particularly love in Chrome is the ability to create tab groupings. It's such a handy way to cluster related tabs together and assign them a customized name. However, I noticed it hasn't caught on as much as I thought it would. The main reason seems to be that it requires users to manually create and manage these groupings over time, which can be a bit of a chore. So, I thought, why not simplify this process and make it more user-friendly?

## What it does

Say hello to TabularizeLLM, a friendly little Chrome extension that you can add to your browser! Once installed, all it takes is a click on the "Group Tabs" button, and voila! It peers into all your open tabs, considering their titles and URLs, and then cooks up a neat set of categories. The magic behind the scene is a large language model (LLM) which performs this categorization.

Once these categories are in place, every new tab you open is like a guest at a party. Our extension, working quietly in the background, greets each one, determines which category it fits into best, and shows it to its place. If a tab is a bit unique and doesn't quite fit in with the existing categories, no worries! TabularizeLLM simply rolls out the red carpet and creates a new category just for it.

## How I built it

The most fascinating aspect of this project is the AI wizardry that suggests categories for browser tabs. I began by using just the title and URL as input data. Surprisingly, this alone provided pretty impressive results in my experiments. I utilized a JavaScript AI library called langchain to create prompts, issue API calls to an LLM provider, and parse the LLM's output.

## Challenges I ran into

Aside from the regular challenges of developing a Chrome Extension, working on this project introduced a new kind of challenge: prompt engineering and parsing the output of an LLM for use in downstream code.

**Prompt Engineering** - One of the API calls I make categorizes a new tab when there are already existing tab groups in the browser. I had to ask the model to assign it to an existing category or suggest a new one. My first prompt consistently assigned the new tab to an existing group. I had to adjust my prompt to give the model more confidence to suggest a new category if the existing ones didn't make sense.

**Parsing LLM output** - Generative models are inherently non-deterministic, making traditional computer programming approaches challenging. You can't rely on the model response adhering to strict schemas, nor can you perform error checking or validation as you normally would. While you can try to give the model very specific instructions, it's not foolproof. Your downstream parsing logic needs to be flexible.

## Installation Guide

NOTE: You will need your own OPEN AI key.
Create a file in the root folder called `.env` and these lines

```
OPENAI_API_KEY=<your-key>
OPENAI_ORGANIZATION=<your-org-optional>
```

Install dependencies

```
npm install # To install all dependencies. This will create a node_modules directory
```

Debug Build
```
npm run start # Runs webpack and generates a dist folder
```
Production build
```
npm run build
```
Run tests
```
npx jest
```

### Running the Chrome Extension

In your Chrome browser, navigate to `chrome://extensions/`. Click on **Load unpacked** which should open up your file finder. Select the **dist** folder that would have been geenrated when you ran `npm run start`.
