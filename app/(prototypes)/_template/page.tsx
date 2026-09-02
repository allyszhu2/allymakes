"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PrototypeShell } from "@/components/layout/PrototypeShell";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import styles from "./page.module.css";

/**
 * Starter for a new prototype. `pnpm new <slug> "Title"` copies this folder to
 * app/(prototypes)/<slug>/ and registers it in lib/prototypes.ts.
 *
 * Everything below is throwaway — replace it with the idea. There's no header
 * by default; pass a `title` to PrototypeShell if this one wants a bar, or
 * swap it for AppShell to get a Linear-style sidebar around a desktop app.
 * Page-specific styles go in page.module.css; shared ones in app/globals.css.
 */
export default function Page() {
  const [name, setName] = useState("");

  return (
    <PrototypeShell>
      <div className={`page page-narrow stack ${styles.wrap}`}>
        <div className="stack" style={{ "--gap": "4px" } as React.CSSProperties}>
          <h1 className="h1">__TITLE__</h1>
          <p className="muted">One sentence on what this explores.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Starting point</CardTitle>
            <CardDescription>Delete this card and build the idea.</CardDescription>
          </CardHeader>
          <CardContent className="row">
            <Input
              className="grow"
              placeholder="Type something"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={() => toast(name ? `Hello, ${name}` : "Hello")}
            >
              Go
            </Button>
          </CardContent>
        </Card>

        <div className="placeholder">Image / screenshot goes here</div>
      </div>
    </PrototypeShell>
  );
}
