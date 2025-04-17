"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function redirectToOrganization(organizationId: string, role: string) {
  // Set a server-side cookie with the role
  (await
        // Set a server-side cookie with the role
        cookies()).set("org_role", role, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  })
  console.log(" I have added cookie with role", role);
  
  // Redirect to the organization page
  redirect(`/dashboard/organization/${organizationId}`)
}

