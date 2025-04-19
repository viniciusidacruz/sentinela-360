import { z } from "zod";

export const signInSchema = z.object({
  cnpj: z
    .string({ required_error: "Campo inválido" })
    .regex(/^[\d./-]+$/, {
      message:
        "CNPJ deve conter apenas números e caracteres especiais (., /, -)",
    })
    .refine((value) => value.length >= 14 && value.length <= 18, {
      message: "CNPJ inválido",
    })
    .transform((value) => value.replace(/[^\d]/g, ""))
    .refine((value) => value.length === 14, {
      message: "CNPJ deve ter 14 dígitos",
    }),
  password: z
    .string({ required_error: "Campo inválido" })
    .min(2, { message: "Campo obrigatório" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
