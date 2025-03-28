import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/dashboard"];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const {
    nextUrl: { pathname },
  } = req;

  const isPrivateRoute = protectedRoutes.some((route) => route === pathname);
  const isAuthRoute = pathname.startsWith("/auth");
  const isApiRoute = pathname.startsWith("/api");

  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
