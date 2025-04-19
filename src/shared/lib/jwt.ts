import jwt from "jsonwebtoken";

import { JWT_CONFIG } from "@/shared/config";

export type TokenPayload = {
  userId: string;
};

/**
 * Generate access and refresh tokens
 * @param payload - The payload to be encoded in the token
 * @returns An object containing the access and refresh tokens
 */
export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, JWT_CONFIG.ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, JWT_CONFIG.REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

/**
 * Verify an access token
 * @param token - The token to be verified
 * @returns The payload of the token or null if the token is invalid
 */
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_CONFIG.ACCESS_TOKEN_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Verify a refresh token
 * @param token - The token to be verified
 * @returns The payload of the token or null if the token is invalid
 */
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_CONFIG.REFRESH_TOKEN_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};
