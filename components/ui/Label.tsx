import { cn } from "@/lib/utils";
import styles from "./Label.module.css";

/** Form label. Wrap a Checkbox/Switch in it to make the text clickable. */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn(styles.label, className)} {...props} />;
}
