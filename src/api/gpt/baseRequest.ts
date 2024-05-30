import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

interface GPTRequest {
  prompt: string;
  max_tokens: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
}

interface GPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }>;
}

export async function getChatGPTResponse(prompt: string): Promise<string> {
  const requestBody: GPTRequest = {
    prompt: prompt,
    max_tokens: 150,
  };

  try {
    const response = await axios.post<GPTResponse>(apiEndpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const responseData = response.data;
    return responseData.choices[0].text.trim();
  } catch (error) {
    console.error('Error communicating with the OpenAI API:', error);
    throw new Error('Failed to get response from ChatGPT API');
  }
}
