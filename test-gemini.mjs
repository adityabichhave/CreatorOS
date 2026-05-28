import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;// the key from .env.local
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello world');
    console.log(result.response.text());
  } catch (error) {
    console.error("Error with gemini-1.5-flash:", error);
    try {
      const model2 = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result2 = await model2.generateContent('Say hello world');
      console.log("Success with gemini-pro:", result2.response.text());
    } catch (e2) {
      console.error("Error with gemini-pro:", e2);
    }
  }
}

run();
