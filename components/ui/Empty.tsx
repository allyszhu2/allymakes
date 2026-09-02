import { cn } from "@/lib/utils";
import styles from "./Empty.module.css";

/**
 *   <Empty>
 *     <InboxIcon />
 *     <EmptyTitle>No messages</EmptyTitle>
 *     <EmptyDescription>…</EmptyDescription>
 *     <EmptyActions><Button>Compose</Button></EmptyActions>
 *   </Empty>
 */
export function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.empty, className)} {...props} />;
}

export function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.title, className)} {...props} />;
}

export function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function EmptyActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.actions, className)} {...props} />;
}
