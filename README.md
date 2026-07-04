# Jonel Hatwell — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Serwist-5C3DC9)](https://serwist.pages.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue)]()

Personal portfolio built with Next.js 16. A chat-based portfolio with AI-powered interaction and arcade games.

---

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind v4, shadcn/ui (new-york, zinc) |
| AI Chat | Google Gemini 2.5 Flash (`@google/genai`) |
| State | Zustand |
| PWA | Serwist (configurator mode) |
| Fonts | Geist, Inter, Source Serif 4 |

---

## Getting Started

```bash
pnpm install
pnpm dev       # dev server + service worker watch mode
pnpm build     # production build + service worker build
pnpm start     # serve production build
pnpm lint      # ESLint
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Chat portfolio — server component + client Composer |
| `/api/chat` | Gemini AI chat endpoint (server action) |
| `/~offline` | Offline fallback page (PWA) |

---

## Project Structure

```
src/
  app/               — App Router pages and layouts
    _chat/           — AI chat components (Composer, Thread)
    _sections/       — Portfolio sections (about, works, contact)
    ~offline/        — PWA offline fallback
  components/        — Reusable UI components
    features/        — Modal, ChatWithMe, ArcadeGame
    ui/              — shadcn primitives (button, dialog, etc.)
    layout/          — NavBar, ScrollArea
  lib/               — Zustand stores, utilities, data, AI prompt
public/
  icon-192x192.png   — PWA icon
  icon-512x512.png   — PWA icon
  apple-icon.png     — iOS touch icon
  site-logo.svg      — Site logo
```

---

## Architecture Highlights

### Modal System
- Zustand-driven global modal (`modal-store.ts`)
- Content mapping: `aboutme` → `AboutMe__legacy`, `myworks` → `MyWorks`, `arcade` → `ArcadeGame`
- Arcade games use two-level dialog: game list → inner dialog for the game

### AI Chat
- Google Gemini (`gemini-2.5-flash`) via server action
- ~356-line system prompt defining persona, skills, work history
- Two chat UIs: main portfolio (Composer + Thread) and AboutMe modal (ChatWithMe)

---

## PWA

- **Service worker**: Serwist configurator mode via `serwist.config.mjs`
- **Precaches**: 45 core files (~3.8 MB) for offline support
- **Offline fallback**: `/~offline` page served when network unavailable
- **Manifest**: Web app manifest generated at `/manifest.webmanifest`
- **Icons**: 192×192, 512×512, and 180×180 (Apple touch) generated from site logo

---

## Performance

### Lighthouse (Dec 30, 2025)
![Lighthouse Report](/public/assets/image/test/lighthouse.png)

### PageSpeed Insights (Dec 30, 2025)
![PageSpeed Desktop](/public/assets/image/test/pagespeed_desktop.png)
![PageSpeed Mobile](/public/assets/image/test/pagespeed_mobile.png)

### Security Headers (Dec 30, 2025)
![Security Headers](/public/assets/image/test/securtyheaders.png)
