"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, ArrowRight, UserPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { MembersList } from "@/app/components/members-list"
import { InviteMembers } from "@/app/components/invite-members"
import { OrganizationSettings } from "@/app/components/organization-settings"


interface Project {
  id: string
  name: string
  role: string
  memberCount: number
  lastActive: string
  orgName: string
}

interface Member {
  userId: string
  user: {
    name: string
  }
  role: string
  addedAt: string
}

interface OrganizationDetails {
  id: string
  name: string
  description: string
  memberCount: number
  projectCount: number
  createdAt: string
  creator: {
    name: string
  }
  members: Member[]
}

interface OrganizationPageClientProps {
  orgId: string
  role: string
}

export default function OrganizationPageClient({ orgId, role }: OrganizationPageClientProps) {
  const [organization, setOrganization] = useState<OrganizationDetails | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [showInviteForm, setShowInviteForm] = useState(false)
  const pathname = usePathname()
  const canCreateProject = role === "ADMIN"

  const fetchOrganizationDetails = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
      // const response = await fetch(`https://admin-credvault.vercel.app/api/organizations/${orgId}`, {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizations/${orgId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch organization details")
      }
      const data = await response.json()
      setOrganization(data)
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching organization details:", error)
    }
  },[orgId])

  const fetchProjects = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizations/${orgId}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      const data1 = data.data
      setProjects(Array.isArray(data1) ? data1 : [])
    } catch (error) {
      console.error("Error fetching projects:", error)
      setProjects([])
    }
  },[orgId])
  useEffect(() => {
    fetchOrganizationDetails()
    fetchProjects()
    console.log(organization);
    
  }, [fetchOrganizationDetails, fetchProjects]) // Dependencies are now stable
  

  if (!organization) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{organization.name}</h1>
        <p className="text-gray-600">{organization.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {canCreateProject ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{organization.projectCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{organization.memberCount}</div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Total Projects: {organization.projectCount || "N/A"}</div>
              <div className="text-2xl font-bold">Total Members: {organization.memberCount || "N/A"}</div>
              <div className="text-lg mt-2">Admin: {organization.creator.name}</div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Created At</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(organization.createdAt).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          {role === "ADMIN" && <TabsTrigger value="settings">Settings</TabsTrigger>}
        </TabsList>
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Projects</h2>
            {canCreateProject && (
              <Link href={`/dashboard/organization/${orgId}/new-project`}>
                <Button>Create New Project</Button>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <CardDescription>Role: {project.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{project.memberCount} Members</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                          <span>Active {project.lastActive}</span>
                        </div>
                      </div>
                      <Link href={`/dashboard/organization/${orgId}/project/${project.id}`}>
                        <Button className="w-full">
                          View Credentials
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="members">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Members</h2>
            {role === "ADMIN" && (
              <Button onClick={() => setShowInviteForm(!showInviteForm)}>
                <UserPlus className="mr-2 h-4 w-4" />
                {showInviteForm ? "Hide Invite Form" : "Invite Member"}
              </Button>
            )}
          </div>
          {showInviteForm && role === "ADMIN" && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Invite Members</CardTitle>
                <CardDescription>Send invitations to new members</CardDescription>
              </CardHeader>
              <CardContent>
                <InviteMembers orgId={orgId} />
              </CardContent>
            </Card>
          )}
          {organization.members.length > 0 ? (
            <MembersList members={organization.members} orgId={orgId} onMemberRemoved={fetchOrganizationDetails} isAdmin={canCreateProject} projectId={""}/>
          ) : (
            <p>No members found.</p>
          )}
        </TabsContent>
        {role === "ADMIN" && (
          <TabsContent value="settings">
            <OrganizationSettings
              orgId={orgId}
              initialName={organization.name}
              initialDescription={organization.description}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

