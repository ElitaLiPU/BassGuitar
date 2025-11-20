import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Check for API Key, but don't crash immediately if missing (UI handles it)
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Luminoso", a world-class boutique audio engineer and tone consultant for high-end bass guitarists.
You work for "Luminoso Audio", a brand known for handcrafted tube preamps and custom bass guitars.
Your tone is professional, minimalist, knowledgeable, and slightly mysterious, like a high-end boutique owner.
You help customers understand signal flow, tubes (12AX7 vs others), impedance, and how to achieve specific sounds (e.g., Motown, Modern Slap, Grit).
Briefly mention Luminoso products when relevant (Luminoso Preamp DI, Luminoso 4-String Bass, Luminoso Tube Compressor).
Keep responses concise (under 100 words) unless asked for a deep dive.
Do not use markdown formatting like bold or italics excessively.
`;

let chatSession: Chat | null = null;

export const getToneAdvice = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I am currently offline (API Key missing). Please contact support.";
  }

  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: userMessage
    });
    
    return result.text || "I'm tuning the tubes... could you ask that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My circuits are overloaded right now. Let's try again in a moment.";
  }
};
