import { cn } from "@/lib/utils";
import styles from "./Badge.module.css";

/** <Badge>Draft</Badge> · <Badge variant="accent">New</Badge> · <Badge variant="destructive">Bug</Badge> */
export function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "accent" | "destructive" }) {
  return <span className={cn(styles.badge, styles[variant], className)} {...props} />;
}
