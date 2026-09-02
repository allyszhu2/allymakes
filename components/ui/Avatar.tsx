"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";
import styles from "./Avatar.module.css";

/**
 *   <Avatar size="sm">
 *     <AvatarImage src={url} alt="" />
 *     <AvatarFallback>MC</AvatarFallback>
 *   </Avatar>
 * Wrap several in <AvatarGroup> for an overlapping stack.
 */
export function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & { size?: "sm" | "default" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      className={cn(styles.root, size === "sm" && styles.sm, size === "lg" && styles.lg, className)}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return <AvatarPrimitive.Image className={cn(styles.image, className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return <AvatarPrimitive.Fallback className={cn(styles.fallback, className)} {...props} />;
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.group, className)} {...props} />;
}
