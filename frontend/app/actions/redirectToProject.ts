
"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function redirectToProject(orgId: string,projectId: string, role: string) {
  const cookieStore = cookies()
  const cookieName = `project_role_${projectId}`
  // Set the role for the project
  ;(await
        // Set the role for the project
        cookieStore).set(cookieName, role, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  })

  // Redirect to the project page
  redirect(`/dashboard/organization/${orgId}/project/${projectId}`)
}
