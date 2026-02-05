'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Chatbot.module.css';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

interface FAQ {
    keywords: string[];
    response: string;
}

const faqData: FAQ[] = [
    {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        response: "Hello! 👋 Welcome to Vital Glow! I'm here to help you with any questions about our IV drip therapy and aesthetic treatments. How can I assist you today?"
    },
    {
        keywords: ['services', 'treatments', 'offer', 'provide', 'do you do', 'what do you'],
        response: "We offer two main categories of treatments:\n\n💉 **IV Drip Therapy:**\n• Energy Boost IV\n• Immunity IV\n• Beauty Glow IV\n• Hydration IV\n• Detox IV\n• Athletic Performance IV\n\n✨ **Aesthetic Treatments:**\n• Anti-Wrinkle Injections\n• Dermal Fillers\n• Skin Boosters\n• PRP Therapy\n\nWould you like more details about any specific treatment?"
    },
    {
        keywords: ['iv drip', 'iv therapy', 'drip', 'infusion', 'vitamin drip'],
        response: "Our IV Drip Therapy delivers vitamins, minerals, and nutrients directly into your bloodstream for maximum absorption! 💧\n\n**Our IV Treatments:**\n• Energy Boost - Combat fatigue & boost energy\n• Immunity - Strengthen your immune system\n• Beauty Glow - Enhance skin, hair & nails\n• Hydration - Rapid rehydration\n• Detox - Cleanse & rejuvenate\n• Athletic Performance - Enhance recovery\n\nEach session takes 30-60 minutes. Would you like to book a consultation?"
    },
    {
        keywords: ['price', 'cost', 'how much', 'pricing', 'rates', 'fee', 'charge'],
        response: "For accurate pricing, please contact us directly as costs vary based on the treatment and your specific needs. 💰\n\n**How to get pricing:**\n📸 DM us on Instagram: @vitalglow.uk\n📧 Email: vitalglow.uk@gmail.com\n\nWe offer competitive rates and occasionally have special promotions. Book a free consultation to discuss your needs!"
    },
    {
        keywords: ['book', 'appointment', 'schedule', 'consultation', 'reserve'],
        response: "Booking with us is easy! 📅\n\n**To book your appointment:**\n1️⃣ DM us on Instagram: @vitalglow.uk\n2️⃣ Email: vitalglow.uk@gmail.com\n\nSimply tell us:\n• Which treatment you're interested in\n• Your preferred date & time\n• Any questions you have\n\nWe typically respond within 24 hours!"
    },
    {
        keywords: ['location', 'where', 'address', 'area', 'come to', 'visit'],
        response: "We offer flexible service options! 📍\n\n**Mobile Service:** We can come to your home, office, or hotel anywhere in the UK!\n\n**Clinic-Based:** We also offer treatments at our partner clinics.\n\nThis makes it super convenient to fit wellness into your busy schedule. Where would you prefer your treatment?"
    },
    {
        keywords: ['hours', 'open', 'available', 'when', 'time', 'schedule'],
        response: "Our operating hours are: ⏰\n\n**Monday - Friday:** 9am - 8pm\n**Saturday:** 10am - 6pm\n**Sunday:** By appointment only\n\nWe're quite flexible with scheduling, especially for our mobile services. Just reach out and we'll find a time that works for you!"
    },
    {
        keywords: ['safe', 'safety', 'risk', 'side effect', 'qualified', 'certified', 'nurse', 'doctor'],
        response: "Your safety is our top priority! ✅\n\n**Our Safety Standards:**\n• All treatments administered by qualified medical professionals\n• Registered nurses and healthcare practitioners\n• Fully insured and licensed\n• Medical-grade products only\n• Thorough health screening before treatment\n\nWe follow strict clinical protocols to ensure your safety and comfort."
    },
    {
        keywords: ['anti-wrinkle', 'wrinkle', 'botox', 'lines', 'forehead'],
        response: "Our Anti-Wrinkle treatments help smooth fine lines and wrinkles for a refreshed, youthful appearance! ✨\n\n**Treatment Areas:**\n• Forehead lines\n• Frown lines (11s)\n• Crow's feet\n• And more!\n\nResults typically last 3-4 months. Would you like to book a consultation to discuss your goals?"
    },
    {
        keywords: ['filler', 'lip', 'cheek', 'dermal', 'volume'],
        response: "Dermal Fillers add natural-looking volume and definition! 💋\n\n**Popular Filler Areas:**\n• Lip enhancement\n• Cheek definition\n• Jawline contouring\n• Nasolabial folds\n• Under-eye hollows\n\nResults are instant and can last 6-18 months depending on the area. Interested in a consultation?"
    },
    {
        keywords: ['skin booster', 'hydration', 'glow', 'profhilo', 'rejuvenation'],
        response: "Skin Boosters are amazing for overall skin rejuvenation! 🌟\n\n**Benefits:**\n• Deep hydration\n• Improved skin texture\n• Natural radiance\n• Reduced fine lines\n• Plumper, healthier skin\n\nPerfect for that lit-from-within glow! Would you like more information?"
    },
    {
        keywords: ['prp', 'vampire', 'platelet', 'facial'],
        response: "PRP Therapy uses your body's own healing power! 🩸\n\n**How it works:**\nWe use your blood's platelet-rich plasma to stimulate collagen production and natural healing.\n\n**Benefits:**\n• Natural rejuvenation\n• Improved skin texture\n• Reduced scarring\n• Hair restoration\n\nIt's 100% natural since we use your own blood!"
    },
    {
        keywords: ['energy', 'tired', 'fatigue', 'exhausted', 'boost'],
        response: "Our Energy Boost IV is perfect for you! ⚡\n\n**Ideal for:**\n• Chronic fatigue\n• Busy professionals\n• Pre-event energy boost\n• Jet lag recovery\n• General tiredness\n\n**Contains:** B vitamins, Vitamin C, Magnesium, and more!\n\nFeel revitalized in just 30-45 minutes. Ready to book?"
    },
    {
        keywords: ['immunity', 'immune', 'cold', 'flu', 'sick', 'ill', 'prevent'],
        response: "Boost your immune system with our Immunity IV! 🛡️\n\n**Perfect for:**\n• Cold & flu season\n• Before/after travel\n• Feeling run down\n• Preventive wellness\n\n**Packed with:** High-dose Vitamin C, Zinc, B vitamins, and immune-boosting nutrients!\n\nStay healthy and protected. Want to schedule a session?"
    },
    {
        keywords: ['thank', 'thanks', 'appreciate'],
        response: "You're welcome! 😊 If you have any more questions, feel free to ask. We're here to help you on your wellness journey!\n\nReady to book? Just DM us on Instagram @vitalglow.uk or email vitalglow.uk@gmail.com 💚"
    },
    {
        keywords: ['bye', 'goodbye', 'see you', 'later'],
        response: "Goodbye! 👋 Thank you for chatting with us. Remember, you can always reach us on Instagram @vitalglow.uk or email vitalglow.uk@gmail.com.\n\nWe look forward to helping you glow! ✨"
    },
    {
        keywords: ['instagram', 'insta', 'dm', 'social', 'follow'],
        response: "Yes, we're on Instagram! 📸\n\n**Follow us:** @vitalglow.uk\n\nDM us anytime for:\n• Booking appointments\n• Questions about treatments\n• Pricing information\n• Before/after photos\n\nWe respond within 24 hours! 💬"
    },
    {
        keywords: ['email', 'mail', 'contact'],
        response: "You can email us at: 📧\n\n**vitalglow.uk@gmail.com**\n\nWe typically respond within 24 hours. Feel free to ask about treatments, pricing, or to book your consultation!"
    }
];

const suggestedQuestions = [
    "What services do you offer?",
    "How do I book an appointment?",
    "Are your treatments safe?",
    "What are your prices?",
    "Where are you located?"
];

// Cloudflare Worker API endpoint
const CHATBOT_API_URL = 'https://vitalglow.cogniq-om.workers.dev';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const initialMessage: Message = {
        id: 1,
        text: "Hi there! 👋 I'm your Vital Glow assistant. How can I help you today? You can ask me about our services, booking, pricing, or anything else!",
        isBot: true,
        timestamp: new Date()
    };

    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'clearing'>('idle');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Voice AI state
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [speechSupported, setSpeechSupported] = useState(true);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
    const pendingVoiceMessageRef = useRef<string>('');

    // Initialize Speech APIs
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check for Speech Recognition support
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognitionAPI) {
                recognitionRef.current = new SpeechRecognitionAPI();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-GB';

                recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                    const transcript = Array.from({ length: event.results.length })
                        .map((_, i) => event.results[i][0].transcript)
                        .join('');
                    setInputValue(transcript);

                    // Auto-send when final result is received
                    if (event.results[event.results.length - 1].isFinal && transcript.trim()) {
                        pendingVoiceMessageRef.current = transcript.trim();
                        setIsListening(false);
                    }
                };

                recognitionRef.current.onerror = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                    // Auto-send the message when listening ends
                    if (pendingVoiceMessageRef.current) {
                        const messageToSend = pendingVoiceMessageRef.current;
                        pendingVoiceMessageRef.current = '';
                        // Trigger send via a small delay to allow state updates
                        setTimeout(() => {
                            handleVoiceSend(messageToSend);
                        }, 100);
                    }
                };
            } else {
                setSpeechSupported(false);
            }

            // Check for Speech Synthesis support
            if (window.speechSynthesis) {
                synthRef.current = window.speechSynthesis;

                // Select a polite female voice
                const selectVoice = () => {
                    const voices = window.speechSynthesis.getVoices();

                    // Priority order for voice selection (prefer female UK voices)
                    const voicePreferences = [
                        // Google UK Female voices (high quality)
                        (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Female'),
                        // Microsoft Libby (UK Female, very natural)
                        (v: SpeechSynthesisVoice) => v.name.includes('Libby'),
                        // Microsoft Sonia (UK Female)
                        (v: SpeechSynthesisVoice) => v.name.includes('Sonia'),
                        // Any UK Female voice
                        (v: SpeechSynthesisVoice) => v.lang.includes('en-GB') && v.name.toLowerCase().includes('female'),
                        // Any Female English voice
                        (v: SpeechSynthesisVoice) => v.lang.includes('en') && v.name.toLowerCase().includes('female'),
                        // Google US Female
                        (v: SpeechSynthesisVoice) => v.name.includes('Google US English Female'),
                        // Any UK English voice
                        (v: SpeechSynthesisVoice) => v.lang === 'en-GB',
                        // Any English voice
                        (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
                    ];

                    for (const preference of voicePreferences) {
                        const voice = voices.find(preference);
                        if (voice) {
                            selectedVoiceRef.current = voice;
                            console.log('Selected voice:', voice.name);
                            return;
                        }
                    }

                    // Fallback to first available voice
                    if (voices.length > 0) {
                        selectedVoiceRef.current = voices[0];
                    }
                };

                // Voices may load async
                if (window.speechSynthesis.getVoices().length > 0) {
                    selectVoice();
                } else {
                    window.speechSynthesis.onvoiceschanged = selectVoice;
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Voice control functions
    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setInputValue('');
            setIsListening(true);
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.error('Speech recognition error:', error);
                setIsListening(false);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    const speakText = useCallback((text: string) => {
        if (synthRef.current && voiceEnabled) {
            // Cancel any ongoing speech
            synthRef.current.cancel();

            // Clean text for speech (remove emojis and markdown)
            const cleanText = text
                .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
                .replace(/\*\*/g, '') // Remove markdown bold
                .replace(/\n/g, '. ') // Convert newlines to pauses
                .replace(/•/g, ', ') // Convert bullets
                .trim();

            const utterance = new SpeechSynthesisUtterance(cleanText);

            // Use selected voice (polite female) or fallback
            if (selectedVoiceRef.current) {
                utterance.voice = selectedVoiceRef.current;
            }

            utterance.lang = 'en-GB';
            utterance.rate = 0.95; // Slightly slower for clarity
            utterance.pitch = 1.1; // Slightly higher for warmth

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            synthRef.current.speak(utterance);
        }
    }, [voiceEnabled]);

    const stopSpeaking = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    const toggleVoice = useCallback(() => {
        setVoiceEnabled(prev => {
            if (prev && synthRef.current) {
                synthRef.current.cancel();
                setIsSpeaking(false);
            }
            return !prev;
        });
    }, []);

    // Handle voice-initiated send (auto-send after speech recognition)
    const handleVoiceSend = useCallback(async (messageText: string) => {
        if (!messageText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: messageText,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Get AI response
        const responseText = await getAIResponse(messageText);

        const botResponse: Message = {
            id: Date.now() + 1,
            text: responseText,
            isBot: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);

        // Speak the bot response
        speakText(responseText);
    }, [speakText]);

    const clearChat = () => {
        stopSpeaking();
        setMessages([{
            id: Date.now(),
            text: "Hi there! 👋 I'm your Vital Glow assistant. How can I help you today? You can ask me about our services, booking, pricing, or anything else!",
            isBot: true,
            timestamp: new Date()
        }]);
        setInputValue('');
        setSubmitStatus('idle');
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Get AI response from Cloudflare Worker
    const getAIResponse = async (userMessage: string): Promise<string> => {
        try {
            // Build conversation history for context (last 10 messages)
            const history = messages
                .slice(-10)
                .filter(msg => msg.id !== 1) // Exclude initial greeting
                .map(msg => ({
                    role: msg.isBot ? 'model' as const : 'user' as const,
                    content: msg.text
                }));

            const response = await fetch(CHATBOT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Chatbot API error:', error);
            // Fallback response if API fails
            return "I'm having trouble connecting right now. 😔\n\nPlease try again, or contact us directly:\n📸 Instagram: @vitalglow.uk\n📧 Email: vitalglow.uk@gmail.com";
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const messageText = inputValue;
        setInputValue('');
        setIsTyping(true);

        // Get AI response
        const responseText = await getAIResponse(messageText);

        const botResponse: Message = {
            id: Date.now() + 1,
            text: responseText,
            isBot: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);

        // Speak the bot response if voice is enabled
        speakText(responseText);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestedQuestion = async (question: string) => {
        const userMessage: Message = {
            id: Date.now(),
            text: question,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Get AI response
        const responseText = await getAIResponse(question);

        const botResponse: Message = {
            id: Date.now() + 1,
            text: responseText,
            isBot: true,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);

        // Speak the bot response if voice is enabled
        speakText(responseText);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
            >
                <div className={styles.chatButtonContent}>
                    <svg className={styles.chatIcon} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                        <circle cx="8" cy="10" r="1.5" />
                        <circle cx="12" cy="10" r="1.5" />
                        <circle cx="16" cy="10" r="1.5" />
                    </svg>
                    <span className={styles.chatButtonText}>Chat with us</span>
                </div>
                <span className={styles.pulseRing}></span>
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.chatHeader}>
                    <div className={styles.headerInfo}>
                        <div className={styles.avatar}>
                            <span>VG</span>
                            <span className={styles.onlineDot}></span>
                        </div>
                        <div className={styles.headerText}>
                            <h4>Vital Glow</h4>
                            <span className={styles.status}>Online • Typically replies instantly</span>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        {/* Voice Toggle Button */}
                        <button
                            className={`${styles.voiceToggle} ${voiceEnabled ? styles.active : ''}`}
                            onClick={toggleVoice}
                            aria-label={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                            title={voiceEnabled ? 'Voice On' : 'Voice Off'}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                {voiceEnabled ? (
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                ) : (
                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                )}
                            </svg>
                        </button>
                        <button
                            className={styles.clearButton}
                            onClick={clearChat}
                            aria-label="Clear chat"
                            title="Start new chat"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                            </svg>
                        </button>
                        <button
                            className={styles.closeButton}
                            onClick={() => {
                                stopSpeaking();
                                stopListening();
                                setIsOpen(false);
                            }}
                            aria-label="Close chat"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className={styles.messagesContainer}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${msg.isBot ? styles.botMessage : styles.userMessage}`}
                        >
                            {msg.isBot && (
                                <div className={styles.messageAvatar}>VG</div>
                            )}
                            <div className={styles.messageBubble}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className={`${styles.message} ${styles.botMessage}`}>
                            <div className={styles.messageAvatar}>VG</div>
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions - Always visible */}
                <div className={styles.suggestions}>
                    <p className={styles.suggestionsLabel}>Quick questions:</p>
                    <div className={styles.suggestionsList}>
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                className={styles.suggestionBtn}
                                onClick={() => handleSuggestedQuestion(q)}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={isListening ? 'Listening...' : 'Type your message...'}
                        className={`${styles.input} ${isListening ? styles.inputListening : ''}`}
                        disabled={isListening}
                    />
                    {/* Microphone Button */}
                    {speechSupported && (
                        <button
                            className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
                            onClick={isListening ? stopListening : startListening}
                            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                            title={isListening ? 'Stop' : 'Voice Input'}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                {isListening ? (
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                                ) : (
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                )}
                            </svg>
                            {isListening && <span className={styles.micPulse}></span>}
                        </button>
                    )}
                    <button
                        className={styles.sendButton}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isListening}
                        aria-label="Send message"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>

                {/* Listening Overlay */}
                {isListening && (
                    <div className={styles.listeningOverlay}>
                        <div className={styles.listeningContent}>
                            <div className={styles.listeningWaves}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>Listening...</p>
                            <button
                                className={styles.stopListeningBtn}
                                onClick={stopListening}
                            >
                                Tap to stop
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chatbot;
