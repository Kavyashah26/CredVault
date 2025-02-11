

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Array of public routes that don't require authentication
const publicRoutes = ["/", "/login", "/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log("Middleware called for:", pathname)

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get("token")?.value

  if (!token) {
    // If no token is found, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Special handling for organization routes
  if (pathname.startsWith("/dashboard/organization/")) {
    const role = request.cookies.get("org_role")?.value

    if (!role) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-org-role", role)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    // response.cookies.delete("org_role")

    return response
  }

  return NextResponse.next()
}

export const config = {
  // Run the middleware on all routes
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}

