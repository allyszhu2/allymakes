"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Building2Icon,
  CalendarDaysIcon,
  HandshakeIcon,
  HomeIcon,
  RadarIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { AppShell, type NavSection } from "@/components/layout/AppShell";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import {
  BIDS,
  DEFAULT_CPM,
  LAST_RECEIVED,
  MARKET,
  MONTHS,
  PROJECTS,
  RECEIVED_YTD,
  STAGES,
  brandGradient,
  money,
  type Bid,
} from "./data";
import { ChartRow, StripRow } from "./rows";
import { DrainingBar, EarningsChart, Sparkline, StageTrack } from "./shapes";
import styles from "./page.module.css";

const NAV: NavSection[] = [
  {
    items: [
      { id: "home", label: "Home", icon: HomeIcon },
      { id: "bids", label: "Bids", icon: HandshakeIcon, count: 3 },
      { id: "projects", label: "Projects", icon: CalendarDaysIcon },
    ],
  },
  {
    label: "Your channel",
    items: [
      { id: "rate", label: "Rate & terms", icon: TrendingUpIcon },
      { id: "audience", label: "Audience", icon: UsersIcon },
    ],
  },
  {
    label: "Money",
    items: [{ id: "earnings", label: "Earnings", icon: WalletIcon }],
  },
  {
    label: "Discover",
    items: [
      { id: "demand", label: "Demand", icon: RadarIcon },
      { id: "brands", label: "Brands", icon: Building2Icon },
    ],
  },
];

const soon = (label: string) => () => toast(`${label} — not built in this prototype`);

export default function CreatorHome() {
  const [bids, setBids] = useState<Bid[]>(BIDS);
  const [cpm, setCpm] = useState(DEFAULT_CPM);

  function answerBid(bid: Bid, accepted: boolean) {
    setBids((prev) => prev.filter((b) => b.id !== bid.id));
    if (accepted) {
      toast.success(`${bid.brand} accepted`, {
        description: `${money(bid.rate)} · added to In flight as briefed.`,
      });
    } else {
      toast(`${bid.brand} declined`);
    }
  }

  // Computed, so the line stays true as bids are answered and row 1 empties.
  const status = bids.length
    ? `${bids.length} bid${bids.length === 1 ? "" : "s"} waiting · $14,200 arriving Thursday.`
    : "Nothing waiting on you · $14,200 arriving Thursday.";

  // Where this creator's rate sits inside the market range.
  const markerPct = Math.max(
    0,
    Math.min(100, ((cpm - MARKET.low) / (MARKET.high - MARKET.low)) * 100),
  );

  return (
    <AppShell workspace={{ name: "Agentio" }} nav={NAV} defaultActive="home">
      <div className={styles.page}>
        {/* 0 · Status line. One sentence, not a header bar. */}
        <p className={styles.status}>{status}</p>

        {/* 1 · Bids waiting. The only row that appears and disappears. */}
        {bids.length > 0 ? (
          <StripRow
            title="Bids waiting"
            link={{ label: "All bids", onClick: soon("Bids") }}
          >
            {bids.map((bid) => (
              <article key={bid.id} className={styles.bidCard}>
                <div
                  className={styles.bidBrand}
                  style={{ backgroundImage: brandGradient(bid.brand) }}
                >
                  <span className={styles.bidBrandName}>{bid.brand}</span>
                </div>
                <div className={styles.bidBody}>
                  <span className={styles.bigNumber}>{money(bid.rate)}</span>
                  <span className={styles.bidFormat}>{bid.format}</span>
                  <DrainingBar left={bid.hoursLeft} total={bid.windowHours} />
                  <div className={styles.bidActions}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => answerBid(bid, true)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => answerBid(bid, false)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </StripRow>
        ) : null}

        {/* 2 · In flight. The card is the video. */}
        <StripRow
          title="In flight"
          link={{ label: "All projects", onClick: soon("Projects") }}
        >
          {PROJECTS.map((p) => (
            <article key={p.id} className={styles.projectCard}>
              <div
                className={styles.thumb}
                style={{ backgroundImage: brandGradient(p.brand) }}
              >
                {p.thumb ? (
                  <Image
                    src={`https://picsum.photos/seed/${p.thumb}/560/315`}
                    alt=""
                    fill
                    unoptimized
                    sizes="268px"
                    className={styles.thumbImage}
                  />
                ) : (
                  <span className={styles.thumbStandin}>{p.brand}</span>
                )}
                {p.views ? (
                  <div className={styles.sparkWrap}>
                    <Sparkline values={p.views} />
                    <span className={styles.sparkValue}>{p.viewsTotal} views</span>
                  </div>
                ) : null}
              </div>

              <div className={styles.projectBody}>
                <p className={styles.projectTitle}>
                  <span className={styles.projectBrand}>{p.brand}</span> · {p.title}
                </p>
                <Tooltip>
                  <TooltipTrigger
                    render={<div className={styles.stageTrigger} tabIndex={0} />}
                  >
                    <StageTrack stage={p.stage} />
                  </TooltipTrigger>
                  <TooltipContent>{STAGES.join(" · ")}</TooltipContent>
                </Tooltip>
                <p className={`${styles.projectLine} ${p.onYou ? styles.onYou : ""}`}>
                  {p.line}
                  {p.onYou ? " · waiting on you" : ""}
                </p>
              </div>
            </article>
          ))}
        </StripRow>

        {/* 3 · Earnings. The line continues into the future. */}
        <ChartRow
          title="Earnings"
          link={{ label: "Payments", onClick: soon("Payments") }}
          value={money(RECEIVED_YTD)}
          caption="received this year · dashed is scheduled and in review"
        >
          <EarningsChart months={MONTHS} lastReceived={LAST_RECEIVED} />
        </ChartRow>

        {/* 4 · Next up. Rate first, education as a ghost card at the end. */}
        <StripRow title="Next up" link={{ label: "Demand", onClick: soon("Demand") }}>
          <article className={`${styles.nextCard} ${styles.rateCard}`}>
            <span className={styles.cardLabel}>Your rate</span>
            <label className={styles.rateInput}>
              <span aria-hidden="true">$</span>
              <input
                type="number"
                value={cpm}
                min={1}
                max={99}
                onChange={(e) => setCpm(Number(e.target.value) || 0)}
                aria-label="Your CPM in dollars"
              />
            </label>
            <div className={styles.rangeTrack}>
              <span className={styles.rangeMarker} style={{ left: `${markerPct}%` }} />
            </div>
            <span className={styles.cardFoot}>
              Market ${MARKET.low}–{MARKET.high} · median ${MARKET.median}
            </span>
          </article>

          <article className={styles.nextCard}>
            <span className={styles.cardLabel}>Buying in your category</span>
            <span className={styles.bigNumber}>6</span>
            <span className={styles.cardFoot}>
              brands active in Tech &amp; Productivity this week
            </span>
          </article>

          <article className={styles.nextCard}>
            <span className={styles.cardLabel}>Format they want</span>
            <span className={styles.bigNumber}>60s</span>
            <span className={styles.cardFoot}>
              4 of the 6 are buying 60-second integrations
            </span>
          </article>

          {/* Education rides here as one ghost card, never as a section. */}
          <button type="button" className={styles.ghostCard} onClick={soon("Rate guide")}>
            <SparklesIcon size={16} />
            <span className={styles.ghostTitle}>How should I set my CPM?</span>
            <span className={styles.cardFoot}>3 min · uses your last 6 deals</span>
          </button>
        </StripRow>

        <p className={styles.footnote}>
          Illustrative data. Prototype for a PRD walkthrough, not real Agentio numbers.
        </p>
      </div>
    </AppShell>
  );
}
