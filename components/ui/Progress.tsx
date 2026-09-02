"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@/lib/utils";
import styles from "./Progress.module.css";

/**
 * <Progress value={40} />                         bar only
 * <Progress value={40} label="Storage" />         label + "40%" above the bar
 * <Progress value={null} />                       indeterminate
 */
export function Progress({
  className,
  label,
  showValue = !!label,
  ...props
}: ProgressPrimitive.Root.Props & { label?: React.ReactNode; showValue?: boolean }) {
  return (
    <ProgressPrimitive.Root className={cn(styles.root, className)} {...props}>
      {label || showValue ? (
        <div className={styles.head}>
          {label ? <ProgressPrimitive.Label className={styles.label}>{label}</ProgressPrimitive.Label> : null}
          {showValue ? <ProgressPrimitive.Value className={styles.value} /> : null}
        </div>
      ) : null}
      <ProgressPrimitive.Track className={styles.track}>
        <ProgressPrimitive.Indicator className={styles.indicator} />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
