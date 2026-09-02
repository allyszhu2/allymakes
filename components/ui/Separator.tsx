import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";
import styles from "./Separator.module.css";

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      className={cn(styles.separator, orientation === "vertical" && styles.vertical, className)}
      {...props}
    />
  );
}
