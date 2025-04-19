import { describe, it, expect, vi, beforeEach } from "vitest";

import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../jwt";

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn().mockImplementation((payload, secret, options) => {
      return `mock-token-${payload.userId}`;
    }),
    verify: vi.fn().mockImplementation((token, secret) => {
      if (token.includes("invalid")) {
        throw new Error("Invalid token");
      }
      return { userId: token.split("-")[2] };
    }),
  },
}));

describe("JWT Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("generateTokens", () => {
    it("should generate access and refresh tokens", () => {
      const userId = "123";
      const { accessToken, refreshToken } = generateTokens({ userId });

      expect(accessToken).toBe(`mock-token-${userId}`);
      expect(refreshToken).toBe(`mock-token-${userId}`);
    });
  });

  describe("verifyAccessToken", () => {
    it("should verify a valid access token", () => {
      const token = "mock-token-123";
      const payload = verifyAccessToken(token);

      expect(payload).toEqual({ userId: "123" });
    });

    it("should return null for invalid access token", () => {
      const token = "invalid-token";
      const payload = verifyAccessToken(token);

      expect(payload).toBeNull();
    });
  });

  describe("verifyRefreshToken", () => {
    it("should verify a valid refresh token", () => {
      const token = "mock-token-123";
      const payload = verifyRefreshToken(token);

      expect(payload).toEqual({ userId: "123" });
    });

    it("should return null for invalid refresh token", () => {
      const token = "invalid-token";
      const payload = verifyRefreshToken(token);

      expect(payload).toBeNull();
    });
  });
});
