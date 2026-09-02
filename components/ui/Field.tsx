import { cn } from "@/lib/utils";
import { Label } from "./Label";
import styles from "./Field.module.css";

/**
 * Label + control + hint/error, stacked. Controls stretch to full width.
 *
 *   <Field>
 *     <FieldLabel htmlFor="email">Email</FieldLabel>
 *     <Input id="email" />
 *     <FieldDescription>We never share it.</FieldDescription>
 *     <FieldError>Required</FieldError>
 *   </Field>
 */
export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" className={cn(styles.field, className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn(styles.label, className)} {...props} />;
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function FieldError({ className, children, ...props }: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p role="alert" className={cn(styles.error, className)} {...props}>
      {children}
    </p>
  );
}
