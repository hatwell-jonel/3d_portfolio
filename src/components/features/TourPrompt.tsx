"use client";

import { Compass } from "lucide-react";

export default function TourPrompt({
  onAccept,
}: {
  onAccept: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-chat-border bg-chat-panel p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-chat-accent/15">
          <Compass className="h-7 w-7 text-chat-accent" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-chat-ink">
          Explore the Portfolio
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-chat-muted">
          Get a quick guided tour of the navigation, chat, theme switcher, and
          main content area to help you find your way around.
        </p>

        <button
          type="button"
          onClick={onAccept}
          className="cursor-pointer w-full rounded-xl bg-chat-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60"
        >
          Take a tour
        </button>
      </div>
    </div>
  );
}
