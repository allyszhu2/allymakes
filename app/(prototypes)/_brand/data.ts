/**
 * Shared index for the three brand-side discovery prototypes.
 *
 * All three render the same five primitives no incumbent has — a real price,
 * availability, an outcome, a verified channel, and a one-click exit — so the
 * card parts and this data live in one place. `_brand` is a private folder,
 * so it never becomes a route.
 *
 * Illustrative data throughout.
 */

export type Category = "Food" | "Wellness" | "Fitness" | "Home" | "Lifestyle" | "Beauty";
export type Month = "Sep" | "Oct" | "Nov" | "Dec";

export type Creator = {
  id: string;
  name: string;
  channel: string;
  category: Category;
  /** Subscribers, in thousands. */
  subs: number;
  /** Effective CPM in dollars — the real clearing price, not an estimate. */
  cpm: number;
  /** Projected engaged views per slot, in thousands. */
  reach: number;
  /** Projected cost per acquisition in dollars. */
  cpa: number;
  /** Open sponsor slots in the next quarter. */
  slots: number;
  /** First month with an open slot. */
  month: Month;
  /** The one outcome line on the card. */
  outcome: string;
  /** Categories this creator has actually converted in. */
  converted: Category[];
  competitorRan: boolean;
  /** Percent audience overlap with the brand's best-performing ad set. */
  overlap: number;
  /** Ran with us before. */
  repeat: boolean;
  format: "long" | "shorts";
  safety: "A" | "B";
  geo: "US" | "UK" | "CA" | "AU";
  thumb: string;
};

/** Price per slot follows from CPM × reach, so blended maths stays honest. */
export const slotPrice = (c: Creator) => Math.round(c.cpm * c.reach);

export const CREATORS: Creator[] = [
  // prettier-ignore
  { id: "c1", name: "Maya Chen", channel: "Tidy Kitchen", category: "Food", subs: 412, cpm: 34, reach: 220, cpa: 28, slots: 3, month: "Oct", outcome: "$28 CPA for Chomps", converted: ["Food"], competitorRan: true, overlap: 71, repeat: false, format: "long", safety: "A", geo: "US", thumb: "kitchen-counter" },
  // prettier-ignore
  { id: "c2", name: "Theo Okafor", channel: "Lift Notes", category: "Fitness", subs: 880, cpm: 41, reach: 460, cpa: 35, slots: 1, month: "Nov", outcome: "$35 CPA for Hydrow", converted: ["Fitness"], competitorRan: false, overlap: 44, repeat: false, format: "long", safety: "A", geo: "US", thumb: "gym-rack" },
  // prettier-ignore
  { id: "c3", name: "Priya Raman", channel: "Slow Mornings", category: "Wellness", subs: 265, cpm: 29, reach: 140, cpa: 24, slots: 2, month: "Oct", outcome: "$24 CPA for Ritual", converted: ["Wellness", "Food"], competitorRan: true, overlap: 66, repeat: true, format: "long", safety: "A", geo: "US", thumb: "morning-light" },
  // prettier-ignore
  { id: "c4", name: "Luca Moretti", channel: "Pantry Raid", category: "Food", subs: 1200, cpm: 47, reach: 640, cpa: 38, slots: 1, month: "Dec", outcome: "$38 CPA for Graza", converted: ["Food"], competitorRan: true, overlap: 58, repeat: false, format: "long", safety: "A", geo: "US", thumb: "pantry-shelf" },
  // prettier-ignore
  { id: "c5", name: "Noor Haddad", channel: "Desk & Din", category: "Lifestyle", subs: 190, cpm: 26, reach: 95, cpa: 22, slots: 4, month: "Oct", outcome: "$22 CPA for Caraway", converted: ["Home", "Lifestyle"], competitorRan: false, overlap: 51, repeat: false, format: "long", safety: "A", geo: "UK", thumb: "desk-plants" },
  // prettier-ignore
  { id: "c6", name: "Sam Whitfield", channel: "Runner's Log", category: "Fitness", subs: 540, cpm: 33, reach: 280, cpa: 31, slots: 2, month: "Oct", outcome: "$31 CPA for Hydrow", converted: ["Fitness"], competitorRan: false, overlap: 63, repeat: true, format: "long", safety: "A", geo: "US", thumb: "trail-run" },
  // prettier-ignore
  { id: "c7", name: "Elena Vasquez", channel: "Counter Space", category: "Home", subs: 330, cpm: 31, reach: 170, cpa: 27, slots: 0, month: "Dec", outcome: "$27 CPA for Our Place", converted: ["Home"], competitorRan: false, overlap: 47, repeat: false, format: "long", safety: "A", geo: "US", thumb: "counter-tiles" },
  // prettier-ignore
  { id: "c8", name: "Jonah Park", channel: "Cheap Eats Weekly", category: "Food", subs: 720, cpm: 28, reach: 390, cpa: 21, slots: 3, month: "Oct", outcome: "$21 CPA for Fly By Jing", converted: ["Food"], competitorRan: true, overlap: 74, repeat: false, format: "long", safety: "A", geo: "US", thumb: "street-food" },
  // prettier-ignore
  { id: "c9", name: "Aisha Bello", channel: "The Reset", category: "Wellness", subs: 155, cpm: 24, reach: 78, cpa: 26, slots: 5, month: "Sep", outcome: "$26 CPA for AG1", converted: ["Wellness"], competitorRan: false, overlap: 39, repeat: false, format: "shorts", safety: "A", geo: "UK", thumb: "yoga-mat" },
  // prettier-ignore
  { id: "c10", name: "Marco Silva", channel: "Grill Theory", category: "Food", subs: 960, cpm: 44, reach: 510, cpa: 40, slots: 1, month: "Nov", outcome: "$40 CPA for Graza", converted: ["Food"], competitorRan: true, overlap: 55, repeat: false, format: "long", safety: "B", geo: "US", thumb: "grill-smoke" },
  // prettier-ignore
  { id: "c11", name: "Hana Kimura", channel: "Small Apartment", category: "Home", subs: 280, cpm: 27, reach: 145, cpa: 25, slots: 2, month: "Oct", outcome: "$25 CPA for Caraway", converted: ["Home"], competitorRan: false, overlap: 42, repeat: false, format: "long", safety: "A", geo: "CA", thumb: "small-flat" },
  // prettier-ignore
  { id: "c12", name: "Dev Patel", channel: "Macro Math", category: "Fitness", subs: 610, cpm: 36, reach: 320, cpa: 29, slots: 2, month: "Oct", outcome: "$29 CPA for Chomps", converted: ["Fitness", "Food"], competitorRan: false, overlap: 68, repeat: true, format: "long", safety: "A", geo: "US", thumb: "meal-prep" },
  // prettier-ignore
  { id: "c13", name: "Ruby Castellanos", channel: "Sunday Prep", category: "Food", subs: 205, cpm: 25, reach: 105, cpa: 19, slots: 4, month: "Sep", outcome: "$19 CPA for Chomps", converted: ["Food"], competitorRan: false, overlap: 61, repeat: false, format: "shorts", safety: "A", geo: "US", thumb: "prep-bowls" },
  // prettier-ignore
  { id: "c14", name: "Otis Brandt", channel: "Cold Plunge Club", category: "Wellness", subs: 445, cpm: 38, reach: 230, cpa: 33, slots: 1, month: "Nov", outcome: "$33 CPA for AG1", converted: ["Wellness"], competitorRan: true, overlap: 49, repeat: false, format: "long", safety: "B", geo: "US", thumb: "cold-water" },
  // prettier-ignore
  { id: "c15", name: "Wren Halloway", channel: "Two Pots", category: "Food", subs: 128, cpm: 22, reach: 62, cpa: 18, slots: 6, month: "Sep", outcome: "No run in beverage yet", converted: [], competitorRan: false, overlap: 57, repeat: false, format: "shorts", safety: "A", geo: "AU", thumb: "two-pots" },
  // prettier-ignore
  { id: "c16", name: "Kofi Mensah", channel: "Move Daily", category: "Fitness", subs: 1500, cpm: 52, reach: 780, cpa: 44, slots: 1, month: "Dec", outcome: "$44 CPA for Hydrow", converted: ["Fitness"], competitorRan: false, overlap: 40, repeat: false, format: "long", safety: "A", geo: "US", thumb: "city-run" },
  // prettier-ignore
  { id: "c17", name: "Ingrid Solberg", channel: "Nordic Table", category: "Food", subs: 390, cpm: 30, reach: 200, cpa: 26, slots: 3, month: "Oct", outcome: "$26 CPA for Graza", converted: ["Food"], competitorRan: false, overlap: 64, repeat: false, format: "long", safety: "A", geo: "UK", thumb: "nordic-table" },
  // prettier-ignore
  { id: "c18", name: "Tomás Rivera", channel: "Late Shift Meals", category: "Food", subs: 88, cpm: 19, reach: 44, cpa: 17, slots: 6, month: "Sep", outcome: "No run in beverage yet", converted: [], competitorRan: false, overlap: 53, repeat: false, format: "shorts", safety: "A", geo: "US", thumb: "night-kitchen" },
  // prettier-ignore
  { id: "c19", name: "Sofia Lindqvist", channel: "Skin Deep", category: "Beauty", subs: 510, cpm: 37, reach: 260, cpa: 34, slots: 2, month: "Nov", outcome: "$34 CPA for Ritual", converted: ["Beauty", "Wellness"], competitorRan: false, overlap: 35, repeat: false, format: "long", safety: "A", geo: "US", thumb: "bathroom-shelf" },
  // prettier-ignore
  { id: "c20", name: "Amir Nasser", channel: "Budget Wellness", category: "Wellness", subs: 240, cpm: 23, reach: 120, cpa: 20, slots: 4, month: "Oct", outcome: "$20 CPA for AG1", converted: ["Wellness"], competitorRan: false, overlap: 59, repeat: false, format: "shorts", safety: "A", geo: "CA", thumb: "supplements" },
  // prettier-ignore
  { id: "c21", name: "Chloe Duarte", channel: "Fridge Tour", category: "Food", subs: 670, cpm: 35, reach: 350, cpa: 30, slots: 2, month: "Oct", outcome: "$30 CPA for Fly By Jing", converted: ["Food"], competitorRan: true, overlap: 77, repeat: true, format: "long", safety: "A", geo: "US", thumb: "open-fridge" },
  // prettier-ignore
  { id: "c22", name: "Rowan Ellis", channel: "Trail Fuel", category: "Fitness", subs: 315, cpm: 28, reach: 165, cpa: 23, slots: 3, month: "Oct", outcome: "$23 CPA for Chomps", converted: ["Fitness", "Food"], competitorRan: false, overlap: 62, repeat: false, format: "long", safety: "A", geo: "AU", thumb: "trail-snacks" },
  // prettier-ignore
  { id: "c23", name: "Yuki Tanaka", channel: "One Pan", category: "Food", subs: 1100, cpm: 49, reach: 590, cpa: 41, slots: 1, month: "Dec", outcome: "$41 CPA for Our Place", converted: ["Food"], competitorRan: false, overlap: 46, repeat: false, format: "long", safety: "A", geo: "US", thumb: "one-pan" },
  // prettier-ignore
  { id: "c24", name: "Zara Okonkwo", channel: "Morning Person", category: "Lifestyle", subs: 425, cpm: 32, reach: 215, cpa: 27, slots: 3, month: "Oct", outcome: "$27 CPA for Ritual", converted: ["Lifestyle", "Wellness"], competitorRan: false, overlap: 69, repeat: false, format: "long", safety: "A", geo: "US", thumb: "morning-coffee" },
];

export const MEDIAN_CPM = 32;

/* ------------------------------------------------------------------- brief */

export type Brief = {
  goal: string;
  budget: number;
  category: Category;
  targetCpa: number;
  month: Month;
};

export const DEFAULT_BRIEF: Brief = {
  goal: "New customer acquisition",
  budget: 120000,
  category: "Food",
  targetCpa: 32,
  month: "Oct",
};

/* -------------------------------------------------------------------- rows */

export type RowDef = {
  id: string;
  title: (b: Brief) => string;
  rationale: string;
  /** Set when the row's data is thin and has to say so. */
  thin?: string;
  /** A swing row is deliberately exempt from the target-CPA ceiling. */
  ignoresCpa?: boolean;
  match: (c: Creator, b: Brief) => boolean;
};

export const ROWS: RowDef[] = [
  {
    id: "proof",
    title: (b) => `Converted for other ${b.category} brands`,
    rationale: "Ran a sponsored read in your category and drove purchases.",
    match: (c, b) => c.converted.includes(b.category),
  },
  {
    id: "competitive",
    title: () => "Your competitors ran here last quarter",
    rationale: "Bought by a brand you compete with in the last 90 days.",
    match: (c) => c.competitorRan,
  },
  {
    id: "overlap",
    title: () => "Audience overlaps your best-performing Meta ad set",
    rationale: "Matched against the audience your paid social already converts.",
    match: (c) => c.overlap >= 60,
  },
  {
    id: "availability",
    title: (b) => `Open inventory in ${b.month}`,
    rationale: "Slots the creator has actually declared, not an estimate.",
    match: (c, b) => c.slots > 0 && c.month === b.month,
  },
  {
    id: "value",
    title: () => "Below category median CPM, untested in your category",
    rationale:
      "Cheaper than the median clearing price, with no run in your category yet.",
    thin: "No outcome data in your category for these — projections come from category peers.",
    match: (c, b) => c.cpm < MEDIAN_CPM && !c.converted.includes(b.category),
  },
  {
    id: "roster",
    title: () => "Repeat performers from your last campaign",
    rationale: "You have run with these creators before and they delivered.",
    match: (c) => c.repeat,
  },
  {
    id: "swing",
    title: () => "Bigger swing: higher CPM, much higher reach",
    rationale: "Above your target CPA on purpose — bought for reach, not efficiency.",
    ignoresCpa: true,
    match: (c) => c.cpm >= 44 && c.reach >= 450,
  },
  {
    id: "shorts",
    title: () => "Shorts-only, cheap tests",
    rationale:
      "Small slots you can run several of before committing to a long-form read.",
    match: (c) => c.format === "shorts" && slotPrice(c) < 4000,
  },
];

/** Rows are computed from the brief, so editing the brief re-renders them. */
export function rowsFor(brief: Brief) {
  return ROWS.map((row) => ({
    row,
    creators: CREATORS.filter(
      (c) => row.match(c, brief) && (row.ignoresCpa || c.cpa <= brief.targetCpa),
    ),
  })).filter((r) => r.creators.length > 0);
}

/* ------------------------------------------------------------------- slate */

export function slateStats(list: Creator[]) {
  const cost = list.reduce((s, c) => s + slotPrice(c), 0);
  const reach = list.reduce((s, c) => s + c.reach, 0);
  const blendedCpm = reach ? cost / reach : 0;
  const cpa = list.length ? list.reduce((s, c) => s + c.cpa, 0) / list.length : 0;
  return {
    count: list.length,
    cost,
    reach,
    blendedCpm,
    cpaLow: cpa * 0.85,
    cpaHigh: cpa * 1.15,
    cpa,
  };
}

/**
 * The one-line reason that makes a slate presentable. Auto-drafted here and
 * editable by the human — automating the rationale, not the sourcing.
 */
export function rationaleFor(c: Creator, brief: Brief) {
  if (c.repeat) return `Ran for you before — ${c.outcome}.`;
  if (c.converted.includes(brief.category))
    return `Converted in your category — ${c.outcome}.`;
  if (c.overlap >= 60) return `Audience overlaps your best ad set by ${c.overlap}%.`;
  if (c.cpm < MEDIAN_CPM)
    return `$${c.cpm} CPM, below the $${MEDIAN_CPM} category median.`;
  return `${c.slots} open ${c.slots === 1 ? "slot" : "slots"} in ${c.month}.`;
}

/* ----------------------------------------------------------------- helpers */

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const subsLabel = (k: number) =>
  k >= 1000 ? `${(k / 1000).toFixed(1)}M` : `${k}k`;

export const reachLabel = (k: number) =>
  k >= 1000 ? `${(k / 1000).toFixed(1)}M` : `${Math.round(k)}k`;

/** Deterministic gradient per channel, so a creator keeps the same colour. */
export function channelGradient(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 52% 52%), hsl(${(h + 40) % 360} 46% 38%))`;
}
