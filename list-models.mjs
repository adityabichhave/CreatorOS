import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyBzu-_73imS3HMimVpjEjjYDe051XdbHxk'; 

async function run() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log(data.models.map(m => m.name));
  } catch (e) {
    console.error(e);
  }
}

run();
