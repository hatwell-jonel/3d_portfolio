import { ArrowUpRight } from "lucide-react";
import { ChipRow } from "./Chip";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

function initialsOf(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group flex gap-3 rounded-xl border border-chat-border bg-chat-card p-4 shadow-[0_1px_2px_rgba(34,31,27,0.04)] transition-colors hover:border-chat-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60 sm:p-5"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chat-tint font-serif text-sm text-chat-accent-strong"
      >
        {initialsOf(title)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h3 className="text-base font-semibold text-chat-ink group-hover:text-chat-accent-strong">
            {title}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-chat-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chat-accent" />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-chat-muted">
          {description}
        </p>
        <div className="mt-3">
          <ChipRow items={tags} />
        </div>
      </div>
    </a>
  );
}
