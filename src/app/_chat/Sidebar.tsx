"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, navSections } from "@/lib/data";

const SOCIALS = [
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/hatwell-jonel",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jonel-hatwell/",
  },
  {
    label: "Email",
    icon: Mail,
    href: `mailto:${profile.email}`,
  },
];

function useActiveSection() {
  const [active, setActive] = useState(navSections[0].id);

  useEffect(() => {
    const ids = navSections.map((s) => s.id);

    const handleScroll = () => {
      const container = document.getElementById("thread-scroll");
      const scrollTop = container ? container.scrollTop + 160 : 0;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollTop >= el.offsetTop && scrollTop < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };

    const container = document.getElementById("thread-scroll");
    container?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const active = useActiveSection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const container = document.getElementById("thread-scroll");
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
    }
    onNavigate?.();
  };

  return (
    <nav aria-label="Portfolio sections" className="mt-6 px-3">
      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-chat-faint">
        Sections
      </p>
      <ul className="space-y-1">
        {navSections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60",
                  isActive
                    ? "bg-chat-tint-soft font-medium text-chat-accent-strong"
                    : "text-chat-muted hover:bg-chat-border/50 hover:text-chat-ink"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    isActive ? "bg-chat-accent" : "bg-chat-faint"
                  )}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header: avatar + name */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chat-accent font-serif text-lg text-white"
          aria-hidden="true"
        >
          {profile.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-tight text-chat-ink">
            {profile.name}
          </p>
          <p className="truncate text-sm text-chat-muted">{profile.role}</p>
        </div>
      </div>

      <div className="mx-5 border-t border-chat-border" />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <NavList onNavigate={onNavigate} />
      </div>

      {/* Social links pinned to bottom */}
      <div className="border-t border-chat-border px-5 py-4">
        <ul className="flex items-center gap-2">
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-chat-border bg-chat-card text-chat-muted transition-colors hover:border-chat-accent hover:text-chat-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-accent/60"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="absolute left-4 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-chat-border bg-chat-card text-chat-ink lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden w-[270px] shrink-0 border-r border-chat-border bg-chat-panel lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-[270px] bg-chat-panel shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-chat-muted hover:text-chat-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
