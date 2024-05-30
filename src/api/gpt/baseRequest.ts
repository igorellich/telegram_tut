import * as dotenv from 'dotenv';
import OpenAI from 'openai';



dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key in environment variables');
}

export async function getChatGPTResponse(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  let result: string = "";
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });
  for await (const chunk of stream) {
    result+=(chunk.choices[0]?.delta?.content || '');
  }
  return result;
}
