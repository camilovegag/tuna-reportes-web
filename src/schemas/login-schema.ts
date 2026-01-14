import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string({error: "Contraseña requerida"}).min(6, "Minimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
