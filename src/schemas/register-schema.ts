import { z } from "zod";

export const registerSchema = z.object({
  email: z.string({ required_error: "Email requerido" }).email("Email inválido"),
  password: z.string({ required_error: "Contraseña requerida" }).min(6, "Mínimo 6 caracteres"),
  vinculationCode: z.string({ required_error: "Código de vinculación requerido" }).uuid("Código de vinculación inválido"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
