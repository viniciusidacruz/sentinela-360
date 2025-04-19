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

  const { name, email, password, confirmPassword } = parsed.data;

  if (password !== confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Usuário com este e-mail já existe");
  }

  const passwordHash = await hash(password, 8);

  return prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });
}
