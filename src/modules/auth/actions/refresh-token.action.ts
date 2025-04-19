"use server";

import { cookies } from "next/headers";

import { COOKIES } from "@/shared/constants";
import { verifyRefreshToken, generateTokens } from "@/shared/lib";

export async function refreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    throw new Error("Refresh token não encontrado");
  }

  const payload = verifyRefreshToken(refreshToken);

  if (!payload) {
    throw new Error("Refresh token inválido");
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens({
    userId: payload.userId,
  });

  cookieStore.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15,
  });

  cookieStore.set(COOKIES.REFRESH_TOKEN, newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}
