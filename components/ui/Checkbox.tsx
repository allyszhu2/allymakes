"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Checkbox.module.css";

/** <Label><Checkbox checked={x} onCheckedChange={setX} /> Remember me</Label> */
export function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root className={cn(styles.root, className)} {...props}>
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        {props.indeterminate ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
