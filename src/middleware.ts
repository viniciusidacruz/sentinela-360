import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "./shared/constants/routes";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === ROUTES.HOME) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
}

export const config = {
  matcher: "/",
};
