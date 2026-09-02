"use client";

import { useId, useRef, useState } from "react";
import { STAGES, money, type Month } from "./data";
import styles from "./page.module.css";

/**
 * State as shape, not words. Three primitives:
 *   DrainingBar  — time left, read as a shrinking bar rather than "expires in 5h"
 *   StageTrack   — five segments, filled to the project's current stage
 *   Sparkline    — views since publish, drawn on the video thumbnail
 * Plus the earnings chart, whose future half is dashed.
 */

/** Time left on a bid. Turns urgent below a quarter of the window. */
export function DrainingBar({ left, total }: { left: number; total: number }) {
  const fraction = Math.max(0, Math.min(1, left / total));
  const critical = fraction < 0.25;
  return (
    <div
      className={styles.drainTrack}
      role="timer"
      aria-label={`${left} of ${total} hours left to respond`}
    >
      <div
        className={`${styles.drainFill} ${critical ? styles.drainCritical : ""}`}
        style={{ width: `${fraction * 100}%` }}
      />
    </div>
  );
}

/** Five segments: briefed · filming · review · scheduled · live. */
export function StageTrack({ stage }: { stage: number }) {
  return (
    <div
      className={styles.stageTrack}
      role="img"
      aria-label={`Stage ${stage + 1} of ${STAGES.length}: ${STAGES[stage]}`}
    >
      {STAGES.map((name, i) => (
        <span
          key={name}
          className={`${styles.stageSeg} ${i <= stage ? styles.stageSegDone : ""}`}
        />
      ))}
    </div>
  );
}

/** Micro line chart. No axes, no labels — it sits on top of a thumbnail. */
export function Sparkline({ values }: { values: number[] }) {
  const w = 100;
  const h = 26;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - 3 - ((v - min) / span) * (h - 6);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg
      className={styles.sparkline}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#fff"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Earnings by month. One series, so no legend — the row title names it. The
 * only second shape is the future: solid for received, dashed for scheduled.
 * Neutral ink throughout, because the accent belongs to urgency.
 */
export function EarningsChart({
  months,
  lastReceived,
}: {
  months: Month[];
  lastReceived: number;
}) {
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const w = 640;
  const h = 150;
  const padTop = 12;
  const padBottom = 10;
  const max = Math.max(...months.map((m) => m.amount)) * 1.12;
  const base = h - padBottom;

  const pt = (i: number) => ({
    x: (i / (months.length - 1)) * w,
    y: base - (months[i].amount / max) * (base - padTop),
  });
  const points = months.map((_, i) => pt(i));
  const d = (from: number, to: number) =>
    points
      .slice(from, to + 1)
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

  const receivedLine = d(0, lastReceived);
  const receivedArea = `${receivedLine} L ${points[lastReceived].x} ${base} L 0 ${base} Z`;
  const futureLine = d(lastReceived, months.length - 1);
  const boundary = (lastReceived / (months.length - 1)) * 100;

  function onMove(e: React.MouseEvent) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = (e.clientX - rect.left) / rect.width;
    setHover(
      Math.max(0, Math.min(months.length - 1, Math.round(pct * (months.length - 1)))),
    );
  }

  const active = hover === null ? null : months[hover];

  return (
    <div className={styles.chartWrap}>
      <svg
        ref={svgRef}
        className={styles.chart}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label="Monthly earnings, received through August and scheduled through November"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={receivedArea} fill={`url(#${gradientId})`} />
        <path
          d={receivedLine}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={futureLine}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeOpacity="0.45"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {hover !== null ? (
          <>
            <line
              x1={points[hover].x}
              y1={padTop}
              x2={points[hover].x}
              y2={base}
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={points[hover].x}
              cy={points[hover].y}
              r="4"
              fill="var(--background)"
              stroke="var(--foreground)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>

      {active ? (
        <div
          className={styles.tip}
          style={{ left: `${(hover! / (months.length - 1)) * 100}%` }}
          aria-hidden="true"
        >
          <span className={styles.tipValue}>{money(active.amount)}</span>
          <span className={styles.tipLabel}>
            {active.label}
            {active.projected ? " · scheduled" : ""}
          </span>
        </div>
      ) : null}

      <div className={styles.axis} aria-hidden="true">
        <span>{months[0].label}</span>
        <span className={styles.axisNow} style={{ left: `${boundary}%` }}>
          now
        </span>
        <span>{months[months.length - 1].label}</span>
      </div>
    </div>
  );
}
