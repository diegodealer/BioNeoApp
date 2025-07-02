import axios from 'axios';

const GEMINI_API_KEY = 'TU_API_KEY_AQUI';

export async function askGemini(message: string) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;
  const body = {
    contents: [{ parts: [{ text: message }] }]
  };

  const response = await axios.post(url, body, {
    headers: { 'Content-Type': 'application/json' }
  });

  // El texto de la respuesta está en response.data.candidates[0].content.parts[0].text
  return response.data.candidates[0].content.parts[0].text;
}