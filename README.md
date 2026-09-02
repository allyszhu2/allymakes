# allymakes

A playground for prototypes. Every idea is one route with a shared set of
components, so a new idea is a folder and a few minutes, not a new repo.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules ·
[Base UI](https://base-ui.com) primitives · Vercel.

## Run

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Node 22 is pinned in `.node-version` (`fnm use`).

## Start a new prototype

```bash
pnpm new my-idea "My idea"
```

That copies `app/(prototypes)/_template/` to `app/(prototypes)/my-idea/`,
registers it in `lib/prototypes.ts`, and it appears on the home page at
`/my-idea`. Edit `page.tsx` (and `page.module.css` for one-off styles).

## Change the look

Everything reads from `app/globals.css`:

1. **Palette** (top of the file) — paper, ink, brand, danger… light and dark.
   Change these first. `/components` shows every component so you can check.
2. **Tokens** — `--background`, `--primary`, `--border`… mapped from the palette.
3. **Scales** — type sizes, spacing, radius, shadows, motion.
4. **Reusable classes** — `.page`, `.stack`, `.row`, `.grid`, `.h1`, `.eyebrow`,
   `.lead`, `.small`, `.prose`, `.panel`, `.placeholder`, …

Fonts are loaded in `app/layout.tsx` with `next/font` (Geist by default).

## Components

`components/ui/` — each is `Thing.tsx` + `Thing.module.css`. Import from the barrel:

```tsx
import { Button, Card, Dialog, DialogTrigger, DialogContent } from "@/components/ui";
```

Available: Accordion, Alert, Avatar, Badge, Button, Card, Checkbox, Dialog,
Empty, Field, Input, Kbd, Label, Menu, Popover, Progress, RadioGroup,
Select, Separator, Sheet, Skeleton, Slider, Spinner, Switch,
Table, Tabs, Textarea, Toaster, Toggle/ToggleGroup, Tooltip.

Base UI triggers use `render` instead of `asChild`:

```tsx
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
```

Toasts: `import { toast } from "sonner"; toast.success("Saved")`.

Helpers: `lib/mock.ts` (fake people, avatars, `sleep`, `uid`, `timeAgo`) and
`hooks/use-local-state.ts` (state that survives refresh).

## Deploy (Vercel)

First time, from the repo root:

```bash
vercel
```

After that every push to `main` deploys automatically once the project is
linked (or run `vercel --prod`). No config needed; Next.js is auto-detected.

## Scripts

| Command                     | What                     |
| --------------------------- | ------------------------ |
| `pnpm dev`                  | Dev server               |
| `pnpm new <slug> "Title"`   | Scaffold a prototype     |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm typecheck`            | `tsc --noEmit`           |
| `pnpm lint`                 | ESLint                   |
| `pnpm format`               | Prettier                 |
