"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import styles from "./Slider.module.css";

/**
 * Single: <Slider value={v} onValueChange={setV} />
 * Range:  <Slider defaultValue={[20, 80]} />
 */
export function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [0];

  return (
    <SliderPrimitive.Root
      className={cn(styles.root, className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Control className={styles.control}>
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Indicator className={styles.indicator} />
        </SliderPrimitive.Track>
        {values.map((_, i) => (
          <SliderPrimitive.Thumb key={i} className={styles.thumb} />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
