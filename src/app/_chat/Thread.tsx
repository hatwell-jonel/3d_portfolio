"use client";

import { useEffect, useRef } from "react";
import Linkify from "linkify-react";
import Turn from "./Turn";
import { ChipRow } from "./Chip";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import {
  aboutMe,
  experiences,
  techStack,
  projects,
  certificates,
  skillChips,
} from "@/lib/data";
import { ChatMessage, ChatRole } from "@/lib/types";

type ThreadProps = {
  chatMessages: ChatMessage[];
  isLoading: boolean;
};

export default function Thread({ chatMessages, isLoading }: ThreadProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatMessages.length > 0 || isLoading) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages.length, isLoading]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">
      {/* Profile */}
      <Turn id="profile" label="Profile" meta="intro" delay={0}>
        <div className="space-y-4 text-[15px] leading-relaxed text-chat-ink">
          {aboutMe.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "font-serif text-lg leading-relaxed" : undefined}>
              {paragraph}
            </p>
          ))}
          <div className="pt-1">
            <ChipRow items={skillChips} />
          </div>
        </div>
      </Turn>

      {/* Experience */}
      <Turn id="experience" label="Experience" meta="career" delay={80}>
        <div className="space-y-3">
          {experiences.map((exp) => (
            <ExperienceCard
              key={`${exp.company}-${exp.period}`}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              tags={exp.tags}
            />
          ))}
        </div>
      </Turn>

      {/* Tech Stack */}
      <Turn id="techstack" label="Tech Stack" meta="tools" delay={120}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-chat-border bg-chat-card p-4 shadow-[0_1px_2px_rgba(34,31,27,0.04)]"
            >
              <h3 className="mb-2.5 text-sm font-semibold text-chat-ink">
                {group.category}
              </h3>
              <ChipRow items={group.skills} />
            </div>
          ))}
        </div>
      </Turn>

      {/* Projects */}
      <Turn id="projects" label="Projects" meta="selected work" delay={120}>
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
            />
          ))}
        </div>
      </Turn>

      {/* Certificates */}
      <Turn id="certificates" label="Certificates" meta="credentials" delay={120}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certificates.map((cert) => (
              <a
                key={cert.title}
                href={cert.credentials}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-chat-border bg-chat-card p-4 shadow-[0_1px_2px_rgba(34,31,27,0.04)] transition-colors hover:border-chat-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chat-tint-soft text-sm font-semibold text-chat-accent-strong"
                >
                  ★
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-chat-ink group-hover:text-chat-accent-strong">
                    {cert.title}
                  </p>
                  <p className="truncate text-xs text-chat-muted">{cert.issuer}</p>
                </div>
              </a>
            ))}
          </div>

          <blockquote className="rounded-xl border-l-2 border-chat-accent bg-chat-tint-soft/60 px-4 py-3">
            <p className="font-serif text-base italic leading-relaxed text-chat-ink">
              &ldquo;The bridge between knowledge and skill is practice. The
              bridge between skill and mastery is time.&rdquo;
            </p>
            <footer className="mt-1.5 text-xs not-italic text-chat-muted">
              — Jim Bouchard
            </footer>
          </blockquote>
        </div>
      </Turn>

      {/* Live chat turns */}
      {chatMessages.map((m, i) =>
        m.role === ChatRole.user ? (
          <Turn key={`chat-${i}`} label="message" role="user">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-chat-accent px-4 py-2.5 text-sm leading-relaxed text-white">
              {m.content}
            </div>
          </Turn>
        ) : (
          <Turn key={`chat-${i}`} label="reply" role="assistant">
            <div className="rounded-2xl rounded-tl-sm border border-chat-border bg-chat-card px-4 py-2.5 text-[15px] leading-relaxed text-chat-ink shadow-[0_1px_2px_rgba(34,31,27,0.04)]">
              <Linkify
                options={{
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-chat-accent-strong underline underline-offset-2",
                }}
              >
                {m.content}
              </Linkify>
            </div>
          </Turn>
        )
      )}

      {isLoading && (
        <Turn label="typing…" role="assistant">
          <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm border border-chat-border bg-chat-card px-4 py-3 shadow-[0_1px_2px_rgba(34,31,27,0.04)]">
            <span className="h-2 w-2 animate-bounce rounded-full bg-chat-faint [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-chat-faint [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-chat-faint" />
          </div>
        </Turn>
      )}

      <div ref={endRef} />
    </div>
  );
}
