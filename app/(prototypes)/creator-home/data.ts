/**
 * Illustrative data for the creator home prototype. One persona:
 * self-managed mid-tier tech creator, ~400k subs, 6 deals with Agentio.
 *
 * "Today" is fixed at Wed 2 Sep 2026 so the screen never drifts.
 */

export const TODAY = "Wednesday, September 2";

/** What one sponsored slot on this channel typically clears. */
export const SLOT_VALUE = 7100;

export type SlotState = "open" | "in-play" | "sold" | "held";

export type Slot = {
  id: string;
  /** e.g. "Thu Sep 3" */
  date: string;
  /** Days from today until this video publishes. */
  inDays: number;
  title: string;
  state: SlotState;
  /** Right-hand detail line. Recomputed for slots the creator lists. */
  meta: string;
  /** Projected engaged views in the first 30 days. */
  v30: number;
  /** Shown in the listing dialog as the suggested ask. */
  ask: number;
  /** True when the title comes from cadence, not a planned upload. */
  projected?: boolean;
};

/** Six weeks of uploads, derived from a Tue/Thu publishing cadence. */
export const SLOTS: Slot[] = [
  {
    id: "s1",
    date: "Thu Sep 3",
    inDays: 1,
    title: "The Chrome extensions I actually use in 2026",
    state: "sold",
    meta: "Notion · $7,400 · read approved",
    v30: 380000,
    ask: 7400,
  },
  {
    id: "s2",
    date: "Tue Sep 8",
    inDays: 6,
    title: "I tried 7 note apps so you don't have to",
    state: "open",
    meta: "",
    v30: 340000,
    ask: 6800,
  },
  {
    id: "s3",
    date: "Thu Sep 10",
    inDays: 8,
    title: "Q&A: my desk setup, answered",
    state: "held",
    meta: "Keeping this one unsponsored",
    v30: 210000,
    ask: 0,
  },
  {
    id: "s4",
    date: "Tue Sep 15",
    inDays: 13,
    title: "Why I left VS Code",
    state: "sold",
    meta: "Linear · $7,100 · script due Sep 9",
    v30: 395000,
    ask: 7100,
  },
  {
    id: "s5",
    date: "Thu Sep 17",
    inDays: 15,
    title: "My entire workflow, rebuilt from scratch",
    state: "open",
    meta: "",
    v30: 412000,
    ask: 7400,
  },
  {
    id: "s6",
    date: "Tue Sep 22",
    inDays: 20,
    title: "The keyboard that fixed my wrists",
    state: "in-play",
    meta: "3 brands viewing · offer expected this week",
    v30: 355000,
    ask: 7100,
  },
  {
    id: "s7",
    date: "Thu Sep 24",
    inDays: 22,
    title: "5 automations that saved me 6 hours a week",
    state: "open",
    meta: "",
    v30: 368000,
    ask: 7100,
  },
  {
    id: "s8",
    date: "Tue Sep 29",
    inDays: 27,
    title: "Reviewing your setups #12",
    state: "open",
    meta: "",
    v30: 290000,
    ask: 6500,
  },
  {
    id: "s9",
    date: "Thu Oct 1",
    inDays: 29,
    title: "The best laptop for developers right now",
    state: "open",
    meta: "",
    v30: 430000,
    ask: 7600,
  },
  {
    id: "s10",
    date: "Tue Oct 6",
    inDays: 34,
    title: "How I plan a month of videos in 90 minutes",
    state: "open",
    meta: "",
    v30: 320000,
    ask: 6900,
  },
  {
    id: "s11",
    date: "Thu Oct 8",
    inDays: 36,
    title: "Untitled",
    state: "open",
    meta: "",
    v30: 330000,
    ask: 6900,
    projected: true,
  },
];

/** Week buckets, in order. Each lists the slot ids that fall in it. */
export const WEEKS: { label: string; slots: string[] }[] = [
  { label: "This week", slots: ["s1"] },
  { label: "Next week", slots: ["s2", "s3"] },
  { label: "Week of Sep 14", slots: ["s4", "s5"] },
  { label: "Week of Sep 21", slots: ["s6", "s7"] },
  { label: "Week of Sep 28", slots: ["s8", "s9"] },
  { label: "Week of Oct 5", slots: ["s10", "s11"] },
];

export const STATE_LABEL: Record<SlotState, string> = {
  open: "Open",
  "in-play": "In play",
  sold: "Sold",
  held: "Held",
};

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
