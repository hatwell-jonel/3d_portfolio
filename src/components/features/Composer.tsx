"use client";

import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

type ComposerProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function Composer({ onSend, disabled }: ComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="border-t-2 border-t-chat-accent/15 bg-chat-canvas px-4 pb-4 pt-3 shadow-[0_-6px_20px_rgba(34,31,27,0.04)] sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-[18px] border border-chat-border bg-chat-card p-2 shadow-[0_2px_8px_rgba(34,31,27,0.06)] transition-shadow duration-200 focus-within:border-chat-accent/60 focus-within:shadow-[0_0_0_2px_#C2613A40,0_4px_12px_rgba(194,97,58,0.1)]"
      >
        <label htmlFor="composer-input" className="sr-only">
          Ask me about a project, or just say hi
        </label>
        <textarea
          id="composer-input"
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            autoGrow(e.target);
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask me about a project, or just say hi…"
          disabled={disabled}
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-[15px] text-chat-ink placeholder:text-chat-faint focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={disabled || !value.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chat-accent text-white shadow-[0_2px_6px_rgba(194,97,58,0.3)] transition-all duration-200 hover:bg-chat-accent-strong hover:shadow-[0_4px_12px_rgba(194,97,58,0.4)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-chat-faint">
        Powered by AI · responses reflect Jonel&apos;s experience
      </p>
    </div>
  );
}
