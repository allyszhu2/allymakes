"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Building2Icon,
  CalendarDaysIcon,
  HandshakeIcon,
  HomeIcon,
  InboxIcon,
  RadarIcon,
  ReceiptIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { AppShell, type NavSection } from "@/components/layout/AppShell";
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { SLOTS, SLOT_VALUE, STATE_LABEL, TODAY, WEEKS, money, type Slot } from "./data";
import styles from "./page.module.css";

const appetiteItems = [2, 3, 4, 5, 6].map((n) => ({
  value: String(n),
  label: String(n),
}));

/** Sidebar for the creator app. Only Home is built; the rest set the scene. */
const NAV: NavSection[] = [
  {
    items: [
      { id: "home", label: "Home", icon: HomeIcon },
      { id: "inbox", label: "Inbox", icon: InboxIcon, count: 2 },
      { id: "offers", label: "Offers", icon: HandshakeIcon },
    ],
  },
  {
    label: "Your channel",
    items: [
      {
        id: "slots",
        label: "Slot calendar",
        icon: CalendarDaysIcon,
        items: [
          { id: "slots-open", label: "Open" },
          { id: "slots-booked", label: "Booked" },
        ],
      },
      { id: "rate", label: "Rate & floor", icon: TrendingUpIcon },
      { id: "audience", label: "Audience", icon: UsersIcon },
    ],
  },
  {
    label: "Money",
    items: [
      { id: "payouts", label: "Payouts", icon: WalletIcon },
      { id: "invoices", label: "Invoices", icon: ReceiptIcon },
    ],
  },
  {
    label: "Discover",
    items: [
      { id: "demand", label: "Demand", icon: RadarIcon },
      { id: "brands", label: "Brands", icon: Building2Icon },
    ],
  },
];

export default function CreatorHome() {
  const [slots, setSlots] = useState(SLOTS);
  const [appetite, setAppetite] = useState("4");
  // `selling` is kept after close so the dialog keeps its content while it
  // animates out; `sellOpen` drives the open state.
  const [selling, setSelling] = useState<Slot | null>(null);
  const [sellOpen, setSellOpen] = useState(false);
  const [askPrice, setAskPrice] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [calendarShared, setCalendarShared] = useState(false);

  const byId = useMemo(() => new Map(slots.map((s) => [s.id, s])), [slots]);

  /**
   * The creator sets the denominator. The sellable window is the next N slots
   * they haven't held back, where N is the number of videos a month they've
   * said they're willing to sponsor. Everything after that isn't a gap.
   */
  const { openInWindow, windowSize, capacity, openSoon } = useMemo(() => {
    const n = Number(appetite);
    const window = slots.filter((s) => s.state !== "held").slice(0, n);
    const open = window.filter((s) => s.state === "open");
    return {
      openInWindow: open.length,
      windowSize: window.length,
      capacity: open.length * SLOT_VALUE,
      openSoon: slots.filter((s) => s.state === "open" && s.inDays <= 21).length,
    };
  }, [slots, appetite]);

  function openSellDialog(slot: Slot) {
    setSelling(slot);
    setAskPrice(String(slot.ask));
    setSellOpen(true);
  }

  function listSlot() {
    if (!selling) return;
    const listed = selling;
    setSlots((prev) =>
      prev.map((s) =>
        s.id === listed.id
          ? {
              ...s,
              state: "in-play" as const,
              meta: "Listed just now · 6 brands notified",
            }
          : s,
      ),
    );
    setSellOpen(false);
    toast.success("Slot listed", {
      description: `6 brands buying in Tech & Productivity can bid until ${listed.date}.`,
    });
  }

  return (
    <AppShell workspace={{ name: "Agentio" }} nav={NAV} defaultActive="home">
      <div className="page" style={{ "--page-w": "1120px" } as React.CSSProperties}>
        {/* ---- Lead line + money in motion. A timeline, not a total. ---- */}
        <header className={styles.lead}>
          <p className="eyebrow">{TODAY}</p>
          <h1 className={styles.leadLine}>Nothing needs you today.</h1>
          <div className={styles.motion}>
            <div className={styles.motionItem}>
              <span className={styles.motionValue}>$14,200</span>
              <span className="small">lands Thursday</span>
            </div>
            <div className={styles.motionItem}>
              <span className={styles.motionValue}>$9,000</span>
              <span className="small">invoiced, clears Sep 24</span>
            </div>
            <div className={styles.motionItem}>
              <span className={styles.motionValue}>{openSoon} open slots</span>
              <span className="small">in the next 3 weeks</span>
            </div>
          </div>
        </header>

        <div className={styles.columns}>
          {/* ---- The spine: six weeks of upload slots ---- */}
          <main className={styles.main}>
            <section className={`panel ${styles.calendar}`}>
              <div className={styles.calendarHead}>
                <div>
                  <h2 className={styles.panelTitle}>Next six weeks</h2>
                  <p className={styles.capacity}>
                    You publish about 8 videos a month and sponsor{" "}
                    <span className={styles.inlineSelect}>
                      <Select
                        items={appetiteItems}
                        value={appetite}
                        onValueChange={(v) => setAppetite(String(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {appetiteItems.map((i) => (
                            <SelectItem key={i.value} value={i.value}>
                              {i.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </span>{" "}
                    of them.{" "}
                    {openInWindow > 0 ? (
                      <>
                        <strong className={styles.strong}>
                          {openInWindow} of your next {windowSize} sellable slots are open
                        </strong>{" "}
                        — about {money(capacity)} of capacity that goes away when those
                        videos publish.
                      </>
                    ) : (
                      <strong className={styles.strong}>
                        Your next {windowSize} sellable slots are all spoken for.
                      </strong>
                    )}
                  </p>
                </div>
              </div>

              <div className={styles.weeks}>
                {WEEKS.map((week) => (
                  <div key={week.label} className={styles.week}>
                    <div className={styles.weekLabel}>{week.label}</div>
                    <ul>
                      {week.slots.map((id) => {
                        const slot = byId.get(id);
                        if (!slot) return null;
                        const isOpen = slot.state === "open";
                        const urgent = isOpen && slot.inDays <= 7;
                        const meta = isOpen
                          ? `publishes in ${slot.inDays} ${slot.inDays === 1 ? "day" : "days"}`
                          : slot.meta;

                        const body = (
                          <>
                            <span className={`${styles.dot} ${styles[slot.state]}`} />
                            <span className={styles.slotDate}>{slot.date}</span>
                            <span className={styles.slotTitle}>
                              {slot.title}
                              {slot.projected ? (
                                <span className={styles.projected}>
                                  from your cadence
                                </span>
                              ) : null}
                            </span>
                            <span
                              className={`${styles.slotMeta} ${urgent ? styles.urgent : ""}`}
                            >
                              {meta}
                            </span>
                            <span className={styles.slotEnd}>
                              <span className={styles.stateLabel}>
                                {STATE_LABEL[slot.state]}
                              </span>
                              {isOpen ? (
                                <span className={styles.sell}>
                                  Sell slot <ArrowRightIcon size={12} />
                                </span>
                              ) : null}
                            </span>
                          </>
                        );

                        return (
                          <li key={slot.id}>
                            {isOpen ? (
                              <button
                                type="button"
                                className={`${styles.slot} ${styles.slotOpen}`}
                                onClick={() => openSellDialog(slot)}
                              >
                                {body}
                              </button>
                            ) : (
                              <div className={styles.slot}>{body}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- One next action, ranked by what it's worth to them ---- */}
            <section className={`panel ${styles.action}`}>
              <div className={styles.actionRow}>
                <div className={styles.actionBody}>
                  <h2 className={styles.panelTitle}>Do this today</h2>
                  <p>
                    Finish your bid template. Creators with one answer offers about 3 days
                    faster and win roughly 20% more of them. Your last three offers took 4
                    days.
                  </p>
                </div>
                <Button variant="primary" onClick={() => toast("Opening bid template")}>
                  Finish template
                </Button>
              </div>
              {showSecond ? (
                <div className={`${styles.actionRow} ${styles.actionSecond}`}>
                  <div className={styles.actionBody}>
                    <p>
                      Raise your floor to $6,600. Your last four deals all cleared above
                      $6,900, and comparable channels are clearing $6.9k–8.1k.
                    </p>
                  </div>
                  <Button onClick={() => toast("Opening rate settings")}>
                    Review floor
                  </Button>
                </div>
              ) : null}
              <button
                type="button"
                className={styles.more}
                onClick={() => setShowSecond((v) => !v)}
              >
                {showSecond ? "Hide" : "1 more"}
              </button>
            </section>
          </main>

          {/* ---- Right rail ---- */}
          <aside className={styles.rail}>
            {/* Demand pulse — the thing that changes overnight */}
            <section className={`panel ${styles.card}`}>
              <h2 className={styles.panelTitle}>Tech &amp; Productivity this week</h2>
              <ul className={styles.pulse}>
                <li>
                  <strong className={styles.strong}>6 brands</strong> buying in your
                  category
                </li>
                <li>
                  <strong className={styles.strong}>2</strong> booked creators in your
                  size band
                </li>
                <li>
                  Median clearing CPM <strong className={styles.strong}>$34</strong>{" "}
                  <Badge variant="accent">up from $31</Badge>
                </li>
              </ul>
              <p className="small">
                {calendarShared
                  ? "All 6 can now see your calendar through Oct 11."
                  : "4 of the 6 only consider creators whose calendar is shared past two weeks. Yours ends Sep 16."}
              </p>
              <Button
                disabled={calendarShared}
                onClick={() => {
                  setCalendarShared(true);
                  toast.success("Calendar shared through Oct 11", {
                    description: "4 more brands can now see your open slots.",
                  });
                }}
              >
                {calendarShared ? "Calendar shared" : "Share six weeks"}
              </Button>
            </section>

            {/* Stub: what you're worth, and what moved */}
            <section className={`panel ${styles.card}`}>
              <h2 className={styles.panelTitle}>What you&apos;re worth</h2>
              <div className={styles.rateRow}>
                <span className={styles.rateRange}>$6.9k–8.1k</span>
                <Badge variant="accent">V30 +12%</Badge>
              </div>
              <p className="small">
                Comparable channels cleared that range in the last 30 days. Your floor is
                $6,000, set in March.
              </p>
              <Button onClick={() => toast("Opening rate settings")}>Update floor</Button>
            </section>

            {/* Stub: why offers aren't arriving */}
            <section className={`panel ${styles.card}`}>
              <h2 className={styles.panelTitle}>Why offers aren&apos;t arriving</h2>
              <ul className={styles.diagnostic}>
                <li>
                  <span>Your categories are set to 2 of 14.</span>
                  <span className="small">
                    Three of this week&apos;s buyers are in Software &amp; SaaS, which you
                    have off.
                  </span>
                </li>
                <li>
                  <span>Two of your last six reads ran long.</span>
                  <span className="small">
                    Brands filtering on read length skipped you twice in August.
                  </span>
                </li>
              </ul>
            </section>

            {/* Stub: repeat & renewal */}
            <section className={`panel ${styles.card}`}>
              <h2 className={styles.panelTitle}>Coming back around</h2>
              <p>
                Notion rebooked 4 of the 6 creators from their June flight. You were one
                of the six.
              </p>
              <Button onClick={() => toast("Availability sent to Notion")}>
                Signal availability <ArrowUpRightIcon size={12} />
              </Button>
            </section>
          </aside>
        </div>

        <p className={styles.footnote}>
          Illustrative data. Prototype for a PRD walkthrough, not real Agentio numbers.
        </p>
      </div>

      {/* ---- Sell this slot ---- */}
      <Dialog open={sellOpen} onOpenChange={setSellOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List this slot</DialogTitle>
            <DialogDescription>
              {selling?.date} · publishes in {selling?.inDays} days · {selling?.title}
            </DialogDescription>
          </DialogHeader>

          <div className={styles.dialogStats}>
            <div>
              <span className="small">Projected V30</span>
              <span className={styles.dialogValue}>
                {selling ? selling.v30.toLocaleString("en-US") : "—"} engaged views
              </span>
            </div>
            <div>
              <span className="small">Category median</span>
              <span className={styles.dialogValue}>$34 CPM, last 30 days</span>
            </div>
          </div>

          <Field>
            <FieldLabel htmlFor="ask">Ask price</FieldLabel>
            <Input
              id="ask"
              value={askPrice}
              onChange={(e) => setAskPrice(e.target.value)}
              inputMode="numeric"
            />
            <FieldDescription>
              Your floor is $6,000. Comparable channels cleared $6.9k–8.1k on videos this
              size.
            </FieldDescription>
          </Field>

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button variant="primary" onClick={listSlot}>
              List to 6 brands buying now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
