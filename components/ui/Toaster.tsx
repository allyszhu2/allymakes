"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/**
 * Toast host, mounted once in app/layout.tsx. Fire toasts from anywhere:
 *   import { toast } from "sonner";  toast("Saved");  toast.success("Done");
 * Colors come from the tokens in globals.css.
 */
export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--success)",
          "--success-border": "var(--border)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--destructive)",
          "--error-border": "var(--border)",
          "--border-radius": "var(--radius-lg)",
          fontFamily: "var(--font-sans)",
        } as React.CSSProperties
      }
    />
  );
}
