import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";
import { PORTFOLIO_CONTEXT } from "../constants";

class GeminiService {
    private ai: GoogleGenAI;
    private chat: Chat | null = null;
    
    constructor() {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
            console.error("VITE_API_KEY environment variable not set. Please create a .env.local file and add your key.");
        }
        this.ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });
    }
    
    private getSystemInstruction(): string {
        return `You are a polite, professional, and helpful AI assistant for Mitra Datta Ganapaneni. Your goal is to answer questions from recruiters and hiring managers based *only* on the portfolio information provided below. Do not invent or infer any information. If a question cannot be answered from the context, politely state that you don't have that information. Keep your answers concise and relevant.

        Here is Mitra's portfolio information:
        ---
        ${PORTFOLIO_CONTEXT}
        ---
        Start the conversation by introducing yourself and offering to answer questions about Mitra's portfolio.`;
    }
    
    public async initializeChat(): Promise<ChatMessage | null> {
        try {
            this.chat = this.ai.chats.create({
                model: 'gemini-2.5-flash-preview-04-17',
                config: {
                    systemInstruction: this.getSystemInstruction(),
                },
            });
            
            // Send an empty message to get the initial greeting from the AI
            const response = await this.chat.sendMessage({ message: "" });
            return { role: 'model', text: response.text };

        } catch (error) {
            console.error("Failed to initialize Gemini chat:", error);
            return { role: 'model', text: "Sorry, the AI assistant is currently unavailable. Please check the API key and configuration." };
        }
    }
    
    public async * sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
        if (!this.chat) {
            yield "Chat not initialized. Please refresh.";
            return;
        }

        try {
            const result = await this.chat.sendMessageStream({ message });
            for await (const chunk of result) {
                yield chunk.text;
            }
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            yield "An error occurred while getting a response.";
        }
    }
}

export const geminiService = new GeminiService();
