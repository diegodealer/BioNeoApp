import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDlArIJ29r6EWSTSx2aJCSsPj2y70dzN7E';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function sendMessageToGemini(prompt: string): Promise<string> {
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    });

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return result || 'No hubo respuesta del modelo';
  } catch (error: any) {
    console.error('Error al conectar con Gemini:', error?.response?.data || error?.message);
    return 'Error en la conexión con Gemini';
  }
}
