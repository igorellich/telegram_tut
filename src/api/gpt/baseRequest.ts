import * as dotenv from 'dotenv';
import OpenAI from 'openai';



dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

export async function getChatGPTResponse(prompt: string): Promise<string> {
  const openai = new OpenAI({
    //apiKey: process.env['OPENAI_API_KEY_DISCORD'], // This is the default and can be omitted
    apiKey:process.env['OPENAI_API_KEY'],
    //baseURL:"https:api.pawan.krd/v1"
  });

  let result: string = "";
  const stream = await openai.chat.completions.create({
    //model: "pai-001",
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
  for await (const chunk of stream) {
    result+=(chunk.choices[0]?.delta?.content || '');
  }
  return result;
}
