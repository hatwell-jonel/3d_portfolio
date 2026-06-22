import { ChipRow } from "../../components/features/Chip";

type ExperienceCardProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  tags,
}: ExperienceCardProps) {
  return (
    <article className="rounded-xl border border-chat-border bg-chat-card p-4 shadow-[0_1px_2px_rgba(34,31,27,0.04)] sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold text-chat-ink">
          {title}
          <span className="text-chat-accent"> · {company}</span>
        </h3>
        <span className="text-xs font-medium text-chat-faint">{period}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-chat-muted">{description}</p>
      <div className="mt-3">
        <ChipRow items={tags} />
      </div>
    </article>
  );
}
