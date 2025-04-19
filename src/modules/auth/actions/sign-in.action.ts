"use server";

import { compare } from "bcryptjs";
import { cookies } from "next/headers";

import { COOKIES } from "@/shared/constants";
import { generateTokens, prisma } from "@/shared/lib";
import { SignInSchema, signInSchema } from "@/modules/auth/schemas";

export async function signIn(formData: SignInSchema) {
  const parsed = signInSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const { cnpj, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { cnpj },
  });

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  const { accessToken, refreshToken } = generateTokens({ userId: user.id });

  const cookieStore = await cookies();

  cookieStore.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
  });

  cookieStore.set(COOKIES.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { user };
}
