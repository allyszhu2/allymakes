"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckIcon, RotateCcwIcon, XIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button, Kbd } from "@/components/ui";
import {
  CREATORS,
  DEFAULT_BRIEF,
  money,
  rationaleFor,
  reachLabel,
  slateStats,
  slotPrice,
  subsLabel,
  type Creator,
} from "../_brand/data";
import { AvailabilityChip, BRAND_NAV, CreatorMedia } from "../_brand/parts";
import styles from "./page.module.css";

/** A bounded deck. The worst property of an infinite feed for a professional
    buyer is not knowing what they haven't seen. */
const DECK: Creator[] = CREATORS.filter((c) => c.slots > 0 && c.cpa <= 34).slice(0, 12);

export default function BrandFeed() {
  const [index, setIndex] = useState(0);
  const [added, setAdded] = useState<Creator[]>([]);
  const [passed, setPassed] = useState<Creator[]>([]);
  const [committed, setCommitted] = useState(false);

  const current = DECK[index];
  const stats = slateStats(added);
  const budget = DEFAULT_BRIEF.budget;
  const spentPct = Math.min(100, (stats.cost / budget) * 100);
  const over = stats.cost > budget;
  const done = index >= DECK.length;

  // Every updater here is pure — nesting the adds inside setIndex's updater
  // made React's double-invoke count each gesture twice.
  const decide = useCallback(
    (keep: boolean) => {
      const creator = DECK[index];
      if (!creator) return;
      if (keep) setAdded((prev) => [...prev, creator]);
      else setPassed((prev) => [...prev, creator]);
      setIndex((i) => i + 1);
    },
    [index],
  );

  // Arrow keys, because the whole point of this surface is throughput.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === "ArrowRight") decide(true);
      if (e.key === "ArrowLeft") decide(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [decide, done]);

  function restart() {
    setIndex(0);
    setAdded([]);
    setPassed([]);
    setCommitted(false);
  }

  return (
    <AppShell workspace={{ name: "Olipop" }} nav={BRAND_NAV} defaultActive="fastfill">
      <div className={styles.page}>
        {/* Persistent budget meter. The gesture never spends; this shows what
            a commit would cost if you made one now. */}
        <header className={styles.meter}>
          <div className={styles.meterText}>
            <span>
              <strong>{money(stats.cost)}</strong> of {money(budget)} if you commit
            </span>
            <span className={styles.counter}>
              {Math.min(index + 1, DECK.length)} of {DECK.length} · {added.length} added
            </span>
          </div>
          <div className={styles.meterTrack}>
            <div
              className={`${styles.meterFill} ${over ? styles.meterOver : ""}`}
              style={{ width: `${spentPct}%` }}
            />
          </div>
        </header>

        {!done ? (
          <div className={styles.stage}>
            <article className={styles.card} key={current.id}>
              <CreatorMedia creator={current} sizes="340px">
                <div className={styles.overlay}>
                  <div className={styles.overlayTop}>
                    <AvailabilityChip creator={current} />
                  </div>
                  <div className={styles.overlayBottom}>
                    <h2 className={styles.name}>{current.name}</h2>
                    <p className={styles.sub}>
                      {current.channel} · {subsLabel(current.subs)} ·{" "}
                      {reachLabel(current.reach)} engaged views
                    </p>
                    <p className={styles.price}>
                      <span className={styles.priceBig}>{money(slotPrice(current))}</span>
                      <span className={styles.priceCpm}>${current.cpm} CPM</span>
                    </p>
                    {/* Why this creator is in your feed. */}
                    <p className={styles.why}>{rationaleFor(current, DEFAULT_BRIEF)}</p>
                  </div>
                </div>
              </CreatorMedia>
            </article>

            <div className={styles.controls}>
              <Button onClick={() => decide(false)}>
                <XIcon /> Pass
              </Button>
              <Button variant="primary" onClick={() => decide(true)}>
                <CheckIcon /> Add to slate
              </Button>
            </div>
            <p className={styles.hint}>
              <Kbd>←</Kbd> pass <Kbd>→</Kbd> add · adding never sends money, the bid is
              one batch at the end
            </p>
          </div>
        ) : (
          /* The end screen is the audit trail — the document you could never
             produce from a swipe history. */
          <section className={styles.summary}>
            <h2 className={styles.summaryTitle}>
              {added.length} added, {passed.length} passed
            </h2>

            <dl className={styles.summaryStats}>
              <div>
                <dt>Total</dt>
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

            <ul className={styles.picks}>
              {added.map((c) => (
                <li key={c.id} className={styles.pick}>
                  <span className={styles.pickName}>{c.name}</span>
                  <span className={styles.pickReason}>
                    {rationaleFor(c, DEFAULT_BRIEF)}
                  </span>
                  <span className={styles.pickPrice}>{money(slotPrice(c))}</span>
                </li>
              ))}
              {added.length === 0 ? (
                <li className={styles.pickEmpty}>Nothing added — nothing to commit.</li>
              ) : null}
            </ul>

            <div className={styles.summaryActions}>
              <Button
                variant="primary"
                disabled={added.length === 0 || committed}
                onClick={() => {
                  setCommitted(true);
                  toast.success(`${added.length} bids sent as one batch`, {
                    description: `${money(stats.cost)} held against budget. Creators see one offer each.`,
                  });
                }}
              >
                {committed
                  ? "Committed"
                  : `Commit ${added.length} bids · ${money(stats.cost)}`}
              </Button>
              <Button onClick={restart}>
                <RotateCcwIcon /> Run the deck again
              </Button>
            </div>

            <p className={styles.note}>
              One batch, priced as a whole against the budget — which is what removes the
              regret of serial yeses against a shared pool. Twelve gestures produced
              twelve labelled decisions, the cleanest training signal any surface here
              generates.
            </p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
