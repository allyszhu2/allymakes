"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
import styles from "./Popover.module.css";

/**
 *   <Popover>
 *     <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
 *     <PopoverContent>
 *       <PopoverTitle>Share</PopoverTitle>
 *       <PopoverDescription>…</PopoverDescription>
 *       …
 *     </PopoverContent>
 *   </Popover>
 */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className={styles.positioner}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup className={cn(styles.popup, className)} {...props} />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return <PopoverPrimitive.Title className={cn(styles.title, className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return <PopoverPrimitive.Description className={cn(styles.description, className)} {...props} />;
}
