"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Select.module.css";

/**
 * Pass `items` to the root so the trigger shows the label, not the value.
 *
 *   const items = [{ value: "a", label: "Apple" }];
 *   <Select items={items} value={v} onValueChange={setV}>
 *     <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
 *     <SelectContent>
 *       {items.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
 *     </SelectContent>
 *   </Select>
 */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;

export function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value className={cn(styles.value, className)} {...props} />;
}

export function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger className={cn(styles.trigger, className)} {...props}>
      {children}
      <SelectPrimitive.Icon className={styles.icon}>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className={styles.positioner}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={false}
      >
        <SelectPrimitive.Popup className={cn(styles.popup, className)} {...props}>
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item className={cn(styles.item, className)} {...props}>
      <SelectPrimitive.ItemText className={styles.itemText}>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return <SelectPrimitive.GroupLabel className={cn(styles.label, className)} {...props} />;
}

export function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return <SelectPrimitive.Separator className={cn(styles.separator, className)} {...props} />;
}
