/**
 * Small helpers for faking data in prototypes. No dependencies.
 */

/** Wait `ms` — simulate a network call: `await sleep(600)`. */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Short unique id for list keys / optimistic items. */
export const uid = () => Math.random().toString(36).slice(2, 9);

/** Pick a random item. */
export const pick = <T>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Integer in [min, max]. */
export const between = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** A few people to populate lists, avatars, comments. */
export const people = [
  { id: "p1", name: "Maya Chen", handle: "maya", role: "Design" },
  { id: "p2", name: "Theo Okafor", handle: "theo", role: "Engineering" },
  { id: "p3", name: "Priya Raman", handle: "priya", role: "Product" },
  { id: "p4", name: "Luca Moretti", handle: "luca", role: "Marketing" },
  { id: "p5", name: "Sam Whitfield", handle: "sam", role: "Sales" },
  { id: "p6", name: "Noor Haddad", handle: "noor", role: "Support" },
] as const;

export type Person = (typeof people)[number];

/** Deterministic avatar URL for a person (see next.config.ts remotePatterns). */
export const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;

/** Placeholder photo. */
export const photoUrl = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

/** Initials for an avatar fallback: "Maya Chen" → "MC". */
export const initials = (name: string) =>
  name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Relative time, e.g. "3h ago". */
export function timeAgo(date: Date | string | number) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
