"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Menu.module.css";

/**
 * Dropdown menu.
 *
 *   <Menu>
 *     <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
 *     <MenuContent>
 *       <MenuLabel>Actions</MenuLabel>
 *       <MenuItem onClick={…}>Rename <MenuShortcut>⌘R</MenuShortcut></MenuItem>
 *       <MenuSeparator />
 *       <MenuCheckboxItem checked={x} onCheckedChange={setX}>Show</MenuCheckboxItem>
 *       <MenuItem variant="destructive">Delete</MenuItem>
 *     </MenuContent>
 *   </Menu>
 */
export const Menu = MenuPrimitive.Root;
export const MenuTrigger = MenuPrimitive.Trigger;
export const MenuGroup = MenuPrimitive.Group;

export function MenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className={styles.positioner}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup className={cn(styles.popup, className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export function MenuItem({
  className,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & { variant?: "default" | "destructive" }) {
  return (
    <MenuPrimitive.Item
      className={cn(styles.item, variant === "destructive" && styles.destructive, className)}
      {...props}
    />
  );
}

export function MenuCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem className={cn(styles.item, className)} {...props}>
      <span className={styles.indicator}>
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

export function MenuLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return <MenuPrimitive.GroupLabel className={cn(styles.label, className)} {...props} />;
}

export function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator className={cn(styles.separator, className)} {...props} />;
}

export function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn(styles.shortcut, className)} {...props} />;
}
