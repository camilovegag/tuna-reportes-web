import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function H1({ className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

export function H2({ className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: TypographyProps) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}

export function H4({ className, ...props }: TypographyProps) {
  return <h4 className={cn("text-base font-medium", className)} {...props} />;
}

export function Text({ className, ...props }: TypographyProps) {
  return <p className={cn("text-sm text-foreground", className)} {...props} />;
}

export function TextMuted({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function TextSmall({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export function TextLarge({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-base text-foreground", className)} {...props} />
  );
}

export function TextError({ className, ...props }: TypographyProps) {
  return <p className={cn("text-sm text-destructive", className)} {...props} />;
}
