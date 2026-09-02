@AGENTS.md

# allymakes

A prototype playground. One idea = one route under `app/(prototypes)/<slug>/`.
Optimise for speed of trying things, not for production polish.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · pnpm · Node 22 (`.node-version`)
- **Styling: CSS Modules only.** `Component.tsx` + `Component.module.css`, side by side.
  No Tailwind, no CSS-in-JS. Global tokens and reusable classes live in `app/globals.css`.
- **Components: Base UI** (`@base-ui/react`) headless primitives, wrapped in
  `components/ui/*` with our own CSS. Few variants on purpose: Button primary|secondary|ghost|destructive, Badge default|accent|destructive. Add more only when a prototype needs it.
- Icons: `lucide-react`. Toasts: `sonner` (`toast("…")`). Theme: `next-themes` (`.dark` on `<html>`).

## Where things live

| Path                              | What                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`                 | Palette → semantic tokens → scales → reset → reusable classes (`.page`, `.stack`, `.row`, `.h1`, `.eyebrow`, `.prose`, `.panel`, `.placeholder`…) |
| `components/ui/`                  | Reusable components. Import from `@/components/ui` (barrel `index.ts`).                                                                           |
| `components/layout/`              | `PrototypeShell` (top bar + back link), `ThemeToggle`, `ThemeProvider`                                                                            |
| `app/(prototypes)/<slug>/`        | One prototype. `page.tsx` + `page.module.css`.                                                                                                    |
| `app/(prototypes)/_template/`     | Copied by `pnpm new`. Underscore = ignored by the router.                                                                                         |
| `app/(prototypes)/components/   ` | Every component on one page. Check it after changing colors.                                                                                      |
| `lib/prototypes.ts`               | Registry that feeds the home page list.                                                                                                           |
| `lib/mock.ts`                     | Fake data helpers: `people`, `sleep`, `uid`, `avatarUrl`, `timeAgo`…                                                                              |
| `hooks/use-local-state.ts`        | `useState` persisted to localStorage.                                                                                                             |

## Conventions

- New prototype: `pnpm new <slug> "Title"` → edit `app/(prototypes)/<slug>/page.tsx`.
- Colors: change the PALETTE block at the top of `globals.css`. Don't hardcode hex in components.
- Spacing/type/radius: use the `--space-*`, `--fs-*`, `--radius-*` tokens.
- Layout in a prototype: prefer the global classes (`.page`, `.stack`, `.row`, `.grid`) plus a
  small `page.module.css` for anything specific. Set gaps with `style={{ "--gap": "…" }}`.
- New shared component: `components/ui/Thing.tsx` + `Thing.module.css`, export from `index.ts`,
  drop an example into the kitchen sink.
- Base UI triggers take `render={<Button />}` instead of `asChild`.
- Prototypes are client components most of the time (`"use client"` at the top is fine).
- Keep it disposable: no tests, no abstractions until the same code is needed twice.

## Commands

```
pnpm dev          # http://localhost:3000
pnpm new x "X"    # scaffold a prototype
pnpm typecheck    # tsc
pnpm lint
pnpm build
```
