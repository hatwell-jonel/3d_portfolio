# Graph Report - 3d_portfolio  (2026-07-02)

## Corpus Check
- 82 files · ~117,910 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 347 nodes · 541 edges · 29 communities (21 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd2025e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_data.tsx|data.tsx]]
- [[_COMMUNITY_cn|cn]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_projects.tsx|projects.tsx]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_page.client.tsx|page.client.tsx]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_components.json|components.json]]
- [[_COMMUNITY_AGENTS.md - 3D Portfolio|AGENTS.md - 3D Portfolio]]
- [[_COMMUNITY_SKILL|SKILL.md]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_SocialLinks.tsx|SocialLinks.tsx]]
- [[_COMMUNITY_🧪 TESTS|🧪 TESTS]]
- [[_COMMUNITY_Sidebar.tsx|Sidebar.tsx]]
- [[_COMMUNITY_ElectricBorder.tsx|ElectricBorder.tsx]]
- [[_COMMUNITY_committer|committer.md]]
- [[_COMMUNITY_opencode.json|opencode.json]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_commit|commit.md]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 41 edges
2. `compilerOptions` - 16 edges
3. `AGENTS.md - 3D Portfolio` - 11 edges
4. `ErrorBoundary` - 8 edges
5. `Badge()` - 7 edges
6. `Card()` - 7 edges
7. `useModalStore` - 7 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `Button()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Turn()` --calls--> `cn()`  [EXTRACTED]
  src/app/_chat/Turn.tsx → src/lib/utils.ts
- `Chip()` --calls--> `cn()`  [EXTRACTED]
  src/components/features/Chip.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `RoomPortfolio()` --calls--> `useModalStore`  [EXTRACTED]
  src/app/3d/page.tsx → src/lib/stores/modal-store.ts

## Import Cycles
- None detected.

## Communities (29 total, 8 thin omitted)

### Community 0 - "data.tsx"
Cohesion: 0.07
Nodes (27): Snake(), Sudoku(), Tetris(), ai, ExperienceCard(), ExperienceCardProps, initialsOf(), ProjectCard() (+19 more)

### Community 1 - "cn"
Cohesion: 0.11
Nodes (24): ArcadeGame(), SUGGESTIONS, Modal(), modalStyles, NAV_LINKS, NavItem(), NavItemProps, BackButton() (+16 more)

### Community 2 - "page.tsx"
Cohesion: 0.09
Nodes (18): AirConditioner(), ArcadeMachine(), BedModel(), ComputerSet(), addSetupLighting(), RecordSetup(), Spiderman(), CAMERA_CONFIG (+10 more)

### Community 3 - "projects.tsx"
Cohesion: 0.12
Nodes (16): style, MyWorks(), Projects(), ProjectsProps, Badge(), badgeVariants, Card(), CardAction() (+8 more)

### Community 4 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, class-variance-authority, clsx, @google/genai, @jonelhatwell/arcade-games, linkify-react, lucide-react, next (+21 more)

### Community 5 - "page.client.tsx"
Cohesion: 0.12
Nodes (8): PortfolioPage(), ChatWithMe(), Composer(), ComposerProps, ErrorBoundary, Props, State, useChat()

### Community 6 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 8 - "AGENTS.md - 3D Portfolio"
Cohesion: 0.11
Nodes (17): 3D Scene (`src/app/3d/page.tsx`), AGENTS.md - 3D Portfolio, AI Chat, Architecture, Commands, Commit Conventions, Format, Games (+9 more)

### Community 9 - "SKILL.md"
Cohesion: 0.15
Nodes (12): 10. Best Practices, 11. Last Resort, 12. Pre-commit Requirements, 1. Purpose, 2. Commit Message Format, 3. Commit Types, 4. Scope Rules, 5. Commit Message Guidelines (+4 more)

### Community 10 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tw-animate-css, @types/node, @types/react (+3 more)

### Community 11 - "layout.tsx"
Cohesion: 0.25
Nodes (6): geistMono, geistSans, inter, metadata, sourceSerif, ThemeProvider()

### Community 12 - "SocialLinks.tsx"
Cohesion: 0.39
Nodes (5): SOCIAL_LINKS, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

### Community 13 - "🧪 TESTS"
Cohesion: 0.29
Nodes (6): ✅ Lighthouse (DEC 30, 2025), ✅ [PageSpeed Insights](https://pagespeed.web.dev/) (DEC 30, 2025), PORTFOLIO, ✅ [Security Headers](https://securityheaders.com/) (DEC 30, 2025), 🧪 TESTS, 🌐 Useful resources

### Community 14 - "Sidebar.tsx"
Cohesion: 0.33
Nodes (4): NavList(), SOCIALS, useActiveSection(), navSections

## Knowledge Gaps
- **137 isolated node(s):** `$schema`, `plugin`, `@opencode-ai/plugin`, `$schema`, `style` (+132 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `data.tsx`, `projects.tsx`, `SocialLinks.tsx`, `Sidebar.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ErrorBoundary` connect `page.client.tsx` to `cn`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `useModalStore` connect `page.tsx` to `cn`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `@opencode-ai/plugin` to the rest of the system?**
  _137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `data.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07399577167019028 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.11470985155195682 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08677098150782361 - nodes in this community are weakly interconnected._