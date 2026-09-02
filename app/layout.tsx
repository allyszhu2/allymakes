import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { Toaster } from "@/components/ui/Toaster";

// Fonts are exposed as CSS variables and consumed by --font-sans / --font-mono
// in globals.css. To change the typeface, swap the import here only.
const sans = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "allymakes",
    template: "%s — allymakes",
  },
  description: "Prototypes by Ally Zhu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the `dark` class on <html> before paint; suppress the
    // expected attribute mismatch on this element only.
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
