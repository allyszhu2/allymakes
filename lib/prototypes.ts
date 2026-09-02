/**
 * Registry of prototypes. Each entry is a folder under app/(prototypes)/<slug>
 * and shows up as a card on the home page. `pnpm new <slug> "Title"` appends
 * an entry here for you.
 */
export type Prototype = {
  slug: string;
  title: string;
  description?: string;
  /** ISO date, e.g. "2026-09-01". Used for sorting (newest first). */
  date: string;
  tags?: string[];
};

export const prototypes: Prototype[] = [
  {
    slug: "brand-brief",
    title: "Brand discovery — Brief",
    description:
      "Design 3. Rows are hypotheses, not categories; editing the brief re-renders them.",
    date: "2026-09-02",
    tags: ["agentio"],
  },
  {
    slug: "brand-slate",
    title: "Brand discovery — Slate",
    description:
      "Design 1. Eight filters, a grid with real prices, and a slate priced live.",
    date: "2026-09-02",
    tags: ["agentio"],
  },
  {
    slug: "brand-feed",
    title: "Brand discovery — Feed",
    description:
      "Design 2. One creator at a time, bounded deck, one batch commit at the end.",
    date: "2026-09-02",
    tags: ["agentio"],
  },
  {
    slug: "creator-home",
    title: "Creator home",
    description:
      "Agentio creator home, Active state. Five rows built from two row types.",
    date: "2026-09-02",
    tags: ["agentio"],
  },
  {
    slug: "components",
    title: "Components",
    description: "Every component, button, and color on one page.",
    date: "2026-09-01",
    tags: ["reference"],
  },
];

export const sortedPrototypes = [...prototypes].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
