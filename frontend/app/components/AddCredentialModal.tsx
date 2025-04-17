"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertCircle, X, Key, Lock, CoinsIcon as Token, FileKey, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface AddCredentialModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string | undefined
  onCredentialAdded?: () => void
  existingCredentials?: { name: string }[]
}

type CredentialType = {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

export default function AddCredentialModal({
  isOpen,
  onClose,
  projectId,
  onCredentialAdded,
  existingCredentials,
}: AddCredentialModalProps) {
  const [credentialName, setCredentialName] = useState("")
  const [credentialType, setCredentialType] = useState("")
  const [credentialValue, setCredentialValue] = useState("")
  const [description, setDescription] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)
  const [valueError, setValueError] = useState<string | null>(null)
  const [typeError, setTypeError] = useState<string | null>(null)

  const credentialTypes: CredentialType[] = [
    {
      id: "api_key",
      name: "API Key",
      icon: Key,
      description: "Used to authenticate API requests",
    },
    {
      id: "password",
      name: "Password",
      icon: Lock,
      description: "Secure access to accounts and services",
    },
    {
      id: "token",
      name: "Access Token",
      icon: Token,
      description: "Temporary credentials for authentication",
    },
    {
      id: "secret",
      name: "Secret Key",
      icon: FileKey,
      description: "Private keys used for encryption/signing",
    },
    {
      id: "certificate",
      name: "Certificate",
      icon: FileText,
      description: "Digital certificates for secure connections",
    },
  ]

  const resetForm = () => {
    setCredentialName("")
    setCredentialType("")
    setCredentialValue("")
    setDescription("")
    setTagInput("")
    setTags([])
    setError(null)
    setNameError(null)
    setValueError(null)
    setTypeError(null)
  }

  const validateForm = (): boolean => {
    let isValid = true

    // Reset errors
    setNameError(null)
    setValueError(null)
    setTypeError(null)

    // Check for unique name
    if (existingCredentials?.some((cred) => cred.name.toLowerCase() === credentialName.toLowerCase())) {
      setNameError("Credential name must be unique")
      isValid = false
    }

    // Check for empty value
    if (!credentialValue.trim()) {
      setValueError("Credential value cannot be empty")
      isValid = false
    }

    // Check for credential type
    if (!credentialType) {
      setTypeError("Please select a credential type")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get the authentication token from localStorage
      // const token = localStorage.getItem("authToken")
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${projectId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentialName,
          type: credentialType,
          value: credentialValue,
          description,
          tags,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `Failed to add credential: ${response.statusText}`)
      }

      // Call the callback to refresh the credentials list
      if (onCredentialAdded) {
        onCredentialAdded()
      }

      // Reset form and close modal
      resetForm()
      onClose()
    } catch (err) {
      console.error("Error adding credential:", err)
      setError(err instanceof Error ? err.message : "Failed to add credential")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Credential</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4 rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="credentialName" className="text-right">
                Name
              </label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="credentialName"
                  value={credentialName}
                  onChange={(e) => {
                    setCredentialName(e.target.value)
                    if (nameError) setNameError(null)
                  }}
                  className={`rounded-full ${nameError ? "border-red-500" : ""}`}
                  required
                  disabled={isLoading}
                />
                {nameError && <p className="text-sm text-red-500">{nameError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right pt-2">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="col-span-3 space-y-1">
                <div className="grid grid-cols-2 gap-2">
                  {credentialTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`
            flex items-center p-2 rounded-xl cursor-pointer border transition-all
            ${credentialType === type.id ? "border-black bg-black/5" : "border-gray-200 hover:border-gray-300"}
          `}
                      onClick={() => {
                        setCredentialType(type.id)
                        if (typeError) setTypeError(null)
                      }}
                    >
                      <div
                        className={`
            p-1.5 rounded-full mr-2
            ${credentialType === type.id ? "bg-black text-white" : "bg-gray-100 text-gray-500"}
          `}
                      >
                        <type.icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm">
                        <h4 className="font-medium">{type.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                {typeError && <p className="text-sm text-red-500">{typeError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="credentialValue" className="text-right">
                Value
              </label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="credentialValue"
                  value={credentialValue}
                  onChange={(e) => {
                    setCredentialValue(e.target.value)
                    if (valueError) setValueError(null)
                  }}
                  className={`rounded-full ${valueError ? "border-red-500" : ""}`}
                  type="password"
                  required
                  disabled={isLoading}
                />
                {valueError && <p className="text-sm text-red-500">{valueError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right pt-2">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 rounded-xl"
                placeholder="Optional description for this credential"
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="tags" className="text-right pt-2">
                Tags
              </label>
              <div className="col-span-3 space-y-2">
                <div className="flex">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tags (press Enter)"
                    disabled={isLoading}
                    onKeyDown={handleTagKeyDown}
                    className="flex-grow rounded-full"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    disabled={isLoading || !tagInput.trim()}
                    className="ml-2 rounded-full"
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 rounded-full">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-gray-200 rounded-full p-0.5"
                          disabled={isLoading}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading} className="rounded-full">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-full bg-black text-white hover:bg-gray-800">
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                  Adding...
                </>
              ) : (
                "Add Credential"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
