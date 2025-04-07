"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { MembersList } from "@/app/components/members-list"

interface Member {
  userId: string
  user: {
    name: string
    email?: string
    image?: string
  }
  role: string
  addedAt: string
}

interface ProjectMembersProps {
  projectId: string
  orgId: string
  isAdmin: boolean
}

export default function ProjectMembers({ projectId, orgId, isAdmin }: ProjectMembersProps) {
  const [projectMembers, setProjectMembers] = useState<Member[]>([])
  const [orgMembers, setOrgMembers] = useState<Member[]>([])
  const [showAddMembers, setShowAddMembers] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [memberRoles, setMemberRoles] = useState<Record<string, "PROJECT_MANAGER" | "MEMBER">>({})
  const [isLoading, setIsLoading] = useState(false)
  const [addingMembers, setAddingMembers] = useState(false)

  // Fetch project members
  const fetchProjectMembers = async () => {
    setIsLoading(true)
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      const response = await fetch(`https://admin-credvault.vercel.app/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch project members")
      }

      const data = await response.json()
      // const projectData = await projectResponse.json()
      const projectMembersData = data.members || []
      setProjectMembers(projectMembersData)
      // setProjectMembers(data)
    } catch (error) {
      console.error("Error fetching project members:", error)
      toast({
        title: "Error",
        description: "Failed to load project members. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch organization members
  const fetchOrgMembers = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      const response = await fetch(`https://admin-credvault.vercel.app/api/organizations/${orgId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch organization details")
      }

      const data = await response.json()
      setOrgMembers(data.members || [])
    } catch (error) {
      console.error("Error fetching organization members:", error)
      toast({
        title: "Error",
        description: "Failed to load organization members. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Add members to project
  const addMembersToProject = async () => {
    if (selectedMembers.length === 0) return

    setAddingMembers(true)
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      // const response = await fetch(`https://admin-credvault.vercel.app/api/projects/${projectId}/assign`, {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/assign`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIds: selectedMembers.map((userId) => ({
            userId,
            role: memberRoles[userId] || "MEMBER",
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add members to project")
      }

      toast({
        title: "Success",
        description: `${selectedMembers.length} member(s) added to the project.`,
      })

      // Reset and refresh
      setSelectedMembers([])
      setMemberRoles({})
      setShowAddMembers(false)
      fetchProjectMembers()
    } catch (error) {
      console.error("Error adding members to project:", error)
      toast({
        title: "Error",
        description: "Failed to add members to the project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingMembers(false)
    }
  }

  // Toggle member selection
  const toggleMemberSelection = (userId: string) => {
    setSelectedMembers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  // Handle role change for a member
  const handleRoleChange = (userId: string, role: "PROJECT_MANAGER" | "MEMBER") => {
    setMemberRoles((prev) => ({
      ...prev,
      [userId]: role,
    }))
  }

  // Check if a member is already in the project
  const isAlreadyInProject = (userId: string) => {
    return projectMembers.some((member) => member.userId === userId)
  }

  // Check if a member is an admin in the organization
  const isOrgAdmin = (member: Member) => {
    return member.role === "ADMIN"
  }

  // async function getOrgRole() {
  //   const headersList = headers()
  //   return (await headersList).get("x-org-role") || "MEMBER"
  // }

  // Load data on component mount
  useEffect(() => {
    fetchProjectMembers()
    fetchOrgMembers()
  }, [projectId, orgId])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-red-500">Project Members</h2>
        {isAdmin && (
          <Button
            onClick={() => {
              setShowAddMembers(!showAddMembers)
              if (!showAddMembers) {
                fetchOrgMembers() // Refresh org members when opening
              } else {
                setSelectedMembers([])
                setMemberRoles({})
              }
            }}
          >
            {showAddMembers ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Members
              </>
            )}
          </Button>
        )}
      </div>

      {showAddMembers && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Organization Members to Project</CardTitle>
            <CardDescription>Select members from your organization to add to this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orgMembers.length === 0 ? (
                <p className="text-muted-foreground">No organization members found.</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orgMembers.map((member) => {
                      const alreadyInProject = isAlreadyInProject(member.userId)
                      const isAdmin = isOrgAdmin(member)
                      // Admin is considered already in the project by default
                      const effectivelyInProject = alreadyInProject || isAdmin

                      return (
                        <div
                          key={member.userId}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            effectivelyInProject ? "bg-muted/50" : "hover:bg-accent/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`member-${member.userId}`}
                              checked={selectedMembers.includes(member.userId) || isAdmin}
                              onCheckedChange={() => toggleMemberSelection(member.userId)}
                              disabled={effectivelyInProject}
                            />
                            <Avatar>
                              {member.user.image ? (
                                <AvatarImage src={member.user.image} alt={member.user.name} />
                              ) : (
                                <AvatarFallback>{member.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.user.name}</p>
                              {member.user.email && (
                                <p className="text-sm text-muted-foreground">{member.user.email}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!effectivelyInProject && selectedMembers.includes(member.userId) && (
                              <select
                                className="p-1 text-sm border rounded"
                                value={memberRoles[member.userId] || "MEMBER"}
                                onChange={(e) =>
                                  handleRoleChange(member.userId, e.target.value as "PROJECT_MANAGER" | "MEMBER")
                                }
                              >
                                <option value="MEMBER">MEMBER</option>
                                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                              </select>
                            )}
                            <Badge variant={isAdmin ? "default" : "secondary"}>{member.role}</Badge>
                            {alreadyInProject && <Badge variant="outline">Already in project</Badge>}
                            {isAdmin && !alreadyInProject && <Badge variant="outline">Default member</Badge>}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button onClick={addMembersToProject} disabled={selectedMembers.length === 0 || addingMembers}>
                      {addingMembers ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Selected Members
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <MembersList
          members={projectMembers}
          orgId={orgId}
          projectId={projectId}
          onMemberRemoved={fetchProjectMembers}
          isAdmin={isAdmin}
          showAddMembersButton={false}
        />
      )}
    </div>
  )
}

