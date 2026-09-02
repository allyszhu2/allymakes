import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/Badge";
import { sortedPrototypes } from "@/lib/prototypes";
import styles from "./page.module.css";

/** Home: every prototype in the registry, newest first. */
export default function Home() {
  return (
    <div className={`page page-narrow ${styles.home}`}>
      <header className={`row ${styles.header}`}>
        <div className="stack" style={{ "--gap": "2px" } as React.CSSProperties}>
          <h1 className="h1">allymakes</h1>
          <p className="muted">Prototypes and ideas, one route each.</p>
        </div>
        <div className="push">
          <ThemeToggle />
        </div>
      </header>

      <ul className="stack" style={{ "--gap": "8px" } as React.CSSProperties}>
        {sortedPrototypes.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`} className={`panel ${styles.card}`}>
              <div className={styles.cardBody}>
                <div className="row">
                  <span className={styles.cardTitle}>{p.title}</span>
                  {p.tags?.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {p.description ? <p className="small">{p.description}</p> : null}
              </div>
              <div className={styles.cardMeta}>
                <ArrowUpRightIcon size={14} className={styles.arrow} />
                <span className="mono">{p.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <footer className={`hairline ${styles.footer}`}>
        <p className="small">
          New idea? Run <code className="mono">pnpm new my-idea &quot;My idea&quot;</code>{" "}
          and open <code className="mono">app/(prototypes)/my-idea/page.tsx</code>.
        </p>
      </footer>
    </div>
  );
}
