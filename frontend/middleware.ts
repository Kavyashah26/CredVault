

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
  const requestHeaders = new Headers(request.headers)
  if (pathname.startsWith("/dashboard/organization/")) {
    const orgRole = request.cookies.get("org_role")?.value

    if (!orgRole) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    requestHeaders.set("x-org-role", orgRole)

    const match = pathname.match(/^\/dashboard\/organization\/([^\/]+)\/project\/([^\/]+)/)
    if (match) {
      const projectId = match[2]
      const projectRole = request.cookies.get(`project_role_${projectId}`)?.value

      if (!projectRole) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      requestHeaders.set("x-project-role", projectRole)
    }

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

