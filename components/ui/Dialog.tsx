"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import styles from "./Dialog.module.css";

/**
 *   <Dialog>
 *     <DialogTrigger render={<Button />}>Open</DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader><DialogTitle>…</DialogTitle><DialogDescription>…</DialogDescription></DialogHeader>
 *       …
 *       <DialogFooter><DialogClose render={<Button variant="primary" />}>Done</DialogClose></DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 * Controlled: <Dialog open={open} onOpenChange={setOpen}>. Width: className with max-width.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className={styles.backdrop} />
      <DialogPrimitive.Popup className={cn(styles.popup, className)} {...props}>
        {children}
        <DialogPrimitive.Close
          render={<Button variant="ghost" size="icon" className={styles.close} aria-label="Close" />}
        >
          <XIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} {...props} />;
}

export function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title className={cn(styles.title, className)} {...props} />;
}

export function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description className={cn(styles.description, className)} {...props} />;
}
