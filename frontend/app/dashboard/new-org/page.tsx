"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"


export default function CreateOrganizationPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/organizations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create organization")
      }

      const data = await response.json()

      toast({
        title: "Organization created",
        description: "Your new organization has been created successfully.",
      })
      console.log(data);
      
      router.push(`/dashboard/organization/${data.organization.id}`)
    } catch (error) {
      console.error("Error creating organization:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create organization. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Organization</CardTitle>
          <CardDescription>Set up a new organization for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <Label htmlFor="org-description">Organization Description</Label>
              <Textarea
                id="org-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description of your organization"
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Organization"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

