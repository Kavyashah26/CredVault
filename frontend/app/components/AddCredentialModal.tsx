"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertCircle, X } from 'lucide-react'
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
  }

  const validateForm = (): boolean => {
    let isValid = true

    // Reset errors
    setNameError(null)
    setValueError(null)

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

      const response = await fetch(`${process.env.BACKEND_API_URL}/api/credentials/${projectId}`, {
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Credential</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
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
                  className={nameError ? "border-red-500" : ""}
                  required
                  disabled={isLoading}
                />
                {nameError && <p className="text-sm text-red-500">{nameError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="credentialType" className="text-right">
                Type
              </label>
              <Select onValueChange={setCredentialType} value={credentialType} disabled={isLoading} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select credential type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api_key">API Key</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="token">Access Token</SelectItem>
                  <SelectItem value="secret">Secret Key</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>
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
                  className={valueError ? "border-red-500" : ""}
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
                className="col-span-3"
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
                    className="flex-grow"
                  />
                  <Button type="button" onClick={addTag} disabled={isLoading || !tagInput.trim()} className="ml-2">
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
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
