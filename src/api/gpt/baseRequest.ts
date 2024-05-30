import axios from 'axios';
import * as dotenv from 'dotenv';


const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';



export async function getChatGPTResponse(prompt: string): Promise<string> {
  const newConfig = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY
  });
  const openai = new OpenAIApi(newConfig);

  const messageList = [{ role: "user", content: prompt }];
  let result: string = "";
  try {
    const GPTOutput = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messageList,
    });

    result = GPTOutput.data.choices[0].message.content;



  } catch (err: any) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
  return result;
}
