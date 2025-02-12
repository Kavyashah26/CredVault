// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/hooks/use-toast"
// // import { toast } from "@/components/ui/use-toast"


// interface InviteMembersProps {
//   orgId: string
// }

// export function InviteMembers({ orgId }: InviteMembersProps) {
//   const [emails, setEmails] = useState("")
//   const [message, setMessage] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleInvite = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1]

//       const response = await fetch(`https://admin-credvault.vercel.app/api/organizations/${orgId}/invite`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           emails: emails.split(",").map((email) => email.trim()),
//           message,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to send invitations")
//       }

//       toast({
//         title: "Invitations sent",
//         description: "Your invitations have been sent successfully.",
//       })

//       setEmails("")
//       setMessage("")
//     } catch (error) {
//       console.error("Error sending invitations:", error)
//       toast({
//         title: "Error",
//         description: "Failed to send invitations. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleInvite} className="space-y-4">
//       <div>
//         <Label htmlFor="emails">Email Addresses</Label>
//         <Input
//           id="emails"
//           placeholder="Enter email addresses, separated by commas"
//           value={emails}
//           onChange={(e) => setEmails(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="message">Invitation Message (Optional)</Label>
//         <Textarea
//           id="message"
//           placeholder="Enter a personal message to include with the invitation"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </div>
//       <Button type="submit" disabled={isLoading}>
//         {isLoading ? "Sending Invitations..." : "Send Invitations"}
//       </Button>
//     </form>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface InviteMembersProps {
  orgId: string
}

export function InviteMembers({ orgId }: InviteMembersProps) {
  const [emails, setEmails] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendInvites = async (emailList: string[], inviteMessage: string) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await fetch(`https://admin-credvault.vercel.app/api/organizations/${orgId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        emails: emailList,
        message: inviteMessage,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to send invitations")
    }

    return await response.json()
  }

  // const handleInvite = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     const emailList = emails
  //       .split(",")
  //       .map((email) => email.trim())
  //       .filter(Boolean)

  //     if (emailList.length === 0) {
  //       throw new Error("Please enter at least one valid email address")
  //     }

  //     const result = await sendInvites(emailList, message)

  //     toast({
  //       title: "Invitations sent",
  //       description: `Successfully sent ${result.sentInvitations} invitation(s).`,
  //     })

  //     setEmails("")
  //     setMessage("")
  //   } catch (error) {
  //     console.error("Error sending invitations:", error)
  //     toast({
  //       title: "Error",
  //       description: error instanceof Error ? error.message : "Failed to send invitations. Please try again.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const emailList = emails
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);
  
      if (emailList.length === 0) {
        throw new Error("Please enter at least one valid email address");
      }
  
      const result = await sendInvites(emailList, message);
  
      toast({
        title: "Invitations sent",
        description: `Successfully sent ${result.sentInvitations} invitation(s).`,
      });
  
      setEmails("");
      setMessage("");
    } catch (error) {
      console.error("Error sending invitations:", error);
  
      if (error instanceof Error) {
        // Check if the error is from the server and contains the expected fields
        try {
          const parsedError = JSON.parse(error.message);
          toast({
            title: parsedError.message || "Error",
            description: parsedError.error || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        } catch {
          // Fallback if the error is not JSON-parsable
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to send invitations. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Members</CardTitle>
        <CardDescription>Send invitations to new team members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <Label htmlFor="emails">Email Addresses</Label>
            <Input
              id="emails"
              placeholder="Enter email addresses, separated by commas"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Invitation Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Enter a personal message to include with the invitation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending Invitations..." : "Send Invitations"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

