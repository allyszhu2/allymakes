"use client";

import { ArrowRightIcon } from "lucide-react";
import styles from "./page.module.css";

/**
 * The page is made of exactly two row types. If something fits neither, it
 * isn't a home-screen item.
 *
 *   StripRow — title, one link, a horizontally scrolling line of cards,
 *              always exactly one card tall. Overflow goes sideways.
 *   ChartRow — title, one big number, one chart.
 */

function RowHead({
  title,
  link,
}: {
  title: string;
  link?: { label: string; onClick: () => void };
}) {
  return (
    <div className={styles.rowHead}>
      <h2 className={styles.rowTitle}>{title}</h2>
      {link ? (
        <button type="button" className={styles.rowLink} onClick={link.onClick}>
          {link.label}
          <ArrowRightIcon size={12} />
        </button>
      ) : null}
    </div>
  );
}

export function StripRow({
  title,
  link,
  children,
}: {
  title: string;
  link?: { label: string; onClick: () => void };
  children: React.ReactNode;
}) {
  return (
    <section className={styles.row}>
      <RowHead title={title} link={link} />
      <div className={styles.strip}>{children}</div>
    </section>
  );
}

export function ChartRow({
  title,
  link,
  value,
  caption,
  children,
}: {
  title: string;
  link?: { label: string; onClick: () => void };
  value: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.row}>
      <RowHead title={title} link={link} />
      <div className={styles.chartBody}>
        <div className={styles.chartLead}>
          <span className={styles.bigNumber}>{value}</span>
          <span className={styles.chartCaption}>{caption}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
