import { useState, useCallback, useRef, useEffect } from "react";
import { ChatMessage, ChatRole } from "@/lib/types";

interface UseChatOptions {
  storageKey?: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(
  initialMessages: ChatMessage[] = [],
  options?: UseChatOptions | string
): UseChatReturn {
  const storageKey = typeof options === "string" ? options : options?.storageKey;

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hydrated && storageKey) {
      try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
          setMessages(JSON.parse(stored) as ChatMessage[]);
        }
      } catch {
        /* ignore */
      }
      setHydrated(true);
    }
  }, [hydrated, storageKey]);

  const [error, setError] = useState<Error | null>(null);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const persist = useCallback(
    (msgs: ChatMessage[]) => {
      if (storageKey) {
        try {
          sessionStorage.setItem(storageKey, JSON.stringify(msgs));
        } catch {
          /* ignore */
        }
      }
    },
    [storageKey]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const trimmed = text.trim();
      const userMessage: ChatMessage = {
        role: ChatRole.user,
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, userMessage];
        persist(updated);
        return updated;
      });

      setIsLoading(true);
      setError(null);

      let accumulated = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: trimmed,
        });

        if (!res.ok) {
          throw new Error(`Chat request failed (${res.status})`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();

        setMessages((prev) => {
          const updated = [
            ...prev,
            { role: ChatRole.assistant, content: "", timestamp: Date.now() },
          ];
          persist(updated);
          return updated;
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: accumulated,
            };
            persist(updated);
            return updated;
          });
        }
      } catch (err) {
        const e = err instanceof Error ? err : new Error("Unknown error");
        setError(e);

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
    },
    [isLoading, persist]
  );

  const clearMessages = useCallback(() => {
    setMessages(initialMessages);
    if (storageKey) {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  }, [initialMessages, storageKey]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
