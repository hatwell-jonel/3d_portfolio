'use server';

import { systemPrompt } from "@/lib/data";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY!,
});


export async function Chat(usersInput: string) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: usersInput,
            config: {
            systemInstruction: systemPrompt,
            },
        });

        return {
            content :response?.text
        };
    } catch (error) {
        console.error("ERROR:", error);
        throw new Error(`Chat failed: ${error}`);
    }
}
