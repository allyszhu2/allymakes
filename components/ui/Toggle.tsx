"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cn } from "@/lib/utils";
import styles from "./Toggle.module.css";

/**
 * Standalone: <Toggle pressed={b} onPressedChange={setB}><BoldIcon /></Toggle>
 *
 * Segmented control:
 *   <ToggleGroup value={[view]} onValueChange={(v) => v[0] && setView(v[0])}>
 *     <Toggle value="grid">Grid</Toggle>
 *     <Toggle value="list">List</Toggle>
 *   </ToggleGroup>
 * Add `multiple` to allow several pressed at once.
 */
export function Toggle({ className, ...props }: TogglePrimitive.Props) {
  return <TogglePrimitive className={cn(styles.toggle, className)} {...props} />;
}

export function ToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return <ToggleGroupPrimitive className={cn(styles.group, className)} {...props} />;
}
