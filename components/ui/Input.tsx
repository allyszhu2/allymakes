import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

/** Text input. Set `aria-invalid` to show the error state. */
export function Input({ className, ...props }: InputPrimitive.Props) {
  return <InputPrimitive className={cn(styles.input, className)} {...props} />;
}
