/**
 * Illustrative data for the creator home prototype. Active state, one persona:
 * self-managed mid-tier tech creator, ~400k subs, 3 projects running, 3 bids in.
 *
 * "Today" is fixed at Wed 2 Sep 2026 so nothing drifts between demos.
 */

/* ------------------------------------------------------------------ brands */

/**
 * Brands are gradients, derived from the name so a brand is always the same
 * colour and the creator learns them by sight. Doubles as the production
 * fallback when a logo is missing. This is the one place colour escapes the
 * seven-token palette, and it carries identity, never data.
 */
export function brandGradient(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 52% 52%), hsl(${(h + 40) % 360} 46% 38%))`;
}

/* -------------------------------------------------------------------- bids */

export type Bid = {
  id: string;
  brand: string;
  /** The one number on the card. */
  rate: number;
  format: string;
  /** Hours left to respond, and the length of the full window it drains from. */
  hoursLeft: number;
  windowHours: number;
};

export const BIDS: Bid[] = [
  {
    id: "b1",
    brand: "Ramp",
    rate: 8200,
    format: "60s integration",
    hoursLeft: 5,
    windowHours: 72,
  },
  {
    id: "b2",
    brand: "Figma",
    rate: 7400,
    format: "90s integration",
    hoursLeft: 23,
    windowHours: 72,
  },
  {
    id: "b3",
    brand: "Retool",
    rate: 6900,
    format: "60s integration",
    hoursLeft: 47,
    windowHours: 72,
  },
];

/* --------------------------------------------------------------- in flight */

export const STAGES = ["briefed", "filming", "review", "scheduled", "live"] as const;

export type Project = {
  id: string;
  brand: string;
  title: string;
  /** Index into STAGES. */
  stage: number;
  /** The one line: what happens next and who is holding it. */
  line: string;
  /** Set when the creator is the one holding it up. */
  onYou?: boolean;
  /** Thumbnail seed. Absent before filming, where the brand gradient stands in. */
  thumb?: string;
  /** Daily views since publish; drawn on the thumbnail once live. */
  views?: number[];
  viewsTotal?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    brand: "Framer",
    title: "5 automations that saved me 6 hours a week",
    stage: 1,
    line: "Film by Sep 8",
    onYou: true,
  },
  {
    id: "p2",
    brand: "Linear",
    title: "Why I left VS Code",
    stage: 2,
    line: "In review since Sep 1 · waiting on Linear",
    thumb: "vscode-desk",
  },
  {
    id: "p3",
    brand: "Notion",
    title: "The Chrome extensions I actually use",
    stage: 4,
    line: "Live since Aug 28",
    thumb: "chrome-setup",
    views: [2, 9, 24, 47, 63, 71, 78, 88, 96, 104, 112, 121, 128],
    viewsTotal: "128k",
  },
];

/* ---------------------------------------------------------------- earnings */

export type Month = { label: string; amount: number; projected?: boolean };

/** Solid through August, dashed after — the shape answers "is money coming?" */
export const MONTHS: Month[] = [
  { label: "Jan", amount: 4200 },
  { label: "Feb", amount: 5100 },
  { label: "Mar", amount: 3800 },
  { label: "Apr", amount: 6400 },
  { label: "May", amount: 7200 },
  { label: "Jun", amount: 5900 },
  { label: "Jul", amount: 8100 },
  { label: "Aug", amount: 9400 },
  { label: "Sep", amount: 14200, projected: true },
  { label: "Oct", amount: 9000, projected: true },
  { label: "Nov", amount: 6500, projected: true },
];

/** Index of the last received month. Everything after it is scheduled. */
export const LAST_RECEIVED = 7;

export const RECEIVED_YTD = MONTHS.filter((m) => !m.projected).reduce(
  (sum, m) => sum + m.amount,
  0,
);

/* ----------------------------------------------------------------- next up */

export const MARKET = { low: 28, high: 41, median: 34 };
export const DEFAULT_CPM = 34;

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
