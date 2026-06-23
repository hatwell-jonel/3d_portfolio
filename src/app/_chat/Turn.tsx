import { cn } from "@/lib/utils";
import { profile } from "@/lib/data";

type TurnProps = {
  /** anchor id for scroll-linking */
  id?: string;
  /** meta line label shown after the name, e.g. "Profile" */
  label: string;
  /** timestamp-style text */
  meta?: string;
  /** "assistant" (Jonel) or "user" alignment style */
  role?: "assistant" | "user";
  /** stagger animation delay in ms */
  delay?: number;
  /** unix ms timestamp for live chat messages */
  time?: number;
  children: React.ReactNode;
};

export default function Turn({
  id,
  label,
  meta,
  role = "assistant",
  delay = 0,
  time,
  children,
}: TurnProps) {
  const isUser = role === "user";

  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section
      id={id}
      className={cn(
        "turn-rise flex gap-3 sm:gap-4",
        isUser && "flex-row-reverse"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Avatar */}
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm",
          isUser
            ? "bg-chat-border font-medium text-chat-muted"
            : "bg-chat-accent font-serif text-white"
        )}
      >
        {isUser ? "You" : profile.initials}
      </span>

      {/* Body */}
      <div className={cn("min-w-0 flex-1", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "mb-1.5 flex items-baseline gap-2 text-sm",
            isUser && "flex-row-reverse"
          )}
        >
          {isUser ? (
            <span className="text-xs text-chat-faint">
              {time ? formatTime(time) : label}
            </span>
          ) : (
            <>
              <span className="font-medium text-chat-ink">{profile.name}</span>
              <span className="text-xs text-chat-faint">
                {time ? formatTime(time) : label}
                {meta ? ` · ${meta}` : ""}
              </span>
            </>
          )}
        </div>
        <div className={cn("w-full", isUser && "flex justify-end")}>
          {children}
        </div>
      </div>
    </section>
  );
}
