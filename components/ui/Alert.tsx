import { cn } from "@/lib/utils";
import styles from "./Alert.module.css";

/**
 *   <Alert variant="destructive">
 *     <AlertTitle>…</AlertTitle>
 *     <AlertDescription>…</AlertDescription>
 *   </Alert>
 */
export function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "destructive" }) {
  return <div role="alert" className={cn(styles.alert, styles[variant], className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.title, className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.description, className)} {...props} />;
}
