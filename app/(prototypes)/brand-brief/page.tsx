"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { InfoIcon, SearchIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import {
  CREATORS,
  DEFAULT_BRIEF,
  money,
  reachLabel,
  rowsFor,
  slateStats,
  slotPrice,
  type Brief,
  type Category,
  type Month,
} from "../_brand/data";
import {
  AvailabilityChip,
  BRAND_NAV,
  CreatorIdentity,
  CreatorMedia,
  PriceLine,
} from "../_brand/parts";
import styles from "./page.module.css";

const CATEGORIES: Category[] = [
  "Food",
  "Wellness",
  "Fitness",
  "Home",
  "Lifestyle",
  "Beauty",
];
const MONTHS: Month[] = ["Sep", "Oct", "Nov", "Dec"];

export default function BrandBrief() {
  const [brief, setBrief] = useState<Brief>(DEFAULT_BRIEF);
  const [search, setSearch] = useState("");
  const [allocated, setAllocated] = useState<Record<string, number>>({});

  const rows = useMemo(() => rowsFor(brief), [brief]);
  const reached = useMemo(
    () => new Set(rows.flatMap((r) => r.creators.map((c) => c.id))),
    [rows],
  );

  // The escape hatch. This design has no other answer for "get me this guy".
  const found = search.trim()
    ? CREATORS.filter((c) =>
        `${c.name} ${c.channel}`.toLowerCase().includes(search.trim().toLowerCase()),
      ).slice(0, 4)
    : [];

  const totalAllocated = Object.values(allocated).reduce((s, n) => s + n, 0);

  function allocate(rowId: string, amount: number, title: string, count: number) {
    setAllocated((a) => ({ ...a, [rowId]: amount }));
    toast.success(`${money(amount)} allocated`, {
      description: `${title} · ${count} creators. The engine allocates inside your set.`,
    });
  }

  return (
    <AppShell workspace={{ name: "Olipop" }} nav={BRAND_NAV} defaultActive="brief">
      <div className={styles.page}>
        {/* ------------------------------------------------------- the brief */}
        <section className={styles.brief}>
          <div className={styles.briefLead}>
            <h1 className={styles.goal}>{brief.goal}</h1>
            <p className={styles.briefSub}>
              {rows.length} strategies · {reached.size} of {CREATORS.length} creators
              reached
              {totalAllocated > 0 ? ` · ${money(totalAllocated)} allocated` : ""}
            </p>
          </div>

          <div className={styles.controls}>
            <label className={styles.control}>
              <span className={styles.controlLabel}>Budget</span>
              <span className={styles.numberInput}>
                <span aria-hidden="true">$</span>
                <input
                  type="number"
                  step={5000}
                  value={brief.budget}
                  onChange={(e) =>
                    setBrief((b) => ({ ...b, budget: Number(e.target.value) || 0 }))
                  }
                  aria-label="Budget in dollars"
                />
              </span>
            </label>

            <div className={styles.control}>
              <span className={styles.controlLabel}>Category</span>
              <Select
                items={CATEGORIES.map((c) => ({ value: c, label: c }))}
                value={brief.category}
                onValueChange={(v) =>
                  setBrief((b) => ({ ...b, category: String(v) as Category }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Drag this and the page reorganises around your economics. */}
            <label className={styles.control}>
              <span className={styles.controlLabel}>Target CPA ${brief.targetCpa}</span>
              <input
                type="range"
                min={18}
                max={44}
                value={brief.targetCpa}
                onChange={(e) =>
                  setBrief((b) => ({ ...b, targetCpa: Number(e.target.value) }))
                }
                className={styles.range}
                aria-label="Target cost per acquisition"
              />
            </label>

            <div className={styles.control}>
              <span className={styles.controlLabel}>Flight</span>
              <Select
                items={MONTHS.map((m) => ({ value: m, label: m }))}
                value={brief.month}
                onValueChange={(v) =>
                  setBrief((b) => ({ ...b, month: String(v) as Month }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={styles.searchBox}>
              <SearchIcon size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Or find a creator by name"
                aria-label="Find a creator by name"
              />
            </div>
          </div>

          {found.length > 0 ? (
            <ul className={styles.found}>
              {found.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.foundRow}
                    onClick={() =>
                      toast(`${c.name} — profile not built in this prototype`)
                    }
                  >
                    <span className={styles.foundName}>{c.name}</span>
                    <span className={styles.foundChannel}>{c.channel}</span>
                    <span className={styles.foundPrice}>
                      ${c.cpm} CPM · {money(slotPrice(c))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* --------------------------------------- the rows are the reduction */}
        {rows.map(({ row, creators }) => {
          const stats = slateStats(creators);
          const share = Math.round(brief.budget / Math.max(rows.length, 1) / 1000) * 1000;
          return (
            <section key={row.id} className={styles.row}>
              <div className={styles.rowHead}>
                <div className={styles.rowLead}>
                  <h2 className={styles.rowTitle}>
                    {row.title(brief)}
                    {row.thin ? (
                      <Tooltip>
                        <TooltipTrigger
                          render={<span className={styles.thinFlag} tabIndex={0} />}
                        >
                          <InfoIcon size={13} />
                        </TooltipTrigger>
                        <TooltipContent>{row.thin}</TooltipContent>
                      </Tooltip>
                    ) : null}
                  </h2>
                  <p className={styles.rowRationale}>{row.rationale}</p>
                </div>
                <div className={styles.rowStats}>
                  <span className={styles.rowProjection}>
                    {creators.length} creators · {reachLabel(stats.reach)} views · $
                    {stats.cpa.toFixed(0)} CPA
                  </span>
                  <Button
                    size="sm"
                    variant={allocated[row.id] ? "secondary" : "primary"}
                    onClick={() =>
                      allocate(row.id, share, row.title(brief), creators.length)
                    }
                  >
                    {allocated[row.id]
                      ? `${money(allocated[row.id])} allocated`
                      : `Allocate ${money(share)}`}
                  </Button>
                </div>
              </div>

              <div className={styles.strip}>
                {creators.map((c) => (
                  <article key={c.id} className={styles.card}>
                    <CreatorMedia creator={c} sizes="160px" />
                    <div className={styles.cardBody}>
                      <CreatorIdentity creator={c} />
                      <PriceLine creator={c} />
                      <AvailabilityChip creator={c} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {rows.length === 0 ? (
          <p className={styles.noRows}>
            No strategy clears a ${brief.targetCpa} CPA in {brief.category}. Raise the
            target or widen the category — that is the honest answer, not a row of popular
            creators.
          </p>
        ) : null}

        <p className={styles.footnote}>
          Illustrative data. Rows are computed from the brief, so every control above
          re-renders which strategies exist and who is in them.
        </p>
      </div>
    </AppShell>
  );
}
