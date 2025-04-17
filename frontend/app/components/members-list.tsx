"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { UserMinus, UserPlus, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"

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

interface MembersListProps {
  members: Member[]
  orgId: string
  projectId?: string // Optional project ID for when in project context
  onMemberRemoved: () => void
  isAdmin: boolean
  showAddMembersButton?: boolean // Optional flag to show add members button
  onAddMembersClick?: () => void // Optional callback for add members button
}

export function MembersList({
  members,
  orgId,
  projectId,
  onMemberRemoved,
  isAdmin,
  showAddMembersButton = false,
  onAddMembersClick,
}: MembersListProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null)

  const isProjectContext = !!projectId

  // Generate a unique token for a member in a project
  const generateAndCopyToken = (userId: string) => {
    if (!projectId) return;
  
    // Step 1: Combine with a separator
    const rawToken = `${projectId}::${userId}`;
  
    // Step 2: Encode to base64
    const encoded = btoa(rawToken); // window.btoa() is safe to use in browsers
  
    // Step 3: Optional: Add prefix or salt to make it look more obscure
    const token = `tok_${encoded}`;
  
    // Copy to clipboard
    navigator.clipboard
      .writeText(token)
      .then(() => {
        toast({
          title: "Token copied to clipboard",
          description: "The unique access token has been copied to your clipboard.",
        });
      })
      .catch((error) => {
        console.error("Error copying token:", error);
        toast({
          title: "Failed to copy token",
          description: "Please try again or manually select and copy the token.",
          variant: "destructive",
        });
      });
  };
  

  const handleRemoveMember = async () => {
    if (!memberToRemove) return

    // Don't allow removing admin from project
    if (memberToRemove.role === "ADMIN" && isProjectContext) {
      toast({
        title: "Cannot remove admin",
        description: "Admins are default members of all projects and cannot be removed.",
        variant: "destructive",
      })
      setMemberToRemove(null)
      return
    }

    setIsRemoving(true)
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      // Use different API endpoint based on context (org or project)
      const endpoint = isProjectContext
        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/projects/${projectId}/users/${memberToRemove.userId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizations/${orgId}/members/${memberToRemove.userId}`

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to remove member from ${isProjectContext ? "project" : "organization"}`)
      }

      toast({
        title: "Member removed",
        description: `${memberToRemove.user.name} has been removed from the ${isProjectContext ? "project" : "organization"}.`,
      })
      onMemberRemoved()
    } catch (error) {
      console.error("Error removing member:", error)
      toast({
        title: "Error",
        description: `Failed to remove member from ${isProjectContext ? "project" : "organization"}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsRemoving(false)
      setMemberToRemove(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-xl font-semibold">{isProjectContext ? "Project" : "Organization"} Members</h2> */}
        {showAddMembersButton && isAdmin && (
          <Button onClick={onAddMembersClick}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Members
          </Button>
        )}
      </div>

      {members.length === 0 ? (
        <p className="text-muted-foreground">No members found.</p>
      ) : (
        members.map((member) => (
          <Card key={member.userId}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {member.user.image ? (
                    <AvatarImage src={member.user.image} alt={member.user.name} />
                  ) : (
                    <AvatarFallback>{member.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{member.user.name}</p>
                  {member.user.email && <p className="text-sm text-muted-foreground">{member.user.email}</p>}
                  <p className="text-sm text-muted-foreground">
                    Joined {new Date(member.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={member.role === "ADMIN" ? "default" : "secondary"}>{member.role}</Badge>

                {/* Token generation button - only visible in project context */}
                {isProjectContext && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateAndCopyToken(member.userId)}
                    title="Generate access token for this member"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Get Token
                  </Button>
                )}

                {/* Don't show remove button for admins in project and organization's context */}
                {((member.role !== "ADMIN" )) && isAdmin && (
                  <Button variant="outline" size="sm" onClick={() => setMemberToRemove(member)}>
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
                {member.role === "ADMIN" && isProjectContext && <Badge variant="outline">Default Member</Badge>}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove {memberToRemove?.user.name} from the
              {isProjectContext ? " project" : " organization"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

