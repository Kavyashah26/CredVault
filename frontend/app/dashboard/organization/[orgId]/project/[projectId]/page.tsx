"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
import AddCredentialModal from "@/app/components/AddCredentialModal"
import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
import ProjectMembers from "@/app/components/project-members"
import CredentialCard from "@/app/components/credential-card"

// Interfaces from your original code
interface TagObject {
  id: string
  name: string
}

interface CreatedBy {
  id: string
  name: string
}

interface Credential {
  id: string
  name: string
  type: string
  value?: string
  description: string
  createdBy: CreatedBy
  tags: TagObject[]
  lastUpdated?: string
  updatedBy?: string
}

export default function ProjectPage() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("credentials")
  const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])

  const params = useParams()

  // Safely extract projectId and orgId from params
  const projectId = params?.projectId as string
  const orgId = params?.orgId as string

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      // add logic to check admin
      const orgRole = "ADMIN"
      setIsAdmin(orgRole === "ADMIN")
    }

    checkAdminStatus()
  }, [])

  useEffect(() => {
    if (!projectId) return
    const fetchCredentials = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get the authentication token from cookie
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]

        if (!token) {
          throw new Error("Authentication token not found. Please log in again.")
        }

        const response = await fetch(`http://localhost:5000/api/credentials/project/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch credentials: ${response.statusText}`)
        }

        const data = await response.json()
        setCredentials(data)
      } catch (err) {
        console.error("Error fetching credentials:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch credentials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCredentials()
  }, [projectId])

  const toggleCredentialVisibility = async (credentialId: string) => {
    // If already visible, just hide it
    if (visibleCredentials.includes(credentialId)) {
      setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
      return
    }

    // Set loading state
    setLoadingCredentials((prev) => [...prev, credentialId])

    // If not visible, fetch the credential value from the server
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.")
      }

      const response = await fetch(`http://localhost:5000/api/credentials/${credentialId}/project/${projectId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch credential: ${response.statusText}`)
      }

      const data = await response.json()

      // Update the credential in the credentials array with the fetched value
      setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

      // Add to visible credentials
      setVisibleCredentials((prev) => [...prev, credentialId])
    } catch (err) {
      console.error("Error fetching credential:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch credential")
    } finally {
      // Remove loading state
      setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
    }
  }

  const handleUpdateCredential = (credential: Credential) => {
    setSelectedCredential(credential)
    setIsUpdateModalOpen(true)
  }

  const handleDeleteCredential = (credential: Credential) => {
    setSelectedCredential(credential)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteCredential = async () => {
    if (!selectedCredential || !projectId) return

    setDeleteLoading(true)
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await fetch(
        `http://localhost:5000/api/credentials/${selectedCredential.id}/project/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectId }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to delete credential")
      }

      // Remove the credential from the state
      setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
      setIsDeleteDialogOpen(false)
      setSelectedCredential(null)
    } catch (err) {
      console.error("Error deleting credential:", err)
      setError(err instanceof Error ? err.message : "Failed to delete credential")
    } finally {
      setDeleteLoading(false)
    }
  }

  const refreshCredentials = async () => {
    if (!projectId) return

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

      const response = await fetch(`http://localhost:5000/api/credentials/project/${projectId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to refresh credentials")
      }

      const data = await response.json()

      setCredentials(data)
    } catch (err) {
      console.error("Error refreshing credentials:", err)
      setError(err instanceof Error ? err.message : "Failed to refresh credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const canAddCredential = true // Temporarily set to true for testing

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <div className="flex space-x-2">
            {canAddCredential && activeTab === "credentials" && (
              <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="credentials">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : credentials.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <h3 className="text-xl font-medium mb-2">No credentials found</h3>
                <p className="text-gray-500 mb-4">Add your first credential to get started</p>
                <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {credentials.map((credential, index) => (
                  <CredentialCard
                    key={credential.id}
                    credential={credential}
                    index={index}
                    isVisible={visibleCredentials.includes(credential.id)}
                    isLoading={loadingCredentials.includes(credential.id)}
                    isAdmin={isAdmin}
                    onToggleVisibility={toggleCredentialVisibility}
                    onUpdate={handleUpdateCredential}
                    onDelete={handleDeleteCredential}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="members">
            <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
          </TabsContent>
        </Tabs>

        <AddCredentialModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          projectId={projectId}
          onCredentialAdded={refreshCredentials}
          existingCredentials={credentials}
        />

        {selectedCredential && (
          <UpdateCredentialModal
            isOpen={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false)
              setSelectedCredential(null)
            }}
            credential={selectedCredential}
            projectId={projectId}
            onCredentialUpdated={refreshCredentials}
          />
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteCredential}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}

