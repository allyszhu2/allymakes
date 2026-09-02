import { cn } from "@/lib/utils";
import styles from "./Table.module.css";

/**
 *   <Table>
 *     <TableHeader><TableRow><TableHead>Name</TableHead>…</TableRow></TableHeader>
 *     <TableBody><TableRow><TableCell>…</TableCell></TableRow></TableBody>
 *   </Table>
 * Pass `align="right"` on TableHead / TableCell for numbers.
 */
export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className={styles.wrap}>
      <table className={cn(styles.table, className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn(styles.thead, className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn(styles.tbody, className)} {...props} />;
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot className={cn(styles.tfoot, className)} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn(styles.row, className)} {...props} />;
}

export function TableHead({
  className,
  align,
  style,
  ...props
}: React.ComponentProps<"th"> & { align?: "left" | "center" | "right" }) {
  return <th className={cn(styles.head, className)} style={{ textAlign: align, ...style }} {...props} />;
}

export function TableCell({
  className,
  align,
  style,
  ...props
}: React.ComponentProps<"td"> & { align?: "left" | "center" | "right" }) {
  return <td className={cn(styles.cell, className)} style={{ textAlign: align, ...style }} {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn(styles.caption, className)} {...props} />;
}
