// import { Card, CardContent } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"

// interface Member {
//   userId: string
//   user: {
//     name: string
//   }
//   role: string
//   addedAt: string
// }

// interface MembersListProps {
//   members: Member[]
// }

// export function MembersList({ members }: MembersListProps) {
//   return (
//     <div className="space-y-4">
//       {members.map((member) => (
//         <Card key={member.userId}>
//           <CardContent className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarFallback>{member.user.name.charAt(0).toUpperCase()}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium">{member.user.name}</p>
//                 <p className="text-sm text-muted-foreground">
//                   Joined {new Date(member.addedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
//               {member.role}
//             </Badge>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { UserMinus } from "lucide-react"
import { toast } from "@/hooks/use-toast"


interface Member {
  userId: string
  user: {
    name: string
  }
  role: string
  addedAt: string
}

interface MembersListProps {
  members: Member[]
  orgId: string
  onMemberRemoved: () => void
  isAdmin:boolean
}

export function MembersList({ members, orgId, onMemberRemoved,isAdmin }: MembersListProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null)

  const handleRemoveMember = async () => {
    if (!memberToRemove) return

    setIsRemoving(true)
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      const response = await fetch(
        `http://localhost:5000/api/organizations/${orgId}/members/${memberToRemove.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to remove member")
      }

      toast({
        title: "Member removed",
        description: `${memberToRemove.user.name} has been removed from the organization.`,
      })
      onMemberRemoved()
    } catch (error) {
      console.error("Error removing member:", error)
      toast({
        title: "Error",
        description: "Failed to remove member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRemoving(false)
      setMemberToRemove(null)
    }
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card key={member.userId}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{member.user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.user.name}</p>
                <p className="text-sm text-muted-foreground">Joined {new Date(member.addedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={member.role === "ADMIN" ? "default" : "secondary"}>{member.role}</Badge>
              {member.role !== "ADMIN" && isAdmin && (
                <Button variant="outline" size="sm" onClick={() => setMemberToRemove(member)}>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={!!memberToRemove} onOpenChange={() => setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove {memberToRemove?.user.name} from the
              organization.
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

