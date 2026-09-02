import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

/**
 * <Card>
 *   <CardHeader>
 *     <CardTitle>…</CardTitle>
 *     <CardDescription>…</CardDescription>
 *     <CardAction><Button size="sm">…</Button></CardAction>   (optional, top-right)
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter>…</CardFooter>
 * </Card>
 */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.card, className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn(styles.title, className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.action, className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.content, className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} {...props} />;
}
