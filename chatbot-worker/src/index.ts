/**
 * Vital Glow Chatbot Worker
 * Cloudflare Worker that integrates with Gemini API for AI-powered chat
 */

interface Env {
    GEMINI_API_KEY: string;
}

interface ChatRequest {
    message: string;
    history?: { role: 'user' | 'model'; content: string }[];
}

interface GeminiContent {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const SYSTEM_PROMPT = `You are a helpful and friendly assistant for Vital Glow, a UK-based IV drip therapy and aesthetic treatments clinic.

About Vital Glow:
- We offer IV Drip Therapy: Energy Boost, Immunity, Beauty Glow, Hydration, Detox, and Athletic Performance IVs
- We offer Aesthetic Treatments: Anti-Wrinkle Injections, Dermal Fillers, Skin Boosters, PRP Therapy
- We provide mobile services (home, office, hotel) across the UK and clinic-based treatments
- Hours: Monday-Friday 9am-8pm, Saturday 10am-6pm, Sunday by appointment
- Contact: Instagram @vitalglow.uk, Email vitalglow.uk@gmail.com
- All treatments are administered by qualified medical professionals (registered nurses and healthcare practitioners)
- We are fully insured, licensed, and use only medical-grade products

Your tone:
- Be warm, friendly, and professional
- Use emojis sparingly to feel approachable (1-2 per response max)
- Keep responses concise but informative
- Always encourage booking a consultation for personalized advice
- If asked about pricing, direct them to contact us directly as costs vary by treatment and individual needs

Important:
- Never make up specific prices
- Never provide medical advice or diagnoses
- Always recommend consulting with our professionals for treatment-specific questions`;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        // Handle GET requests - show API status
        if (request.method === 'GET') {
            return new Response(
                JSON.stringify({
                    name: 'Vital Glow Chatbot API',
                    status: '✅ Online',
                    usage: 'This is an API endpoint. Send POST request with { "message": "your question" }',
                }),
                {
                    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
                }
            );
        }

        // Only accept POST requests for chat
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
            });
        }

        try {
            const { message, history = [] } = (await request.json()) as ChatRequest;

            if (!message || typeof message !== 'string') {
                return new Response(JSON.stringify({ error: 'Message is required' }), {
                    status: 400,
                    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
                });
            }

            // Build conversation contents for Gemini
            const contents: GeminiContent[] = [
                // System instruction as first user message
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: 'Understood! I am ready to assist Vital Glow customers.' }] },
                // Previous conversation history
                ...history.map((msg) => ({
                    role: msg.role,
                    parts: [{ text: msg.content }],
                })),
                // Current user message
                { role: 'user', parts: [{ text: message }] },
            ];

            // Call Gemini API
            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500,
                            topP: 0.9,
                        },
                        safetySettings: [
                            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                        ],
                    }),
                }
            );

            if (!geminiResponse.ok) {
                const errorText = await geminiResponse.text();
                console.error('Gemini API error:', errorText);
                return new Response(
                    JSON.stringify({ error: 'Failed to get response from AI' }),
                    {
                        status: 500,
                        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
                    }
                );
            }

            const geminiData = (await geminiResponse.json()) as {
                candidates?: { content?: { parts?: { text?: string }[] } }[];
            };

            const responseText =
                geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I'm sorry, I couldn't generate a response. Please try again or contact us directly at vitalglow.uk@gmail.com";

            return new Response(JSON.stringify({ response: responseText }), {
                headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Worker error:', error);
            return new Response(
                JSON.stringify({ error: 'An unexpected error occurred' }),
                {
                    status: 500,
                    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
                }
            );
        }
    },
};
