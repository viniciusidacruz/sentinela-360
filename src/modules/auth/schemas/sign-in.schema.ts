import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Campo inválido" })
    .min(2, { message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Campo inválido" })
    .min(2, { message: "Campo obrigatório" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
