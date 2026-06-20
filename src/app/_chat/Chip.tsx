import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-chat-border bg-chat-canvas px-2.5 py-1 text-xs font-medium text-chat-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </div>
  );
}
