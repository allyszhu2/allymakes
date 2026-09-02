"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  SearchIcon,
  SquarePenIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./AppShell.module.css";

export type NavItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  /** Right-aligned number, e.g. an unread count. */
  count?: number;
  /** One level of nested rows, shown indented under this one. */
  items?: NavItem[];
};

export type NavSection = {
  /** Omit for the top section, which has no header. */
  label?: string;
  items: NavItem[];
  /** Collapsed to start. Only applies to labelled sections. */
  defaultCollapsed?: boolean;
};

/**
 * Desktop app frame: a Linear-style sidebar next to a rounded main panel.
 * Use it instead of PrototypeShell when the prototype is a whole app screen.
 *
 *   <AppShell
 *     workspace={{ name: "Agentio" }}
 *     nav={[{ items: [{ id: "home", label: "Home", icon: HomeIcon }] }]}
 *     defaultActive="home"
 *   >
 *     …
 *   </AppShell>
 *
 * Nav rows are real buttons and track which one is selected, but they don't
 * route anywhere — one screen is usually all a prototype needs. Pass
 * `onSelect` if you want to swap the content yourself.
 *
 * The main panel scrolls on its own, so the page never scrolls behind it.
 */
export function AppShell({
  workspace,
  nav,
  defaultActive,
  onSelect,
  children,
}: {
  workspace: { name: string; icon?: React.ReactNode };
  nav: NavSection[];
  defaultActive?: string;
  onSelect?: (id: string) => void;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(defaultActive ?? nav[0]?.items[0]?.id ?? "");
  const [collapsed, setCollapsed] = useState<string[]>(
    nav.filter((s) => s.label && s.defaultCollapsed).map((s) => s.label as string),
  );

  function select(id: string) {
    setActive(id);
    onSelect?.(id);
  }

  function toggleSection(label: string) {
    setCollapsed((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  }

  function renderItem(item: NavItem, depth = 0) {
    const Icon = item.icon;
    return (
      <li key={item.id}>
        <button
          type="button"
          className={cn(styles.item, active === item.id && styles.itemActive)}
          style={depth ? ({ paddingLeft: 30 } as React.CSSProperties) : undefined}
          aria-current={active === item.id ? "page" : undefined}
          onClick={() => select(item.id)}
        >
          {Icon ? <Icon className={styles.itemIcon} /> : null}
          <span className={styles.itemLabel}>{item.label}</span>
          {item.count !== undefined ? (
            <span className={styles.count}>{item.count}</span>
          ) : null}
        </button>
        {item.items?.length ? (
          <ul>{item.items.map((child) => renderItem(child, depth + 1))}</ul>
        ) : null}
      </li>
    );
  }

  return (
    <div className={styles.shell}>
      <nav className={styles.sidebar}>
        <button type="button" className={styles.workspace}>
          <span className={styles.wsIcon}>
            {workspace.icon ?? workspace.name.slice(0, 1).toUpperCase()}
          </span>
          <span className={styles.wsName}>{workspace.name}</span>
          <ChevronDownIcon className={styles.wsChevron} />
          <span className={styles.wsActions}>
            <SearchIcon />
            <SquarePenIcon />
          </span>
        </button>

        <div className={styles.nav}>
          {nav.map((section, i) => {
            const isCollapsed = !!section.label && collapsed.includes(section.label);
            return (
              <div key={section.label ?? `section-${i}`} className={styles.section}>
                {section.label ? (
                  <button
                    type="button"
                    className={styles.sectionHead}
                    onClick={() => toggleSection(section.label as string)}
                    aria-expanded={!isCollapsed}
                  >
                    <ChevronRightIcon
                      className={cn(
                        styles.sectionChevron,
                        !isCollapsed && styles.sectionOpen,
                      )}
                    />
                    {section.label}
                  </button>
                ) : null}
                {isCollapsed ? null : (
                  <ul>{section.items.map((item) => renderItem(item))}</ul>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <ThemeToggle />
          <button type="button" className={styles.help} aria-label="Help">
            <CircleHelpIcon size={14} />
          </button>
        </div>
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
