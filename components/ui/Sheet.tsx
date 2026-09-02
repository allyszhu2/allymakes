"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import styles from "./Sheet.module.css";

/**
 * Side panel that slides in from an edge. Same API as Dialog, plus `side`.
 *
 *   <Sheet>
 *     <SheetTrigger render={<Button />}>Open</SheetTrigger>
 *     <SheetContent side="right"> … </SheetContent>
 *   </Sheet>
 */
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

export function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop className={styles.backdrop} />
      <SheetPrimitive.Popup className={cn(styles.popup, styles[side], className)} {...props}>
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            render={<Button variant="ghost" size="icon" className={styles.close} aria-label="Close" />}
          >
            <XIcon />
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} {...props} />;
}

export function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title className={cn(styles.title, className)} {...props} />;
}

export function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return <SheetPrimitive.Description className={cn(styles.description, className)} {...props} />;
}
