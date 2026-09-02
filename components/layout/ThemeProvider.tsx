"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the app so `useTheme()` works anywhere. Writes a `dark` class on <html>
 * (the `.dark` palette block in globals.css) and persists the choice
 * in localStorage. `system` follows the OS by default.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
