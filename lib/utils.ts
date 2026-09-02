import { clsx, type ClassValue } from "clsx";

/**
 * Join class names, skipping falsy values. Pairs with CSS Modules:
 *   cn(styles.button, variant === "ghost" && styles.ghost, className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
