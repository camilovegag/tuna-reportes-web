import * as React from "react";
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label: string;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  description,
  className,
  ...props
}: FormFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            id={name}
            aria-invalid={!!error}
            className={cn(className)}
            {...field}
            {...props}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError>{error?.message as string}</FieldError>
        </Field>
      )}
    />
  );
}
