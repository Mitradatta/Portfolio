import { ChatMessage } from "../types";
import { PORTFOLIO_CONTEXT } from "../constants";

interface ClaudeMessage {
    role: 'user' | 'assistant';
    content: string;
}

class ClaudeService {
    private apiKey: string;
    private conversationHistory: ClaudeMessage[] = [];
    private systemPrompt: string;

    constructor() {
        this.apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

        this.systemPrompt = `You are a friendly, enthusiastic, and knowledgeable AI assistant representing Mitra Datta Ganapaneni's portfolio. You help recruiters, hiring managers, and visitors learn about Mitra's skills, experience, and projects.

Your personality:
- Warm and professional, but not stiff
- Enthusiastic about AI/ML topics
- Helpful and proactive in sharing relevant information
- Concise but thorough

Guidelines:
- Answer questions based ONLY on the portfolio information provided below
- If you don't have specific information, say so politely and suggest what you CAN tell them about
- Highlight Mitra's strengths when relevant
- Keep responses conversational and engaging (2-3 sentences for simple questions, more for complex ones)
- Use bullet points for listing multiple items
- Feel free to ask follow-up questions to better help visitors

Here is Mitra's portfolio information:
---
${PORTFOLIO_CONTEXT}
---

Start by giving a warm, brief greeting and mentioning 2-3 things visitors can ask about.`;
    }

    public async initializeChat(): Promise<ChatMessage> {
        // Reset conversation history
        this.conversationHistory = [];

        // Return a pre-written greeting (faster UX, no API call needed)
        const greeting = `Hi there! 👋 I'm Mitra's AI assistant.

I can tell you about:
• **Experience** - AI Intern at Apple, Software Engineer at CompScale, AI Fellow at Handshake
• **Projects** - LLM unlearning, AI summarization, Telugu character recognition, and more
• **Skills** - LLM systems, distributed inference, full-stack, PyTorch, vLLM, RAG

What would you like to know?`;

        return { role: 'model', text: greeting };
    }

    public async *sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        try {
            // Try to call the real Claude API
            const response = await this.callClaudeAPI(message);

            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });

            // Simulate streaming for better UX
            const words = response.split(' ');
            let accumulated = '';

            for (let i = 0; i < words.length; i++) {
                accumulated += (i === 0 ? '' : ' ') + words[i];
                yield accumulated;
                // Small delay for streaming effect
                await new Promise(resolve => setTimeout(resolve, 15));
            }
        } catch (error) {
            console.error("Error calling Claude API:", error);
            // Fallback to contextual response
            const fallbackResponse = this.generateContextualResponse(message);

            this.conversationHistory.push({
                role: 'assistant',
                content: fallbackResponse
            });

            const words = fallbackResponse.split(' ');
            let accumulated = '';
            for (let i = 0; i < words.length; i++) {
                accumulated += (i === 0 ? '' : ' ') + words[i];
                yield accumulated;
                await new Promise(resolve => setTimeout(resolve, 15));
            }
        }
    }

    private async callClaudeAPI(message: string): Promise<string> {
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1024,
                    system: this.systemPrompt,
                    messages: this.conversationHistory
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Claude API error response:", errorData);
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            return data.content[0].text;
        } catch (error) {
            console.error("Claude API error:", error);
            // Fall back to contextual response
            return this.generateContextualResponse(message);
        }
    }

    private generateContextualResponse(message: string): string {
        const lowerMessage = message.toLowerCase();

        // Experience-related questions
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
            return `Mitra has industry experience at top companies:

**AI Fellow @ Handshake** (Oct 2025 – Present)
• LLM-powered code evaluation, 1K+ agent submissions, 30% faster reviews
• 18% improvement in policy compliance via AST-based static analysis

**AI Intern @ Apple** (Jan 2025 – May 2025)
• Scaled vLLM inference on A100 GPUs: p99 latency 60s → 5s
• ML query routing cut LLM costs by 84%, 99.5% uptime TypeScript microservice

**Software Engineer, AI @ CompScale** (May 2024 – Dec 2024)
• RAG with Pinecone VectorDB for compensation benchmarking across 500+ job roles
• FastAPI + OpenAI APIs at 200ms P95 latency, Kubernetes deployments 2× throughput

Would you like details about any specific role?`;
        }

        // Skills-related questions
        if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('language')) {
            return `Mitra has a strong technical skillset spanning LLM systems and full-stack engineering:

**Languages:** Python, Java, C/C++, JavaScript, TypeScript, Golang, SQL

**ML & AI:** PyTorch, LangChain, TensorFlow, Ray, Scikit-learn, Hugging Face, OpenAI API, vLLM, LoRA

**Web & Backend:** React.js, Node.js, FastAPI, Flask, Django, Redis, MongoDB, PostgreSQL

**Cloud & DevOps:** AWS, GCP, Kubernetes, Docker, GitHub Actions, Prometheus

Is there a specific technology you'd like to know more about?`;
        }

        // Project-related questions
        if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('portfolio')) {
            return `Here are some of Mitra's notable projects:

**1. Briefly – AI Powered Summarization**
• FastAPI + Mistral AI handling 500K+ tokens/min
• 91% backend test coverage with Pytest

**2. LLM Unlearning Research**
• Gradient Ascent + DPO on Gemma-2b and Phi via LoRA
• 86% accuracy retention, 10% bias reduction

**3. LLM Personalization**
• RAG pipeline with FLAN-T5 fine-tuning
• 86% alignment accuracy with BERT semantic classification

**4. Telugu Character Recognition**
• CNN-based, 52 characters, custom dataset (250+ contributors)

Which project interests you most?`;
        }

        // Education questions
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
            return `Mitra completed a **Master of Science in Computer Science** at **UMass Amherst** (Aug 2023 – May 2025), GPA: 3.93.

**Coursework:** Advanced NLP, Neural Networks, Information Retrieval, Algorithms for Data Science

Would you like to know about any specific coursework or projects?`;
        }

        // Contact/hiring questions
        if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
            return `You can reach Mitra through:

📧 **Email:** gmitradatta2001@gmail.com
📞 **Phone:** 413-466-0630
💼 **LinkedIn:** linkedin.com/in/mitradatta
🐙 **GitHub:** github.com/Mitradatta
📍 **Location:** Amherst, Massachusetts

Feel free to download the resume from the Contact section for more details!`;
        }

        // AI/ML specific questions
        if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('llm')) {
            return `Mitra specializes in LLM systems and applied ML:

**LLM Infrastructure:**
• vLLM inference optimization on A100 GPUs (12× latency reduction at Apple)
• Distributed inference, KV-cache tuning, ML-based query routing

**LLM Research:**
• Machine unlearning with Gradient Ascent + DPO (LoRA on Gemma-2b/Phi)
• RAG personalization with FLAN-T5 and BERT embeddings

**Production AI Engineering:**
• RAG pipelines with Pinecone VectorDB (CompScale)
• LLM-powered code evaluation systems (Handshake)

What aspect of AI/ML would you like to explore further?`;
        }

        // Greeting or general
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `Hello! Great to meet you! 👋

I'm here to help you learn about Mitra's background. Some popular questions:
• "Tell me about Mitra's work at Apple"
• "What LLM projects has Mitra built?"
• "What's Mitra's tech stack?"

What can I help you with?`;
        }

        // Default response
        return `That's a great question! Based on Mitra's portfolio:

Mitra is an AI Engineer and MS CS grad (GPA 3.93) from UMass Amherst with experience at Apple, CompScale, and Handshake. Key strengths include:
• LLM inference optimization and distributed systems
• RAG pipelines and LLM research (unlearning, personalization)
• Full-stack engineering with TypeScript, FastAPI, React

Could you be more specific about what you'd like to know? I can tell you about:
• Work experience at specific companies
• Technical projects and their impact
• Skills and technologies
• Education background`;
    }
}

export const claudeService = new ClaudeService();
