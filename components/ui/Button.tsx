import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "default" | "sm" | "icon";

/**
 * <Button>Save</Button>                      secondary (grey, bordered) is the default
 * <Button variant="primary">Save</Button>    accent — one per screen
 * <Button variant="ghost" size="icon"><XIcon /></Button>
 *
 * Use as any Base UI trigger: <DialogTrigger render={<Button />}>Open</DialogTrigger>
 */
export function Button({
  className,
  variant = "secondary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <ButtonPrimitive
      className={cn(styles.button, styles[variant], size !== "default" && styles[size], className)}
      {...props}
    />
  );
}
