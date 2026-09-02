"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
import styles from "./Switch.module.css";

/** <Label><Switch checked={x} onCheckedChange={setX} /> Notifications</Label> */
export function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root className={cn(styles.root, className)} {...props}>
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
}
