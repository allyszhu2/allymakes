import { cn } from "@/lib/utils";
import styles from "./Spinner.module.css";

/** Inline loading ring; inherits the text color and sizes to 1em by default. */
export function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return <span role="status" aria-label="Loading" className={cn(styles.spinner, className)} {...props} />;
}
