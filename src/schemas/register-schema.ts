import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  vinculationCode: z.uuid("Código de vinculación inválido"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
