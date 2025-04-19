import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string({ required_error: "Campo inválido" }).min(1, {
      message: "Campo obrigatório",
    }),
    email: z.string({ required_error: "Campo inválido" }).email({
      message: "Email inválido",
    }),
    password: z
      .string({ required_error: "Campo inválido" })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(16, { message: "Senha deve ter no máximo 16 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
        }
      ),
    confirmPassword: z
      .string({ required_error: "Campo inválido" })
      .min(2, { message: "Campo obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
