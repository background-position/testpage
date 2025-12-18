
import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the client using process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (healthContext: string): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a highly intelligent and empathetic health assistant named "SK AI". 
      Your goal is to provide personalized health, diet, and exercise advice based on the user's data.
      
      User Context:
      ${healthContext}
      
      Tone: Professional, encouraging, and concise. 
      Output: Use markdown for formatting. 
      
      If the user asks about medical diagnoses, always include a disclaimer that you are an AI and they should consult a doctor for serious concerns.`,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  return await chat.sendMessageStream({ message });
};
