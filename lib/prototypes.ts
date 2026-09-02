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
