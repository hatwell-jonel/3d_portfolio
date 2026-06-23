"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";
import Sidebar from "./_chat/Sidebar";
import Thread from "./_chat/Thread";
import Composer from "../components/features/Composer";
import ThemeToggle from "./_chat/ThemeToggle";
import { Chat } from "@/app/_actions/api-chat";
import { profile } from "@/lib/data";
import { ChatMessage, ChatRole } from "@/lib/types";

const STORAGE_KEY = "portfolio-chat-messages";

export default function PortfolioPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored) as ChatMessage[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (text: string) => {
    if (isLoading) return;

    setMessages((prev) => [...prev, { role: ChatRole.user, content: text, timestamp: Date.now() }]);
    setIsLoading(true);

    try {
      const response = await Chat(text);
      setMessages((prev) => [
        ...prev,
        { role: ChatRole.assistant, content: (response.content as string) ?? "", timestamp: Date.now() },
      ]);
    } catch (err) {
      console.error("Chat failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: ChatRole.assistant,
          content:
            "I'm having trouble connecting right now. Please reach out directly via email or LinkedIn.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-chat-canvas font-inter text-chat-ink">
      <Sidebar />

      {/* Main panel */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-chat-border bg-chat-canvas/90 px-4 py-3 pl-16 backdrop-blur sm:px-6 lg:pl-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chat-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-chat-accent" />
            </span>
            <span className="text-sm font-medium text-chat-ink">
              {profile.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* <Link
              href="/3d"
              className="inline-flex items-center gap-1.5 rounded-full border border-chat-border bg-chat-card px-3 py-1.5 text-xs font-medium text-chat-muted transition-colors hover:border-chat-accent hover:text-chat-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60"
            >
              <Boxes className="h-3.5 w-3.5" />
              View in 3D
            </Link> */}
          </div>
        </header>

        {/* Thread (only this scrolls) */}
        <div
          id="thread-scroll"
          className="thread-scroll min-h-0 flex-1 overflow-y-auto"
        >
          <Thread chatMessages={messages} isLoading={isLoading} />
        </div>

        {/* Composer */}
        <Composer onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  );
}
