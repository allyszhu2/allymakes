import { cn } from "@/lib/utils";
import styles from "./Textarea.module.css";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(styles.textarea, className)} {...props} />;
}
