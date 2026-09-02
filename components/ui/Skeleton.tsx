import { cn } from "@/lib/utils";
import styles from "./Skeleton.module.css";

/** Loading placeholder. Size it with style or a class. */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.skeleton, className)} {...props} />;
}
