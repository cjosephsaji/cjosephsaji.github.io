import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, MoreHorizontal, Maximize2, Minimize2 } from "lucide-react";

type Message = {
    id: string;
    sender: "bot" | "user";
    text: string;
};

const INITIAL_MESSAGES: Message[] = [
    { id: "1", sender: "bot", text: "Hello! Welcome to Joining Safaris. 🌍" },
    { id: "2", sender: "bot", text: "I'm your AI safari guide. How can I help you plan your dream expedition today?" },
];

const SUGGESTED_QUESTIONS = [
    "When is the best time to see the Great Migration?",
    "Suggest a good family safari.",
    "What is the cheapest package?",
];

const BOT_RESPONSES = [
    "That sounds like an amazing journey! The Great Migration is best seen between June and October.",
    "For families, we highly recommend the Masai Mara or Kruger, as they have fantastic child-friendly lodges and easy wildlife viewing.",
    "Our most budget-friendly option is the Etosha Salt Pans Safari, which offers incredible value and stark, beautiful landscapes for just $3,200.",
    "I'm an AI, so I'm still learning! But our human safari experts would love to chat with you about that.",
];

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMsg: Message = { id: Date.now().toString(), sender: "user", text };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(() => {
            const randomResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
            const newBotMsg: Message = { id: (Date.now() + 1).toString(), sender: "bot", text: randomResponse };
            setMessages((prev) => [...prev, newBotMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-50 lg:bottom-10 lg:right-10"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-safari-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping" />
                            <MessageSquare size={28} className="transition-transform group-hover:scale-110" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed bottom-0 right-0 z-50 flex flex-col overflow-hidden bg-background shadow-2xl sm:bottom-6 sm:right-6 sm:rounded-2xl border border-border transition-all duration-300 ${isExpanded
                            ? "h-[100dvh] w-full sm:h-[80vh] sm:w-[600px] sm:max-w-[calc(100vw-3rem)]"
                            : "h-[85dvh] w-full sm:h-[600px] sm:w-[400px]"
                            }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-primary px-4 py-3 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-md">
                                    <Sparkles size={20} className="text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg font-semibold text-primary-foreground flex gap-1 items-center">
                                        Kibo <span className="text-primary-foreground/80 font-sans text-xs font-normal">| Safari Guide AI</span>
                                    </h3>
                                    <p className="font-sans text-xs text-primary-foreground/70">Always Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground/80 hover:bg-primary-foreground/20 transition-colors"
                                >
                                    {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground/80 hover:bg-primary-foreground/20 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-muted/20">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex max-w-[85%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className="mt-auto shrink-0">
                                            {msg.sender === "bot" ? (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                    <Sparkles size={14} className="text-primary" />
                                                </div>
                                            ) : (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                    <User size={14} className="text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                                                ? "rounded-br-sm bg-accent text-accent-foreground"
                                                : "rounded-bl-sm bg-card border border-border text-foreground"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex max-w-[85%] gap-2">
                                        <div className="mt-auto shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                <Sparkles size={14} className="text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-card px-4 py-3.5 border border-border shadow-sm">
                                            <motion.div
                                                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            />
                                            <motion.div
                                                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                                            />
                                            <motion.div
                                                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="bg-card p-4 border-t border-border">
                            {/* Suggested chips - only show if no user messages yet to keep UI clean */}
                            {messages.filter((m) => m.sender === "user").length === 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {SUGGESTED_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleSendMessage(q)}
                                            className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-sans text-primary transition-colors hover:bg-primary/10 hover:border-primary/30"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }}
                                className="flex items-end gap-2"
                            >
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="w-full rounded-xl border border-border bg-background px-4 py-3 font-sans text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:opacity-90 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
