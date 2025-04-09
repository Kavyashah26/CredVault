"use server"

import { cookies } from "next/headers"

export async function checkAdminStatus(projectId: string) {
  const cookieStore = cookies()
  
  // Check for org role in cookies
  const orgRole = (await cookieStore).get("org_role")?.value
  
  // Check for project-specific role in cookies
  const projectRole = (await cookieStore).get(`project_role_${projectId}`)?.value
  
  // User is admin if they have admin role at org or project level
  const isOrgAdmin = orgRole === "ADMIN"
  const isProjectAdmin = projectRole === "PROJECT_MANAGER"
  
  return isOrgAdmin || isProjectAdmin
}
