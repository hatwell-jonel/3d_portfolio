"use client";

import Sidebar from "./_chat/Sidebar";
import Thread from "./_chat/Thread";
import Composer from "../components/features/Composer";
import ThemeToggle from "./_chat/ThemeToggle";
import { profile } from "@/lib/data";
import { useChat } from "@/hooks/use-chat";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const STORAGE_KEY = "portfolio-chat-messages";

export default function PortfolioPage() {
  const { messages, isLoading, sendMessage } = useChat([], STORAGE_KEY);

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
          </div>
        </header>

        {/* Thread (only this scrolls) */}
        <div
          id="thread-scroll"
          className="thread-scroll min-h-0 flex-1 overflow-y-auto"
        >
          <ErrorBoundary>
            <Thread chatMessages={messages} isLoading={isLoading} />
          </ErrorBoundary>
        </div>

        {/* Composer */}
        <ErrorBoundary>
          <Composer onSend={sendMessage} disabled={isLoading} />
        </ErrorBoundary>
      </main>
    </div>
  );
}
