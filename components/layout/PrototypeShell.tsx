import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./PrototypeShell.module.css";

/**
 * Minimal chrome around every prototype: a slim top bar with a back link, the
 * prototype's title, and the theme toggle. The prototype renders below with no
 * other opinions imposed. Pass `bare` to drop the bar entirely (e.g. for a
 * full-screen app mock).
 */
export function PrototypeShell({
  title,
  bare = false,
  children,
}: {
  title?: string;
  bare?: boolean;
  children: React.ReactNode;
}) {
  if (bare) return <>{children}</>;

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <div className={`page ${styles.barInner}`}>
          <Link href="/" className={styles.back}>
            <ArrowLeftIcon size={14} />
            allymakes
          </Link>
          {title ? (
            <>
              <span className={styles.slash}>/</span>
              <span className={styles.title}>{title}</span>
            </>
          ) : null}
          <div className="push">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
