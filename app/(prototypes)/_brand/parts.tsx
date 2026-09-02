"use client";

import Image from "next/image";
import { BadgeCheckIcon, CompassIcon, LayoutGridIcon, ZapIcon } from "lucide-react";
import type { NavSection } from "@/components/layout/AppShell";
import {
  channelGradient,
  money,
  reachLabel,
  slotPrice,
  subsLabel,
  type Creator,
} from "./data";
import styles from "./parts.module.css";

/**
 * The five primitives no incumbent has, rendered the same way on all three
 * discovery surfaces: a real price, declared availability, an outcome, a
 * verified channel, and an exit that transacts. If these aren't loud, the
 * grid is just Modash with better data.
 */

/** 9:16 still of a recent sponsored read. Gradient behind it, never a hole. */
export function CreatorMedia({
  creator,
  children,
  sizes = "200px",
}: {
  creator: Creator;
  children?: React.ReactNode;
  sizes?: string;
}) {
  return (
    <div
      className={styles.media}
      style={{ backgroundImage: channelGradient(creator.channel) }}
    >
      <Image
        src={`https://picsum.photos/seed/${creator.thumb}/360/640`}
        alt=""
        fill
        unoptimized
        // Eager: the still is the card. Lazy loading leaves a gradient hole
        // whenever the tab is backgrounded or the observer is slow.
        loading="eager"
        sizes={sizes}
        className={styles.mediaImage}
      />
      {children}
    </div>
  );
}

/** Name, channel, subs, and the verified tick — the channel is OAuth'd. */
export function CreatorIdentity({ creator }: { creator: Creator }) {
  return (
    <div className={styles.identity}>
      <span className={styles.name}>
        {creator.name}
        <BadgeCheckIcon className={styles.verified} aria-label="Verified channel" />
      </span>
      <span className={styles.channel}>
        {creator.channel} · {subsLabel(creator.subs)}
      </span>
    </div>
  );
}

/** The price, on the card. The thing that makes a grid comparison-shoppable. */
export function PriceLine({ creator }: { creator: Creator }) {
  return (
    <div className={styles.priceLine}>
      <span className={styles.price}>${creator.cpm} CPM</span>
      <span className={styles.slotPrice}>{money(slotPrice(creator))} / slot</span>
    </div>
  );
}

/** Declared open slots. The chip no competitor can render. */
export function AvailabilityChip({ creator }: { creator: Creator }) {
  if (creator.slots === 0) {
    return <span className={`${styles.chip} ${styles.chipNone}`}>Booked out</span>;
  }
  return (
    <span className={styles.chip}>
      {creator.slots} {creator.slots === 1 ? "slot" : "slots"} · {creator.month}
    </span>
  );
}

/** Filters made of results, not proxies. */
export function OutcomeLine({ creator }: { creator: Creator }) {
  return <p className={styles.outcome}>{creator.outcome}</p>;
}

export function ReachLine({ creator }: { creator: Creator }) {
  return <span className={styles.reach}>{reachLabel(creator.reach)} engaged views</span>;
}

/* --------------------------------------------------------------------- nav */

/**
 * One nav for all three surfaces, with the three discovery modes as siblings —
 * which is the document's own conclusion: they're a sequence, not alternatives.
 * These rows are real links, so you can move between the prototypes.
 */
export const BRAND_NAV: NavSection[] = [
  {
    items: [
      { id: "brief", label: "Brief", icon: CompassIcon, href: "/brand-brief" },
      { id: "browse", label: "Browse", icon: LayoutGridIcon, href: "/brand-slate" },
      { id: "fastfill", label: "Fast fill", icon: ZapIcon, href: "/brand-feed" },
    ],
  },
];
