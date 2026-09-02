"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Accordion.module.css";

/**
 *   <Accordion>
 *     <AccordionItem>
 *       <AccordionTrigger>Question</AccordionTrigger>
 *       <AccordionContent>Answer</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 * Pass `multiple` to let several items stay open.
 */
export function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root className={cn(styles.root, className)} {...props} />;
}

export function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item className={cn(styles.item, className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger className={cn(styles.trigger, className)} {...props}>
        {children}
        <ChevronDownIcon className={styles.chevron} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel className={styles.panel} {...props}>
      <div className={cn(styles.panelInner, className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}
