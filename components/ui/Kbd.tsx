import { cn } from "@/lib/utils";
import styles from "./Kbd.module.css";

/** Keyboard key: <Kbd>⌘</Kbd><Kbd>K</Kbd> */
export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd className={cn(styles.kbd, className)} {...props} />;
}
