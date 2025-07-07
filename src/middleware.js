import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const ROLE_DASHBOARD = {
  admin: "/admin/dashboard",
  user: "/",
};

export async function middleware(req) {
  const token = req.cookies.get("genx_access_token")?.value;
  console.log("token in middleware: ", token);
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forget-password/verify-email") ||
    pathname.startsWith("/auth/forget-password/verify-otp") ||
    pathname.startsWith("/auth/new-password");

  const isProtectedAdminRoute = pathname.startsWith("/admin");

  const isProtectedUserRoute =
    pathname.startsWith("/cv-creation") ||
    pathname.startsWith("/cv-matching") ||
    // pathname.startsWith("/jobs") ||
    // pathname.startsWith("/contact") ||
    // pathname.startsWith("/about") ||
    pathname.startsWith("/user/profile-update") ||
    pathname.startsWith("/user/password-update");

  // Prevent direct access to verify-otp or new-password without emailVerified cookie
  const isOTPPage = pathname.startsWith("/auth/forget-password/verify-otp");
  const isNewPasswordPage = pathname.startsWith("/auth/new-password");
  const emailVerified = req.cookies.get("emailVerified")?.value;

  if ((isOTPPage || isNewPasswordPage) && !emailVerified) {
    return NextResponse.redirect(
      new URL("/auth/forget-password/verify-email", req.url)
    );
  }

  //  No token
  if (!token) {
    if (isProtectedUserRoute || isProtectedAdminRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  // Token exists
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role || "user";

    // Redirect logged-in users away from auth pages
    if (isAuthPage) {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    // Role-based route blocking
    if (isProtectedAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    if (isProtectedUserRoute && role !== "user") {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.set("genx_access_token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|fonts|api).*)"],
};
