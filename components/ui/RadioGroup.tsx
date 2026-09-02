"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
import styles from "./RadioGroup.module.css";

/**
 *   <RadioGroup value={v} onValueChange={setV}>
 *     <Label><RadioItem value="a" /> Option A</Label>
 *     <Label><RadioItem value="b" /> Option B</Label>
 *   </RadioGroup>
 */
export function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupPrimitive.Props & { orientation?: "vertical" | "horizontal" }) {
  return (
    <RadioGroupPrimitive
      className={cn(styles.group, orientation === "horizontal" && styles.horizontal, className)}
      {...props}
    />
  );
}

export function RadioItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root className={cn(styles.item, className)} {...props}>
      <RadioPrimitive.Indicator className={styles.indicator} />
    </RadioPrimitive.Root>
  );
}
