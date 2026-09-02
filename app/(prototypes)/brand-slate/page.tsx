"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BookmarkIcon, CheckIcon, SearchIcon, XIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from "@/components/ui";
import {
  CREATORS,
  DEFAULT_BRIEF,
  money,
  rationaleFor,
  reachLabel,
  slateStats,
  slotPrice,
  type Category,
  type Creator,
  type Month,
} from "../_brand/data";
import {
  AvailabilityChip,
  BRAND_NAV,
  CreatorIdentity,
  CreatorMedia,
  OutcomeLine,
  PriceLine,
} from "../_brand/parts";
import styles from "./page.module.css";

/* Exactly eight filters. A thirty-field panel is a tell that a product has
   nothing better than demographics. */
type Filters = {
  category: string;
  geo: string;
  cpmMax: number;
  month: string;
  convertedOnly: boolean;
  noCompetitor: boolean;
  safety: string;
  format: string;
};

const INITIAL: Filters = {
  category: "any",
  geo: "any",
  cpmMax: 60,
  month: "any",
  convertedOnly: false,
  noCompetitor: false,
  safety: "any",
  format: "any",
};

const opts = (values: string[]) => values.map((v) => ({ value: v, label: v }));
const CATEGORIES = ["any", "Food", "Wellness", "Fitness", "Home", "Lifestyle", "Beauty"];
const GEOS = ["any", "US", "UK", "CA", "AU"];
const MONTHS = ["any", "Sep", "Oct", "Nov", "Dec"];

/**
 * The natural-language box writes the filters and says what it set, so the
 * interpretation is legible and correctable rather than magic.
 */
function parseQuery(q: string): { patch: Partial<Filters>; set: string[] } {
  const s = q.toLowerCase();
  const patch: Partial<Filters> = {};
  const set: string[] = [];

  for (const c of CATEGORIES.slice(1)) {
    if (s.includes(c.toLowerCase())) {
      patch.category = c;
      set.push(`category is ${c}`);
      break;
    }
  }
  const cpm = s.match(/\$?(\d{2})\s*(?:cpm|or less|max)?/);
  if (cpm && (s.includes("cpm") || s.includes("under") || s.includes("below"))) {
    patch.cpmMax = Number(cpm[1]);
    set.push(`CPM up to $${cpm[1]}`);
  }
  for (const m of MONTHS.slice(1)) {
    if (s.includes(m.toLowerCase())) {
      patch.month = m;
      set.push(`open slots in ${m}`);
      break;
    }
  }
  if (s.includes("convert")) {
    patch.convertedOnly = true;
    set.push("has converted in category");
  }
  if (s.includes("competitor")) {
    patch.noCompetitor = true;
    set.push("no competitor run in 90 days");
  }
  if (s.includes("short")) {
    patch.format = "shorts";
    set.push("Shorts only");
  }
  for (const g of GEOS.slice(1)) {
    if (new RegExp(`\\b${g.toLowerCase()}\\b`).test(s)) {
      patch.geo = g;
      set.push(`audience in ${g}`);
      break;
    }
  }
  return { patch, set };
}

export default function BrandSlate() {
  const [filters, setFilters] = useState<Filters>(INITIAL);
  const [query, setQuery] = useState("");
  const [interpreted, setInterpreted] = useState<string[]>([]);
  const [slate, setSlate] = useState<Creator[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [converting, setConverting] = useState(false);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    setFilters((f) => ({ ...f, [k]: v }));

  const results = useMemo(
    () =>
      CREATORS.filter((c) => {
        if (filters.category !== "any" && c.category !== filters.category) return false;
        if (filters.geo !== "any" && c.geo !== filters.geo) return false;
        if (c.cpm > filters.cpmMax) return false;
        if (filters.month !== "any" && !(c.slots > 0 && c.month === filters.month))
          return false;
        if (filters.convertedOnly && !c.converted.includes(DEFAULT_BRIEF.category))
          return false;
        if (filters.noCompetitor && c.competitorRan) return false;
        if (filters.safety !== "any" && c.safety !== filters.safety) return false;
        if (filters.format !== "any" && c.format !== filters.format) return false;
        return true;
      }),
    [filters],
  );

  const stats = slateStats(slate);
  const inSlate = (id: string) => slate.some((c) => c.id === id);

  function toggleSave(c: Creator) {
    setSlate((prev) =>
      prev.some((x) => x.id === c.id) ? prev.filter((x) => x.id !== c.id) : [...prev, c],
    );
    setReasons((prev) =>
      prev[c.id] ? prev : { ...prev, [c.id]: rationaleFor(c, DEFAULT_BRIEF) },
    );
  }

  function runQuery() {
    const { patch, set: labels } = parseQuery(query);
    if (!labels.length) {
      toast("Couldn't read that — try “Food creators under $35 CPM with October slots”");
      return;
    }
    setFilters((f) => ({ ...f, ...patch }));
    setInterpreted(labels);
  }

  // The delta, on the record: what curation costs against unconstrained allocation.
  const unconstrainedCpa = 26.4;
  const delta = stats.cpa - unconstrainedCpa;

  return (
    <AppShell workspace={{ name: "Olipop" }} nav={BRAND_NAV} defaultActive="browse">
      <div className={styles.layout}>
        {/* ---------------- Left rail: the natural-language box + 8 filters */}
        <aside className={styles.filters}>
          <div className={styles.nlBox}>
            <SearchIcon size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runQuery()}
              placeholder="Food creators under $35 CPM with October slots"
              aria-label="Describe what you're looking for"
            />
          </div>
          {interpreted.length > 0 ? (
            <div className={styles.interpreted}>
              <span className={styles.interpretedLabel}>Set for you</span>
              <div className={styles.chips}>
                {interpreted.map((label) => (
                  <span key={label} className={styles.setChip}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.filterList}>
            <Field label="Category">
              <Select
                items={opts(CATEGORIES)}
                value={filters.category}
                onValueChange={(v) => set("category", String(v) as Category | "any")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opts(CATEGORIES).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Audience geo">
              <Select
                items={opts(GEOS)}
                value={filters.geo}
                onValueChange={(v) => set("geo", String(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opts(GEOS).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label={`Effective CPM up to $${filters.cpmMax}`}>
              <Slider
                value={filters.cpmMax}
                min={18}
                max={60}
                onValueChange={(v) => set("cpmMax", Number(v))}
              />
            </Field>

            <Field label="Open slots in">
              <Select
                items={opts(MONTHS)}
                value={filters.month}
                onValueChange={(v) => set("month", String(v) as Month | "any")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opts(MONTHS).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Label className={styles.check}>
              <Checkbox
                checked={filters.convertedOnly}
                onCheckedChange={(v) => set("convertedOnly", Boolean(v))}
              />
              Has converted in {DEFAULT_BRIEF.category}
            </Label>

            <Label className={styles.check}>
              <Checkbox
                checked={filters.noCompetitor}
                onCheckedChange={(v) => set("noCompetitor", Boolean(v))}
              />
              No competitor run in 90 days
            </Label>

            <Field label="Brand-safety tier">
              <Select
                items={opts(["any", "A", "B"])}
                value={filters.safety}
                onValueChange={(v) => set("safety", String(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opts(["any", "A", "B"]).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Format">
              <Select
                items={[
                  { value: "any", label: "any" },
                  { value: "long", label: "Long-form" },
                  { value: "shorts", label: "Shorts" },
                ]}
                value={filters.format}
                onValueChange={(v) => set("format", String(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">any</SelectItem>
                  <SelectItem value="long">Long-form</SelectItem>
                  <SelectItem value="shorts">Shorts</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setFilters(INITIAL);
              setInterpreted([]);
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </aside>

        {/* ---------------------------------------------- Centre: the grid */}
        <main className={styles.results}>
          <p className={styles.count}>
            <strong>{results.length}</strong> of {CREATORS.length} creators · every one
            verified, priced, and bookable
          </p>

          <div className={styles.grid}>
            {results.map((c) => (
              <article key={c.id} className={styles.card}>
                <CreatorMedia creator={c} sizes="200px">
                  <button
                    type="button"
                    className={`${styles.save} ${inSlate(c.id) ? styles.saved : ""}`}
                    onClick={() => toggleSave(c)}
                    aria-pressed={inSlate(c.id)}
                    aria-label={inSlate(c.id) ? `Remove ${c.name}` : `Save ${c.name}`}
                  >
                    {inSlate(c.id) ? <CheckIcon size={14} /> : <BookmarkIcon size={14} />}
                  </button>
                </CreatorMedia>
                <div className={styles.cardBody}>
                  <CreatorIdentity creator={c} />
                  <PriceLine creator={c} />
                  <div className={styles.cardMeta}>
                    <AvailabilityChip creator={c} />
                    <span className={styles.reach}>{reachLabel(c.reach)} views</span>
                  </div>
                  <OutcomeLine creator={c} />
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 ? (
            <p className={styles.empty}>
              Nothing matches. Widen the CPM range or clear the availability window.
            </p>
          ) : null}
        </main>

        {/* -------------------------- Right rail: the slate, priced live */}
        <aside className={styles.slate}>
          <div className={styles.slateHead}>
            <h2 className={styles.slateTitle}>Q4 acquisition slate</h2>
            <span className={styles.slateCount}>{stats.count}</span>
          </div>

          {stats.count === 0 ? (
            <p className={styles.slateEmpty}>
              Save creators and this becomes a media plan — priced, blended, and
              convertible to a campaign pool.
            </p>
          ) : (
            <>
              <dl className={styles.stats}>
                <div>
                  <dt>Total cost</dt>
                  <dd>{money(stats.cost)}</dd>
                </div>
                <div>
                  <dt>Blended CPM</dt>
                  <dd>${stats.blendedCpm.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Projected views</dt>
                  <dd>{reachLabel(stats.reach)}</dd>
                </div>
                <div>
                  <dt>Est. CPA</dt>
                  <dd>
                    ${stats.cpaLow.toFixed(0)}–{stats.cpaHigh.toFixed(0)}
                  </dd>
                </div>
              </dl>

              <ul className={styles.slateList}>
                {slate.map((c) => (
                  <li key={c.id} className={styles.slateItem}>
                    <div className={styles.slateItemHead}>
                      <span className={styles.slateName}>{c.name}</span>
                      <span className={styles.slatePrice}>{money(slotPrice(c))}</span>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => toggleSave(c)}
                        aria-label={`Remove ${c.name}`}
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                    {/* Rationale is a first-class field: drafted, then edited. */}
                    <input
                      className={styles.reason}
                      value={reasons[c.id] ?? ""}
                      onChange={(e) =>
                        setReasons((r) => ({ ...r, [c.id]: e.target.value }))
                      }
                      aria-label={`Why ${c.name} is on the slate`}
                    />
                  </li>
                ))}
              </ul>

              <div className={styles.slateActions}>
                <Button variant="primary" onClick={() => setConverting(true)}>
                  Convert to pool
                </Button>
                <Button onClick={() => toast("Slate shared with 2 reviewers")}>
                  Share
                </Button>
              </div>
              <p className={styles.stale}>
                Prices and availability are live. Reopen this slate in three weeks and it
                will show what moved.
              </p>
            </>
          )}
        </aside>
      </div>

      {/* The delta, on the record. Overruling is allowed, and visible. */}
      <Dialog open={converting} onOpenChange={setConverting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert slate to a campaign pool</DialogTitle>
            <DialogDescription>
              You choose who is acceptable. The engine allocates inside your set.
            </DialogDescription>
          </DialogHeader>

          <div className={styles.deltaBox}>
            <div>
              <span className={styles.deltaLabel}>Your curated pool</span>
              <span className={styles.deltaValue}>${stats.cpa.toFixed(2)} CPA</span>
              <span className={styles.deltaSub}>
                {stats.count} creators · {money(stats.cost)}
              </span>
            </div>
            <div>
              <span className={styles.deltaLabel}>Unconstrained allocation</span>
              <span className={styles.deltaValue}>
                ${unconstrainedCpa.toFixed(2)} CPA
              </span>
              <span className={styles.deltaSub}>same budget, all 24 eligible</span>
            </div>
          </div>
          <p className={styles.deltaNote}>
            {delta > 0
              ? `Curating costs about $${delta.toFixed(2)} more per acquisition. Worth it if the constraint is real — brand safety, exclusivity, a client's list.`
              : `Your pool projects below unconstrained allocation. Curation is paying for itself here.`}
          </p>

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button
              variant="primary"
              onClick={() => {
                setConverting(false);
                toast.success("Pool created", {
                  description: `${stats.count} creators · ${money(stats.cost)} allocated. Overrule recorded.`,
                });
              }}
            >
              Allocate {money(stats.cost)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
    </div>
  );
}
