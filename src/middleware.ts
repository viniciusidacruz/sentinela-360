import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyRefreshToken } from "@/shared/lib";
import { ROUTES, COOKIES } from "@/shared/constants";

const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIES.REFRESH_TOKEN)?.value;

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (!isPublicRoute) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    if (!accessToken && refreshToken) {
      const payload = verifyRefreshToken(refreshToken);

      if (!payload) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
