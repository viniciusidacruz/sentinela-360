"use server";

import { hash } from "bcryptjs";

import { User } from "@/generated/prisma";
import { prisma } from "@/shared/lib/prisma";

import { signUpSchema, SignUpSchema } from "../schemas";

export async function signUp(formData: SignUpSchema): Promise<User> {
  const parsed = signUpSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const { name, email, password, cnpj, confirmPassword } = parsed.data;

  if (password !== confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  const [existingByCnpj, existingByEmail] = await Promise.all([
    prisma.user.findUnique({ where: { cnpj } }),
    prisma.user.findUnique({ where: { email } }),
  ]);

  if (existingByCnpj) {
    throw new Error("Usuário com este CNPJ já existe");
  }

  if (existingByEmail) {
    throw new Error("Usuário com este e-mail já existe");
  }

  const passwordHash = await hash(password, 8);

  return prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      cnpj,
    },
  });
}
