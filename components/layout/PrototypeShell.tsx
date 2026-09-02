import { ThemeToggle } from "./ThemeToggle";
import styles from "./PrototypeShell.module.css";

/**
 * Plain wrapper for a prototype that isn't a full app screen.
 *
 * By default it adds no chrome at all — the prototype owns the whole viewport.
 * Pass a `title` only when the prototype genuinely wants a bar, and you get a
 * slim header with that title and a light/dark toggle.
 *
 * For app-shaped prototypes use AppShell instead, which gives you a sidebar.
 */
export function PrototypeShell({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  if (!title) return <>{children}</>;

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <div className={`page ${styles.barInner}`}>
          <span className={styles.title}>{title}</span>
          <div className="push">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
