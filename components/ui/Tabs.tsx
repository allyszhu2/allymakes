"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";
import styles from "./Tabs.module.css";

/**
 *   <Tabs defaultValue="a">
 *     <TabsList variant="line">          // "default" (pill) or "line" (underline)
 *       <TabsTab value="a">A</TabsTab>
 *       <TabsTab value="b">B</TabsTab>
 *     </TabsList>
 *     <TabsPanel value="a">…</TabsPanel>
 *     <TabsPanel value="b">…</TabsPanel>
 *   </Tabs>
 */
export function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root className={cn(styles.root, className)} {...props} />;
}

export function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & { variant?: "default" | "line" }) {
  return (
    <TabsPrimitive.List className={cn(styles.list, variant === "line" && styles.line, className)} {...props}>
      {children}
      <TabsPrimitive.Indicator className={styles.indicator} />
    </TabsPrimitive.List>
  );
}

export function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab className={cn(styles.tab, className)} {...props} />;
}

export function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel className={cn(styles.panel, className)} {...props} />;
}
