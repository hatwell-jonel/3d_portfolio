# AGENTS.md - 3D Portfolio

## Commands
```bash
pnpm dev       # dev server (localhost:3000)
pnpm build     # production build
pnpm start     # production server
pnpm lint      # ESLint (next core-web-vitals + typescript)
```
No test framework, no Prettier, no Husky, no lint-staged.

## Architecture

Two distinct UI modes routed via Next.js App Router:
- **`/`** → chat portfolio: `page.tsx` (server) delegates to `page.client.tsx` (client)
- **`/3d`** → immersive 3D room: vanilla Three.js (NOT `@react-three/fiber`) in `src/app/3d/page.tsx`
- **`/3d`** uses its own minimal layout (`src/app/3d/layout.tsx`) — no `ThemeProvider`, no global `Modal`

## 3D Scene (`src/app/3d/page.tsx`)

- **Renderer**: `WebGLRenderer`, antialiasing, `SRGBColorSpace`, `ACESFilmicToneMapping`, `PCFSoftShadowMap`
- **Camera**: `PerspectiveCamera`, FOV 75, near 0.1, far 1000, eye-level at y=1.6, bounded to x/z ∈ [-5.5, 5.5], move speed 0.05
- **Lighting**: ambient(`#ff6b6b`, 0.08) + directional(`#ffe6cc`, 1.2, shadow map 2048²) + hemi
- **Room**: 12×12 floor with 4×4 textured repeat, walls, ceiling at y=4, neon strip accents (`#ff6b6b`)
- **Interaction**: raycaster from center-screen on `pointerdown`/`pointerup`; drag threshold >2px distinguishes click from drag
- **Collision detection**: `BedModel` & `RecordSetup` export `checkCollision()` / `getBoundingBox()`
- **Audio**: `RecordSetup` uses `THREE.AudioListener` + `THREE.Audio` for `relaxing_sound.mp3`

### Interactive 3D objects

| Object | File | `userData` key | Action |
|---|---|---|---|
| ArcadeMachine | `models/ArcadeMachine.tsx` | `section='arcade'` | Opens arcade game modal |
| Spiderman | `models/spiderman.tsx` | `section='aboutme'` | Opens About Me modal |
| ComputerSet | `models/ComputerSet.tsx` | `section='myworks'` | Opens My Works modal |
| RecordSetup | `models/RecordSetup.tsx` | `toggleMusic` | Toggles audio playback |

## Modal System

- Global `<Modal />` in root `layout.tsx` (always mounted, visibility controlled by zustand)
- **Store**: `src/lib/stores/modal-store.ts` — `activeModal: ModalType | null`, `setModal()`, `clearModal()`
- **Types**: `ModalType = 'arcade' | 'aboutme' | 'myworks'`
- **Content mapping**: `arcade` → `ArcadeGame`, `aboutme` → `AboutMe__legacy`, `myworks` → `MyWorks`
- Arcade games use a **two-level dialog**: game selection list → inner `<Dialog>` for the actual game
- `ChatWithMe` dialog inside AboutMe also has `onInteractOutside` prevention

## AI Chat

- **Provider**: Google Gemini (`gemini-2.5-flash`) via `@google/genai` SDK
- **Server action**: `src/app/_actions/api-chat.tsx`
- **System prompt**: `src/lib/data.tsx` (~356 lines defining Jonel Hatwell's persona, skills, work history)
- **Two chat UIs**: main portfolio (`Composer.tsx` + `Thread.tsx`) and AboutMe modal (`ChatWithMe.tsx`)

## Games

- **External npm package** `@jonelhatwell/arcade-games`: SpaceDodger, MemoryGame
- **Local** (`src/app/3d/arcade/`): Tetris (canvas 300×600), Snake (canvas 400×400), Sudoku (React)

## Styling

- **Tailwind v4 CSS-first** — no `tailwind.config.*`, config via `@theme` in `globals.css`
- **shadcn/ui**: `new-york` style, base color `zinc`, `@/*` alias, `components.json` at root
- **`cn()` utility**: `src/lib/utils.ts` — wraps `clsx` + `tailwind-merge`
- **Dark mode**: `next-themes` with `attribute="class"`, custom properties in `.dark` block
- **Animations**: `tw-animate-css` import, custom `turn-rise` keyframe for chat sections
- **Fonts** (via `next/font/google`): Geist Sans, Geist Mono, Inter, Source Serif 4

## Key Config

- **tsconfig.json**: `strict`, `moduleResolution: "bundler"`, `@/*` → `./src/*`
- **pnpm-workspace.yaml**: allows `protobufjs`, `sharp`, `unrs-resolver` builds
- **next.config.ts**: security headers only (HSTS 2yr, X-Frame-Options DENY, etc.)
- **`.env`** exists on disk with live API keys but is **gitignored** (not tracked)
- **`NEXT_PUBLIC_OPENAI_API_KEY`** in `.env` appears unused in source code

## Commit Conventions

### Format
```
<type>(<scope>): <short summary>
```

### Types
| Type       | Description |
|------------|-------------|
| feat       | New feature or functionality |
| fix        | Bug fix |
| refactor   | Code changes that do not add features or fix bugs |
| perf       | Performance improvements |
| style      | Code style changes (formatting, whitespace, etc.) |
| test       | Adding or updating tests |
| docs       | Documentation changes |
| build      | Build system or dependency changes |
| ci         | CI/CD pipeline changes |
| chore      | Maintenance tasks |

### Guidelines
- Use imperative tone ("add", not "added")
- Keep subject line under 72 characters
- Be specific and meaningful
- Scope is optional — omit if unclear
- One logical change per commit
- Prefer several small commits over one large one
- Include a body for complex commits

### Pre-commit
- Run `pnpm lint` and fix errors
- Review `git diff --cached`
- No force-push, amend, or interactive mode unless asked

### Last resort
```
chore: update project files
```
