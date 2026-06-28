import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Send, XIcon } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Linkify from "linkify-react";
import { useChat } from "@/hooks/use-chat";
import { WELCOME_MESSAGE } from "@/lib/data";
import { ChatRole } from "@/lib/types";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const SUGGESTIONS: string[] = [
    "Can you tell me about yourself?",
    "What technologies are you currently using?",
    "Can you tell me about your work experience?",
    "What are your current hobbies and interests?",
    "How can we contact you?"
];

const ChatWithMe: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { messages, isLoading, sendMessage, clearMessages } = useChat(
        [{ role: ChatRole.assistant, content: WELCOME_MESSAGE }],
        { storageKey: "chat-with-me" }
    );

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = async (text: string = input) => {
        if (!text.trim() || isLoading) return;
        setInput("");
        await sendMessage(text.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleClearChat = () => {
        clearMessages();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="text-xl p-0 group on"
                >
                    <span>Chat with me</span>
                    <BotMessageSquare className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-150 h-150 flex flex-col p-0 bg:sidebar"
                onInteractOutside={(e) => e.preventDefault()}
                showCloseButton={false}
            >
                <DialogHeader className="relative px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2">
                            <BotMessageSquare className="h-5 w-5" />
                            Jonel Hatwell
                        </DialogTitle>
                        <Button variant="ghost" size="sm" onClick={handleClearChat}>
                            Clear Chat
                        </Button>
                    </div>

                    <DialogClose asChild>
                        <Button
                            size="icon"
                            className="absolute right-0 -top-6.25 h-5 w-5 rounded-full"
                        >
                            <XIcon />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>

                <ErrorBoundary>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${
                                m.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
                                    m.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                }`}
                            >
                                <Linkify
                                    options={{
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-blue-600 underline",
                                    }}
                                >
                                    {m.content}
                                </Linkify>
                            </div>
                        </div>
                    ))}

                    {messages.length === 1 && !isLoading && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Try asking:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTIONS.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSubmit(suggestion)}
                                        className="text-sm px-3 py-1 rounded-full border hover:bg-muted transition hover:text-primary cursor-pointer"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-4 py-2 text-sm">
                                Typing…
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
                </ErrorBoundary>

                <div className="border-t px-6 py-4">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything…"
                            disabled={isLoading}
                            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button
                            onClick={() => handleSubmit()}
                            disabled={isLoading || !input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChatWithMe;
