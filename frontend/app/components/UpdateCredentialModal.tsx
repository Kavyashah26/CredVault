"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface Credential {
  id: string
  name: string
  type: string
  value?: string
  description: string
  createdBy: {
    id: string
    name: string
  }
  tags: {
    id: string
    name: string
  }[]
  lastUpdated?: string
  updatedBy?: string
}

interface UpdateCredentialModalProps {
  isOpen: boolean
  onClose: () => void
  credential: Credential
  projectId?: string
  onCredentialUpdated: () => void
}

const UpdateCredentialModal: React.FC<UpdateCredentialModalProps> = ({
  isOpen,
  onClose,
  credential,
  projectId,
  onCredentialUpdated,
}) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (credential) {
      setName(credential.name || "")
      setType(credential.type || "")
      setValue(credential.value || "")
      setDescription(credential.description || "")
    }
  }, [credential])

  const handleSubmit = async () => {
    if (!projectId || !credential.id) {
      setError("Project ID and Credential ID are required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credential.id}/project/${projectId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectId,
          name: name,
          type: type,
          value: value,
          description: description,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update credential")
      }

      onCredentialUpdated()
      onClose()
    } catch (err) {
      console.error("Error updating credential:", err)
      setError(err instanceof Error ? err.message : "Failed to update credential")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Credential</AlertDialogTitle>
          <AlertDialogDescription>Update the details for "{credential?.name}".</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-name" className="text-right">
              Name
            </Label>
            <Input id="update-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-type" className="text-right">
              Type
            </Label>
            <Input id="update-type" value={type} onChange={(e) => setType(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-value" className="text-right">
              Value
            </Label>
            <Input id="update-value" value={value} onChange={(e) => setValue(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-description" className="text-right">
              Description
            </Label>
            <Input
              id="update-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          {error && <div className="text-red-500 col-span-4">{error}</div>}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div> : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateCredentialModal

