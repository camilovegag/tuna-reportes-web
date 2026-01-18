import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email requerido" }).email("Email inválido"),
  password: z.string({ required_error: "Contraseña requerida" }).min(6, "Mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
