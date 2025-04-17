// // // // // // "use client"

// // // // // // import { useParams } from "next/navigation"
// // // // // // import { useState, useEffect } from "react"
// // // // // // import { Button } from "@/components/ui/button"
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // // // import { AlertCircle } from "lucide-react"
// // // // // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // // // // import {
// // // // // //   AlertDialog,
// // // // // //   AlertDialogAction,
// // // // // //   AlertDialogCancel,
// // // // // //   AlertDialogContent,
// // // // // //   AlertDialogDescription,
// // // // // //   AlertDialogFooter,
// // // // // //   AlertDialogHeader,
// // // // // //   AlertDialogTitle,
// // // // // // } from "@/components/ui/alert-dialog"
// // // // // // import AddCredentialModal from "@/app/components/AddCredentialModal"
// // // // // // import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// // // // // // import ProjectMembers from "@/app/components/project-members"
// // // // // // import CredentialCard from "@/app/components/credential-card"

// // // // // // // Interfaces from your original code
// // // // // // interface TagObject {
// // // // // //   id: string
// // // // // //   name: string
// // // // // // }

// // // // // // interface CreatedBy {
// // // // // //   id: string
// // // // // //   name: string
// // // // // // }

// // // // // // interface Credential {
// // // // // //   id: string
// // // // // //   name: string
// // // // // //   type: string
// // // // // //   value?: string
// // // // // //   description: string
// // // // // //   createdBy: CreatedBy
// // // // // //   tags: TagObject[]
// // // // // //   lastUpdated?: string
// // // // // //   updatedBy?: string
// // // // // // }

// // // // // // export default function ProjectPage() {
// // // // // //   const [credentials, setCredentials] = useState<Credential[]>([])
// // // // // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
// // // // // //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
// // // // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // // // //   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
// // // // // //   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
// // // // // //   const [isLoading, setIsLoading] = useState(true)
// // // // // //   const [error, setError] = useState<string | null>(null)
// // // // // //   const [isAdmin, setIsAdmin] = useState(false)
// // // // // //   const [deleteLoading, setDeleteLoading] = useState(false)
// // // // // //   const [activeTab, setActiveTab] = useState("credentials")
// // // // // //   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])

// // // // // //   const params = useParams()

// // // // // //   // Safely extract projectId and orgId from params
// // // // // //   const projectId = params?.projectId as string
// // // // // //   const orgId = params?.orgId as string

// // // // // //   // Check if user is admin
// // // // // //   useEffect(() => {
// // // // // //     // const checkAdminStatus = () => {
// // // // // //     //   // add logic to check admin
// // // // // //     //   const orgRole = document.cookie
// // // // // //     //     .split("; ")
// // // // // //     //     .find((row) => row.startsWith("org_role="))
// // // // // //     //     ?.split("=")[1]

// // // // // //     //   // Check for project-specific role in cookies
// // // // // //     //   const projectRoleCookie = document.cookie
// // // // // //     //     .split("; ")
// // // // // //     //     .find((row) => row.startsWith(`project_role_${projectId}=`))
// // // // // //     //     ?.split("=")[1]

// // // // // //     //   // Set admin status based on roles
// // // // // //     //   const isOrgAdmin = orgRole === "ADMIN"
// // // // // //     //   const isProjectAdmin = projectRoleCookie === "PROJECT_MANAGER"

// // // // // //     //   // User is admin if they have admin role at org or project level
// // // // // //     //   console.log("Is allowd org", isOrgAdmin )
// // // // // //     //   console.log("Is allowd proj",document.cookie
// // // // // //     //     .split("; "));
      
// // // // // //     //   setIsAdmin(isOrgAdmin || isProjectAdmin)
// // // // // //     // }
// // // // // //     const fetchAdminStatus = async () => {
// // // // // //       try {
// // // // // //         // Import the server action
// // // // // //         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

// // // // // //         // Call the server action to check admin status
// // // // // //         const isAdminResult = await checkAdminStatus(projectId)
// // // // // //         setIsAdmin(isAdminResult)
// // // // // //       } catch (error) {
// // // // // //         console.error("Error checking admin status:", error)
// // // // // //         setIsAdmin(false)
// // // // // //       }
// // // // // //     }

// // // // // //     if (projectId) {
// // // // // //       fetchAdminStatus()
// // // // // //     }
// // // // // //   }, [projectId])

// // // // // //   useEffect(() => {
// // // // // //     if (!projectId) return
// // // // // //     const fetchCredentials = async () => {
// // // // // //       setIsLoading(true)
// // // // // //       setError(null)

// // // // // //       try {
// // // // // //         // Get the authentication token from cookie
// // // // // //         const token = document.cookie
// // // // // //           .split("; ")
// // // // // //           .find((row) => row.startsWith("token="))
// // // // // //           ?.split("=")[1]

// // // // // //         if (!token) {
// // // // // //           throw new Error("Authentication token not found. Please log in again.")
// // // // // //         }

// // // // // //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// // // // // //           method: "GET",
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //         })

// // // // // //         if (!response.ok) {
// // // // // //           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
// // // // // //         }

// // // // // //         const data = await response.json()
// // // // // //         setCredentials(data)
// // // // // //       } catch (err) {
// // // // // //         console.error("Error fetching credentials:", err)
// // // // // //         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
// // // // // //       } finally {
// // // // // //         setIsLoading(false)
// // // // // //       }
// // // // // //     }

// // // // // //     fetchCredentials()
// // // // // //   }, [projectId])

// // // // // //   const toggleCredentialVisibility = async (credentialId: string) => {
// // // // // //     // If already visible, just hide it
// // // // // //     if (visibleCredentials.includes(credentialId)) {
// // // // // //       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // // // //       return
// // // // // //     }

// // // // // //     // Set loading state
// // // // // //     setLoadingCredentials((prev) => [...prev, credentialId])

// // // // // //     // If not visible, fetch the credential value from the server
// // // // // //     try {
// // // // // //       const token = document.cookie
// // // // // //         .split("; ")
// // // // // //         .find((row) => row.startsWith("token="))
// // // // // //         ?.split("=")[1]

// // // // // //       if (!token) {
// // // // // //         throw new Error("Authentication token not found. Please log in again.")
// // // // // //       }

// // // // // //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`, {
// // // // // //         method: "GET",
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //       })

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`Failed to fetch credential: ${response.statusText}`)
// // // // // //       }

// // // // // //       const data = await response.json()

// // // // // //       // Update the credential in the credentials array with the fetched value
// // // // // //       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

// // // // // //       // Add to visible credentials
// // // // // //       setVisibleCredentials((prev) => [...prev, credentialId])
// // // // // //     } catch (err) {
// // // // // //       console.error("Error fetching credential:", err)
// // // // // //       setError(err instanceof Error ? err.message : "Failed to fetch credential")
// // // // // //     } finally {
// // // // // //       // Remove loading state
// // // // // //       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // // // //     }
// // // // // //   }

// // // // // //   const handleUpdateCredential = (credential: Credential) => {
// // // // // //     setSelectedCredential(credential)
// // // // // //     setIsUpdateModalOpen(true)
// // // // // //   }

// // // // // //   const handleDeleteCredential = (credential: Credential) => {
// // // // // //     setSelectedCredential(credential)
// // // // // //     setIsDeleteDialogOpen(true)
// // // // // //   }

// // // // // //   const confirmDeleteCredential = async () => {
// // // // // //     if (!selectedCredential || !projectId) return

// // // // // //     setDeleteLoading(true)
// // // // // //     try {
// // // // // //       const token = document.cookie
// // // // // //         .split("; ")
// // // // // //         .find((row) => row.startsWith("token="))
// // // // // //         ?.split("=")[1]

// // // // // //       if (!token) {
// // // // // //         throw new Error("Authentication token not found")
// // // // // //       }

// // // // // //       const response = await fetch(
// // // // // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
// // // // // //         {
// // // // // //           method: "DELETE",
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //           body: JSON.stringify({ projectId }),
// // // // // //         },
// // // // // //       )

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error("Failed to delete credential")
// // // // // //       }

// // // // // //       // Remove the credential from the state
// // // // // //       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
// // // // // //       setIsDeleteDialogOpen(false)
// // // // // //       setSelectedCredential(null)
// // // // // //     } catch (err) {
// // // // // //       console.error("Error deleting credential:", err)
// // // // // //       setError(err instanceof Error ? err.message : "Failed to delete credential")
// // // // // //     } finally {
// // // // // //       setDeleteLoading(false)
// // // // // //     }
// // // // // //   }

// // // // // //   const refreshCredentials = async () => {
// // // // // //     if (!projectId) return

// // // // // //     setIsLoading(true)
// // // // // //     setError(null)

// // // // // //     try {
// // // // // //       const token = document.cookie
// // // // // //         .split("; ")
// // // // // //         .find((row) => row.startsWith("token="))
// // // // // //         ?.split("=")[1]

// // // // // //       if (!token) {
// // // // // //         throw new Error("Authentication token not found")
// // // // // //       }

// // // // // //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// // // // // //         method: "GET",
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //       })

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error("Failed to refresh credentials")
// // // // // //       }

// // // // // //       const data = await response.json()

// // // // // //       setCredentials(data)
// // // // // //     } catch (err) {
// // // // // //       console.error("Error refreshing credentials:", err)
// // // // // //       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
// // // // // //     } finally {
// // // // // //       setIsLoading(false)
// // // // // //     }
// // // // // //   }

// // // // // //   const canAddCredential = true // Temporarily set to true for testing

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100">
// // // // // //       <main className="container mx-auto px-4 py-8">
// // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // //           <h1 className="text-3xl font-bold">Project Dashboard</h1>
// // // // // //           <div className="flex space-x-2">
// // // // // //             {canAddCredential && activeTab === "credentials" && (
// // // // // //               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // // // // //           <TabsList>
// // // // // //             <TabsTrigger value="credentials">Credentials</TabsTrigger>
// // // // // //             <TabsTrigger value="members">Members</TabsTrigger>
// // // // // //           </TabsList>

// // // // // //           <TabsContent value="credentials">
// // // // // //             {error && (
// // // // // //               <Alert variant="destructive" className="mb-6">
// // // // // //                 <AlertCircle className="h-4 w-4" />
// // // // // //                 <AlertDescription>{error}</AlertDescription>
// // // // // //               </Alert>
// // // // // //             )}

// // // // // //             {isLoading ? (
// // // // // //               <div className="flex justify-center items-center h-64">
// // // // // //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // // // // //               </div>
// // // // // //             ) : credentials.length === 0 ? (
// // // // // //               <div className="text-center p-8 bg-white rounded-lg shadow">
// // // // // //                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
// // // // // //                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
// // // // // //                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                 {credentials.map((credential, index) => (
// // // // // //                   <CredentialCard
// // // // // //                     key={credential.id}
// // // // // //                     credential={credential}
// // // // // //                     index={index}
// // // // // //                     isVisible={visibleCredentials.includes(credential.id)}
// // // // // //                     isLoading={loadingCredentials.includes(credential.id)}
// // // // // //                     isAdmin={isAdmin}
// // // // // //                     onToggleVisibility={toggleCredentialVisibility}
// // // // // //                     onUpdate={handleUpdateCredential}
// // // // // //                     onDelete={handleDeleteCredential}
// // // // // //                   />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </TabsContent>

// // // // // //           <TabsContent value="members">
// // // // // //             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
// // // // // //           </TabsContent>
// // // // // //         </Tabs>

// // // // // //         <AddCredentialModal
// // // // // //           isOpen={isAddModalOpen}
// // // // // //           onClose={() => setIsAddModalOpen(false)}
// // // // // //           projectId={projectId}
// // // // // //           onCredentialAdded={refreshCredentials}
// // // // // //           existingCredentials={credentials}
// // // // // //         />

// // // // // //         {selectedCredential && (
// // // // // //           <UpdateCredentialModal
// // // // // //             isOpen={isUpdateModalOpen}
// // // // // //             onClose={() => {
// // // // // //               setIsUpdateModalOpen(false)
// // // // // //               setSelectedCredential(null)
// // // // // //             }}
// // // // // //             credential={selectedCredential}
// // // // // //             projectId={projectId}
// // // // // //             onCredentialUpdated={refreshCredentials}
// // // // // //           />
// // // // // //         )}

// // // // // //         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // // // //           <AlertDialogContent>
// // // // // //             <AlertDialogHeader>
// // // // // //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // // // // //               <AlertDialogDescription>
// // // // // //                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
// // // // // //               </AlertDialogDescription>
// // // // // //             </AlertDialogHeader>
// // // // // //             <AlertDialogFooter>
// // // // // //               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
// // // // // //               <AlertDialogAction
// // // // // //                 onClick={confirmDeleteCredential}
// // // // // //                 disabled={deleteLoading}
// // // // // //                 className="bg-red-600 hover:bg-red-700"
// // // // // //               >
// // // // // //                 {deleteLoading ? (
// // // // // //                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
// // // // // //                 ) : (
// // // // // //                   "Delete"
// // // // // //                 )}
// // // // // //               </AlertDialogAction>
// // // // // //             </AlertDialogFooter>
// // // // // //           </AlertDialogContent>
// // // // // //         </AlertDialog>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   )
// // // // // // }


// // // // // "use client"

// // // // // import { useParams } from "next/navigation"
// // // // // import { useState, useEffect } from "react"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // // import { AlertCircle, Shield, FileText, Lock, Users } from "lucide-react"
// // // // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // // // import {
// // // // //   AlertDialog,
// // // // //   AlertDialogAction,
// // // // //   AlertDialogCancel,
// // // // //   AlertDialogContent,
// // // // //   AlertDialogDescription,
// // // // //   AlertDialogFooter,
// // // // //   AlertDialogHeader,
// // // // //   AlertDialogTitle,
// // // // // } from "@/components/ui/alert-dialog"
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { Separator } from "@/components/ui/separator"
// // // // // import AddCredentialModal from "@/app/components/AddCredentialModal"
// // // // // import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// // // // // import ProjectMembers from "@/app/components/project-members"
// // // // // import CredentialCard from "@/app/components/credential-card"

// // // // // // Interfaces from your original code
// // // // // interface TagObject {
// // // // //   id: string
// // // // //   name: string
// // // // // }

// // // // // interface CreatedBy {
// // // // //   id: string
// // // // //   name: string
// // // // // }

// // // // // interface Credential {
// // // // //   id: string
// // // // //   name: string
// // // // //   type: string
// // // // //   value?: string
// // // // //   description: string
// // // // //   createdBy: CreatedBy
// // // // //   tags: TagObject[]
// // // // //   lastUpdated?: string
// // // // //   updatedBy?: string
// // // // // }

// // // // // export default function ProjectPage() {
// // // // //   const [credentials, setCredentials] = useState<Credential[]>([])
// // // // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
// // // // //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
// // // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // // //   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
// // // // //   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
// // // // //   const [isLoading, setIsLoading] = useState(true)
// // // // //   const [error, setError] = useState<string | null>(null)
// // // // //   const [isAdmin, setIsAdmin] = useState(false)
// // // // //   const [deleteLoading, setDeleteLoading] = useState(false)
// // // // //   const [activeTab, setActiveTab] = useState("credentials")
// // // // //   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])
// // // // //   const [projectName, setProjectName] = useState("Project Dashboard")

// // // // //   const params = useParams()

// // // // //   // Safely extract projectId and orgId from params
// // // // //   const projectId = params?.projectId as string
// // // // //   const orgId = params?.orgId as string

// // // // //   // Check if user is admin
// // // // //   useEffect(() => {
// // // // //     const fetchAdminStatus = async () => {
// // // // //       try {
// // // // //         // Import the server action
// // // // //         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

// // // // //         // Call the server action to check admin status
// // // // //         const isAdminResult = await checkAdminStatus(projectId)
// // // // //         setIsAdmin(isAdminResult)
// // // // //       } catch (error) {
// // // // //         console.error("Error checking admin status:", error)
// // // // //         setIsAdmin(false)
// // // // //       }
// // // // //     }

// // // // //     if (projectId) {
// // // // //       fetchAdminStatus()
// // // // //     }
// // // // //   }, [projectId])

// // // // //   useEffect(() => {
// // // // //     if (!projectId) return
// // // // //     const fetchCredentials = async () => {
// // // // //       setIsLoading(true)
// // // // //       setError(null)

// // // // //       try {
// // // // //         // Get the authentication token from cookie
// // // // //         const token = document.cookie
// // // // //           .split("; ")
// // // // //           .find((row) => row.startsWith("token="))
// // // // //           ?.split("=")[1]

// // // // //         if (!token) {
// // // // //           throw new Error("Authentication token not found. Please log in again.")
// // // // //         }

// // // // //         const response = await fetch(
// // // // //           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
// // // // //           {
// // // // //             method: "GET",
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${token}`,
// // // // //               "Content-Type": "application/json",
// // // // //             },
// // // // //           },
// // // // //         )

// // // // //         if (!response.ok) {
// // // // //           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
// // // // //         }

// // // // //         const data = await response.json()
// // // // //         console.log("data",data);
        
// // // // //         setCredentials(data)
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching credentials:", err)
// // // // //         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
// // // // //       } finally {
// // // // //         setIsLoading(false)
// // // // //       }
// // // // //     }

// // // // //     fetchCredentials()
// // // // //   }, [projectId])

// // // // //   const toggleCredentialVisibility = async (credentialId: string) => {
// // // // //     // If already visible, just hide it
// // // // //     if (visibleCredentials.includes(credentialId)) {
// // // // //       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // // //       return
// // // // //     }

// // // // //     // Set loading state
// // // // //     setLoadingCredentials((prev) => [...prev, credentialId])

// // // // //     // If not visible, fetch the credential value from the server
// // // // //     try {
// // // // //       const token = document.cookie
// // // // //         .split("; ")
// // // // //         .find((row) => row.startsWith("token="))
// // // // //         ?.split("=")[1]

// // // // //       if (!token) {
// // // // //         throw new Error("Authentication token not found. Please log in again.")
// // // // //       }

// // // // //       const response = await fetch(
// // // // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
// // // // //         {
// // // // //           method: "GET",
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //         },
// // // // //       )

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`Failed to fetch credential: ${response.statusText}`)
// // // // //       }

// // // // //       const data = await response.json()

// // // // //       // Update the credential in the credentials array with the fetched value
// // // // //       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

// // // // //       // Add to visible credentials
// // // // //       setVisibleCredentials((prev) => [...prev, credentialId])
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching credential:", err)
// // // // //       setError(err instanceof Error ? err.message : "Failed to fetch credential")
// // // // //     } finally {
// // // // //       // Remove loading state
// // // // //       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // // //     }
// // // // //   }

// // // // //   const handleUpdateCredential = (credential: Credential) => {
// // // // //     setSelectedCredential(credential)
// // // // //     setIsUpdateModalOpen(true)
// // // // //   }

// // // // //   const handleDeleteCredential = (credential: Credential) => {
// // // // //     setSelectedCredential(credential)
// // // // //     setIsDeleteDialogOpen(true)
// // // // //   }

// // // // //   const confirmDeleteCredential = async () => {
// // // // //     if (!selectedCredential || !projectId) return

// // // // //     setDeleteLoading(true)
// // // // //     try {
// // // // //       const token = document.cookie
// // // // //         .split("; ")
// // // // //         .find((row) => row.startsWith("token="))
// // // // //         ?.split("=")[1]

// // // // //       if (!token) {
// // // // //         throw new Error("Authentication token not found")
// // // // //       }

// // // // //       const response = await fetch(
// // // // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
// // // // //         {
// // // // //           method: "DELETE",
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${token}`,
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //           body: JSON.stringify({ projectId }),
// // // // //         },
// // // // //       )

// // // // //       if (!response.ok) {
// // // // //         throw new Error("Failed to delete credential")
// // // // //       }

// // // // //       // Remove the credential from the state
// // // // //       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
// // // // //       setIsDeleteDialogOpen(false)
// // // // //       setSelectedCredential(null)
// // // // //     } catch (err) {
// // // // //       console.error("Error deleting credential:", err)
// // // // //       setError(err instanceof Error ? err.message : "Failed to delete credential")
// // // // //     } finally {
// // // // //       setDeleteLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const refreshCredentials = async () => {
// // // // //     if (!projectId) return

// // // // //     setIsLoading(true)
// // // // //     setError(null)

// // // // //     try {
// // // // //       const token = document.cookie
// // // // //         .split("; ")
// // // // //         .find((row) => row.startsWith("token="))
// // // // //         ?.split("=")[1]

// // // // //       if (!token) {
// // // // //         throw new Error("Authentication token not found")
// // // // //       }

// // // // //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// // // // //         method: "GET",
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //       })

// // // // //       if (!response.ok) {
// // // // //         throw new Error("Failed to refresh credentials")
// // // // //       }

// // // // //       const data = await response.json()

// // // // //       setCredentials(data)
// // // // //     } catch (err) {
// // // // //       console.error("Error refreshing credentials:", err)
// // // // //       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
// // // // //     } finally {
// // // // //       setIsLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const canAddCredential = true // Temporarily set to true for testing

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100">
// // // // //       <main className="container mx-auto px-4 py-8">
// // // // //         <div className="flex justify-between items-center mb-6">
// // // // //           <h1 className="text-3xl font-bold">{projectName}</h1>
// // // // //           <div className="flex space-x-2">
// // // // //             {canAddCredential && activeTab === "credentials" && (
// // // // //               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // // // //           <TabsList>
// // // // //             <TabsTrigger value="credentials">Credentials</TabsTrigger>
// // // // //             <TabsTrigger value="members">Members</TabsTrigger>
// // // // //             {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
// // // // //           </TabsList>

// // // // //           <TabsContent value="credentials">
// // // // //             {error && (
// // // // //               <Alert variant="destructive" className="mb-6">
// // // // //                 <AlertCircle className="h-4 w-4" />
// // // // //                 <AlertDescription>{error}</AlertDescription>
// // // // //               </Alert>
// // // // //             )}

// // // // //             {isLoading ? (
// // // // //               <div className="flex justify-center items-center h-64">
// // // // //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // // // //               </div>
// // // // //             ) : credentials.length === 0 ? (
// // // // //               <div className="text-center p-8 bg-white rounded-lg shadow">
// // // // //                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
// // // // //                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
// // // // //                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                 {credentials.map((credential, index) => (
// // // // //                   <CredentialCard
// // // // //                     key={credential.id}
// // // // //                     credential={credential}
// // // // //                     index={index}
// // // // //                     isVisible={visibleCredentials.includes(credential.id)}
// // // // //                     isLoading={loadingCredentials.includes(credential.id)}
// // // // //                     isAdmin={isAdmin}
// // // // //                     onToggleVisibility={toggleCredentialVisibility}
// // // // //                     onUpdate={handleUpdateCredential}
// // // // //                     onDelete={handleDeleteCredential}
// // // // //                   />
// // // // //                 ))}
// // // // //               </div>
// // // // //             )}
// // // // //           </TabsContent>

// // // // //           <TabsContent value="members">
// // // // //             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
// // // // //           </TabsContent>

// // // // //           {/* Settings Tab - Admin Only */}
// // // // //           <TabsContent value="settings" className="space-y-6">
// // // // //             {!isAdmin ? (
// // // // //               <Alert variant="destructive" className="mb-6">
// // // // //                 <AlertCircle className="h-4 w-4" />
// // // // //                 <AlertDescription>You don't have permission to access project settings.</AlertDescription>
// // // // //               </Alert>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <div className="flex justify-between items-center">
// // // // //                       <div>
// // // // //                         <CardTitle>Project Settings</CardTitle>
// // // // //                         <CardDescription>Configure project details and preferences</CardDescription>
// // // // //                       </div>
// // // // //                       <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
// // // // //                     </div>
// // // // //                   </CardHeader>
// // // // //                   <CardContent className="space-y-6">
// // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                       <div>
// // // // //                         <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                           Project Name
// // // // //                         </label>
// // // // //                         <input
// // // // //                           type="text"
// // // // //                           id="project-name"
// // // // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // // //                           value={projectName}
// // // // //                           onChange={(e) => setProjectName(e.target.value)}
// // // // //                         />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                           Description
// // // // //                         </label>
// // // // //                         <textarea
// // // // //                           id="project-description"
// // // // //                           rows={3}
// // // // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // // //                           placeholder="Project description"
// // // // //                         />
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex justify-end">
// // // // //                       <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>

// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle>Permission Management</CardTitle>
// // // // //                     <CardDescription>Control what different roles can access</CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-6">
// // // // //                       {[
// // // // //                         {
// // // // //                           id: 1,
// // // // //                           role: "Project Manager",
// // // // //                           permissions: [
// // // // //                             { id: "pm_view", name: "View Credentials", enabled: true },
// // // // //                             { id: "pm_create", name: "Create Credentials", enabled: true },
// // // // //                             { id: "pm_update", name: "Update Credentials", enabled: true },
// // // // //                             { id: "pm_delete", name: "Delete Credentials", enabled: true },
// // // // //                             { id: "pm_invite", name: "Invite Members", enabled: true },
// // // // //                           ],
// // // // //                         },
// // // // //                         {
// // // // //                           id: 2,
// // // // //                           role: "Team Member",
// // // // //                           permissions: [
// // // // //                             { id: "tm_view", name: "View Credentials", enabled: true },
// // // // //                             { id: "tm_create", name: "Create Credentials", enabled: false },
// // // // //                             { id: "tm_update", name: "Update Credentials", enabled: false },
// // // // //                             { id: "tm_delete", name: "Delete Credentials", enabled: false },
// // // // //                             { id: "tm_invite", name: "Invite Members", enabled: false },
// // // // //                           ],
// // // // //                         },
// // // // //                         {
// // // // //                           id: 3,
// // // // //                           role: "Viewer",
// // // // //                           permissions: [
// // // // //                             { id: "v_view", name: "View Credentials", enabled: true },
// // // // //                             { id: "v_create", name: "Create Credentials", enabled: false },
// // // // //                             { id: "v_update", name: "Update Credentials", enabled: false },
// // // // //                             { id: "v_delete", name: "Delete Credentials", enabled: false },
// // // // //                             { id: "v_invite", name: "Invite Members", enabled: false },
// // // // //                           ],
// // // // //                         },
// // // // //                       ].map((roleGroup) => (
// // // // //                         <div key={roleGroup.id} className="border rounded-lg p-4">
// // // // //                           <h4 className="font-medium mb-3">{roleGroup.role}</h4>
// // // // //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // // // //                             {roleGroup.permissions.map((permission) => (
// // // // //                               <div key={permission.id} className="flex items-center justify-between">
// // // // //                                 <span className="text-sm">{permission.name}</span>
// // // // //                                 <div
// // // // //                                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
// // // // //                                   data-state={permission.enabled ? "checked" : "unchecked"}
// // // // //                                   role="switch"
// // // // //                                   aria-checked={permission.enabled}
// // // // //                                 >
// // // // //                                   <span
// // // // //                                     className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
// // // // //                                     data-state={permission.enabled ? "checked" : "unchecked"}
// // // // //                                   />
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                             ))}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                       <div className="flex justify-end">
// // // // //                         <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>

// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle>Credential Policies</CardTitle>
// // // // //                     <CardDescription>Set security requirements for credentials</CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Require rotation</p>
// // // // //                           <p className="text-xs text-gray-500">Force credential rotation after a period</p>
// // // // //                         </div>
// // // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // // //                           <option>90 days</option>
// // // // //                           <option>60 days</option>
// // // // //                           <option>30 days</option>
// // // // //                           <option>Never</option>
// // // // //                         </select>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Minimum password length</p>
// // // // //                           <p className="text-xs text-gray-500">For password-type credentials</p>
// // // // //                         </div>
// // // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // // //                           <option>12 characters</option>
// // // // //                           <option>16 characters</option>
// // // // //                           <option>20 characters</option>
// // // // //                         </select>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Require approval for changes</p>
// // // // //                           <p className="text-xs text-gray-500">Admin must approve credential changes</p>
// // // // //                         </div>
// // // // //                         <div
// // // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200"
// // // // //                           role="switch"
// // // // //                           aria-checked="false"
// // // // //                         >
// // // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
// // // // //                         </div>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Auto-revoke on member removal</p>
// // // // //                           <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
// // // // //                         </div>
// // // // //                         <div
// // // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // // //                           role="switch"
// // // // //                           aria-checked="true"
// // // // //                         >
// // // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // // //                         </div>
// // // // //                       </div>

// // // // //                       <Separator className="my-4" />

// // // // //                       <div className="flex justify-end">
// // // // //                         <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>

// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle>Audit & Compliance</CardTitle>
// // // // //                     <CardDescription>Configure audit settings and compliance features</CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Detailed audit logs</p>
// // // // //                           <p className="text-xs text-gray-500">Track all credential access and changes</p>
// // // // //                         </div>
// // // // //                         <div
// // // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // // //                           role="switch"
// // // // //                           aria-checked="true"
// // // // //                         >
// // // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // // //                         </div>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Export audit logs</p>
// // // // //                           <p className="text-xs text-gray-500">For compliance reporting</p>
// // // // //                         </div>
// // // // //                         <Button variant="outline" size="sm" className="rounded-full text-xs">
// // // // //                           Export Logs
// // // // //                         </Button>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Compliance reports</p>
// // // // //                           <p className="text-xs text-gray-500">Generate compliance reports</p>
// // // // //                         </div>
// // // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // // //                           <option>Weekly</option>
// // // // //                           <option>Monthly</option>
// // // // //                           <option>Quarterly</option>
// // // // //                           <option>On demand</option>
// // // // //                         </select>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <div>
// // // // //                           <p className="font-medium text-sm">Retention period</p>
// // // // //                           <p className="text-xs text-gray-500">How long to keep audit logs</p>
// // // // //                         </div>
// // // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // // //                           <option>1 year</option>
// // // // //                           <option>2 years</option>
// // // // //                           <option>5 years</option>
// // // // //                           <option>Forever</option>
// // // // //                         </select>
// // // // //                       </div>

// // // // //                       <Separator className="my-4" />

// // // // //                       <div className="flex justify-end">
// // // // //                         <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>

// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle>Project Integration</CardTitle>
// // // // //                     <CardDescription>Connect with other services</CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       {[
// // // // //                         { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
// // // // //                         { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
// // // // //                         { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
// // // // //                         { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
// // // // //                       ].map((integration) => (
// // // // //                         <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
// // // // //                           <div className="flex items-center">
// // // // //                             <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
// // // // //                             <p className="font-medium">{integration.name}</p>
// // // // //                           </div>
// // // // //                           <Button
// // // // //                             variant={integration.connected ? "outline" : "default"}
// // // // //                             size="sm"
// // // // //                             className={`rounded-full text-xs ${
// // // // //                               integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
// // // // //                             }`}
// // // // //                           >
// // // // //                             {integration.connected ? "Connected" : "Connect"}
// // // // //                           </Button>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>

// // // // //                 <Card className="border-red-200">
// // // // //                   <CardHeader className="text-red-600">
// // // // //                     <CardTitle>Danger Zone</CardTitle>
// // // // //                     <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // // // //                         <div>
// // // // //                           <p className="font-medium">Archive Project</p>
// // // // //                           <p className="text-sm text-gray-500">
// // // // //                             The project will be archived and read-only for all members
// // // // //                           </p>
// // // // //                         </div>
// // // // //                         <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
// // // // //                           Archive
// // // // //                         </Button>
// // // // //                       </div>

// // // // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // // // //                         <div>
// // // // //                           <p className="font-medium">Delete Project</p>
// // // // //                           <p className="text-sm text-gray-500">
// // // // //                             This action is permanent and cannot be undone. All credentials will be deleted.
// // // // //                           </p>
// // // // //                         </div>
// // // // //                         <Button variant="destructive">Delete</Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </>
// // // // //             )}
// // // // //           </TabsContent>
// // // // //         </Tabs>

// // // // //         <AddCredentialModal
// // // // //           isOpen={isAddModalOpen}
// // // // //           onClose={() => setIsAddModalOpen(false)}
// // // // //           projectId={projectId}
// // // // //           onCredentialAdded={refreshCredentials}
// // // // //           existingCredentials={credentials}
// // // // //         />

// // // // //         {selectedCredential && (
// // // // //           <UpdateCredentialModal
// // // // //             isOpen={isUpdateModalOpen}
// // // // //             onClose={() => {
// // // // //               setIsUpdateModalOpen(false)
// // // // //               setSelectedCredential(null)
// // // // //             }}
// // // // //             credential={selectedCredential}
// // // // //             projectId={projectId}
// // // // //             onCredentialUpdated={refreshCredentials}
// // // // //           />
// // // // //         )}

// // // // //         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // // //           <AlertDialogContent>
// // // // //             <AlertDialogHeader>
// // // // //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // // // //               <AlertDialogDescription>
// // // // //                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
// // // // //               </AlertDialogDescription>
// // // // //             </AlertDialogHeader>
// // // // //             <AlertDialogFooter>
// // // // //               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
// // // // //               <AlertDialogAction
// // // // //                 onClick={confirmDeleteCredential}
// // // // //                 disabled={deleteLoading}
// // // // //                 className="bg-red-600 hover:bg-red-700"
// // // // //               >
// // // // //                 {deleteLoading ? (
// // // // //                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
// // // // //                 ) : (
// // // // //                   "Delete"
// // // // //                 )}
// // // // //               </AlertDialogAction>
// // // // //             </AlertDialogFooter>
// // // // //           </AlertDialogContent>
// // // // //         </AlertDialog>
// // // // //       </main>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // "use client"

// // // // import { useParams } from "next/navigation"
// // // // import { useState, useEffect } from "react"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // import { AlertCircle, Shield, FileText, Lock, Users, Eye } from "lucide-react"
// // // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // // import {
// // // //   AlertDialog,
// // // //   AlertDialogAction,
// // // //   AlertDialogCancel,
// // // //   AlertDialogContent,
// // // //   AlertDialogDescription,
// // // //   AlertDialogFooter,
// // // //   AlertDialogHeader,
// // // //   AlertDialogTitle,
// // // // } from "@/components/ui/alert-dialog"
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Separator } from "@/components/ui/separator"
// // // // import AddCredentialModal from "@/app/components/AddCredentialModal"
// // // // import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// // // // import ProjectMembers from "@/app/components/project-members"
// // // // import CredentialCard from "@/app/components/credential-card"

// // // // // Interfaces from your original code
// // // // interface TagObject {
// // // //   id: string
// // // //   name: string
// // // // }

// // // // interface CreatedBy {
// // // //   id: string
// // // //   name: string
// // // // }

// // // // interface Credential {
// // // //   id: string
// // // //   name: string
// // // //   type: string
// // // //   value?: string
// // // //   description: string
// // // //   createdBy: CreatedBy
// // // //   tags: TagObject[]
// // // //   lastUpdated?: string
// // // //   updatedBy?: string
// // // // }

// // // // export default function ProjectPage() {
// // // //   const [credentials, setCredentials] = useState<Credential[]>([])
// // // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
// // // //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
// // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // //   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
// // // //   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
// // // //   const [isLoading, setIsLoading] = useState(true)
// // // //   const [error, setError] = useState<string | null>(null)
// // // //   const [isAdmin, setIsAdmin] = useState(false)
// // // //   const [deleteLoading, setDeleteLoading] = useState(false)
// // // //   const [activeTab, setActiveTab] = useState("credentials")
// // // //   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])
// // // //   const [projectName, setProjectName] = useState("Project Dashboard")

// // // //   const params = useParams()

// // // //   // Safely extract projectId and orgId from params
// // // //   const projectId = params?.projectId as string
// // // //   const orgId = params?.orgId as string

// // // //   // Check if user is admin
// // // //   useEffect(() => {
// // // //     const fetchAdminStatus = async () => {
// // // //       try {
// // // //         // Import the server action
// // // //         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

// // // //         // Call the server action to check admin status
// // // //         const isAdminResult = await checkAdminStatus(projectId)
// // // //         setIsAdmin(isAdminResult)
// // // //       } catch (error) {
// // // //         console.error("Error checking admin status:", error)
// // // //         setIsAdmin(false)
// // // //       }
// // // //     }

// // // //     if (projectId) {
// // // //       fetchAdminStatus()
// // // //     }
// // // //   }, [projectId])

// // // //   useEffect(() => {
// // // //     if (!projectId) return
// // // //     const fetchCredentials = async () => {
// // // //       setIsLoading(true)
// // // //       setError(null)

// // // //       try {
// // // //         // Get the authentication token from cookie
// // // //         const token = document.cookie
// // // //           .split("; ")
// // // //           .find((row) => row.startsWith("token="))
// // // //           ?.split("=")[1]

// // // //         if (!token) {
// // // //           throw new Error("Authentication token not found. Please log in again.")
// // // //         }

// // // //         const response = await fetch(
// // // //           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
// // // //           {
// // // //             method: "GET",
// // // //             headers: {
// // // //               Authorization: `Bearer ${token}`,
// // // //               "Content-Type": "application/json",
// // // //             },
// // // //           },
// // // //         )

// // // //         if (!response.ok) {
// // // //           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
// // // //         }

// // // //         const data = await response.json()
// // // //         setCredentials(data)
// // // //       } catch (err) {
// // // //         console.error("Error fetching credentials:", err)
// // // //         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
// // // //       } finally {
// // // //         setIsLoading(false)
// // // //       }
// // // //     }

// // // //     fetchCredentials()
// // // //   }, [projectId])

// // // //   const toggleCredentialVisibility = async (credentialId: string) => {
// // // //     // If already visible, just hide it
// // // //     if (visibleCredentials.includes(credentialId)) {
// // // //       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // //       return
// // // //     }

// // // //     // Set loading state
// // // //     setLoadingCredentials((prev) => [...prev, credentialId])

// // // //     // If not visible, fetch the credential value from the server
// // // //     try {
// // // //       const token = document.cookie
// // // //         .split("; ")
// // // //         .find((row) => row.startsWith("token="))
// // // //         ?.split("=")[1]

// // // //       if (!token) {
// // // //         throw new Error("Authentication token not found. Please log in again.")
// // // //       }

// // // //       const response = await fetch(
// // // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
// // // //         {
// // // //           method: "GET",
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //         },
// // // //       )

// // // //       if (!response.ok) {
// // // //         throw new Error(`Failed to fetch credential: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       // Update the credential in the credentials array with the fetched value
// // // //       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

// // // //       // Add to visible credentials
// // // //       setVisibleCredentials((prev) => [...prev, credentialId])
// // // //     } catch (err) {
// // // //       console.error("Error fetching credential:", err)
// // // //       setError(err instanceof Error ? err.message : "Failed to fetch credential")
// // // //     } finally {
// // // //       // Remove loading state
// // // //       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
// // // //     }
// // // //   }

// // // //   const handleUpdateCredential = (credential: Credential) => {
// // // //     setSelectedCredential(credential)
// // // //     setIsUpdateModalOpen(true)
// // // //   }

// // // //   const handleDeleteCredential = (credential: Credential) => {
// // // //     setSelectedCredential(credential)
// // // //     setIsDeleteDialogOpen(true)
// // // //   }

// // // //   const confirmDeleteCredential = async () => {
// // // //     if (!selectedCredential || !projectId) return

// // // //     setDeleteLoading(true)
// // // //     try {
// // // //       const token = document.cookie
// // // //         .split("; ")
// // // //         .find((row) => row.startsWith("token="))
// // // //         ?.split("=")[1]

// // // //       if (!token) {
// // // //         throw new Error("Authentication token not found")
// // // //       }

// // // //       const response = await fetch(
// // // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
// // // //         {
// // // //           method: "DELETE",
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //             "Content-Type": "application/json",
// // // //           },
// // // //           body: JSON.stringify({ projectId }),
// // // //         },
// // // //       )

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to delete credential")
// // // //       }

// // // //       // Remove the credential from the state
// // // //       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
// // // //       setIsDeleteDialogOpen(false)
// // // //       setSelectedCredential(null)
// // // //     } catch (err) {
// // // //       console.error("Error deleting credential:", err)
// // // //       setError(err instanceof Error ? err.message : "Failed to delete credential")
// // // //     } finally {
// // // //       setDeleteLoading(false)
// // // //     }
// // // //   }

// // // //   const refreshCredentials = async () => {
// // // //     if (!projectId) return

// // // //     setIsLoading(true)
// // // //     setError(null)

// // // //     try {
// // // //       const token = document.cookie
// // // //         .split("; ")
// // // //         .find((row) => row.startsWith("token="))
// // // //         ?.split("=")[1]

// // // //       if (!token) {
// // // //         throw new Error("Authentication token not found")
// // // //       }

// // // //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// // // //         method: "GET",
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //       })

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to refresh credentials")
// // // //       }

// // // //       const data = await response.json()

// // // //       setCredentials(data)
// // // //     } catch (err) {
// // // //       console.error("Error refreshing credentials:", err)
// // // //       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const canAddCredential = true // Temporarily set to true for testing

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100">
// // // //       <main className="container mx-auto px-4 py-8">
// // // //         <div className="flex justify-between items-center mb-6">
// // // //           <h1 className="text-3xl font-bold">{projectName}</h1>
// // // //           <div className="flex space-x-2">
// // // //             {canAddCredential && activeTab === "credentials" && (
// // // //               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // // //           <TabsList>
// // // //             <TabsTrigger value="credentials">Credentials</TabsTrigger>
// // // //             <TabsTrigger value="members">Members</TabsTrigger>
// // // //             {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
// // // //           </TabsList>

// // // //           <TabsContent value="credentials">
// // // //             {error && (
// // // //               <Alert variant="destructive" className="mb-6">
// // // //                 <AlertCircle className="h-4 w-4" />
// // // //                 <AlertDescription>{error}</AlertDescription>
// // // //               </Alert>
// // // //             )}

// // // //             {isLoading ? (
// // // //               <div className="flex justify-center items-center h-64">
// // // //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // // //               </div>
// // // //             ) : credentials.length === 0 ? (
// // // //               <div className="text-center p-8 bg-white rounded-lg shadow">
// // // //                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
// // // //                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
// // // //                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                 {credentials.map((credential, index) => (
// // // //                   <CredentialCard
// // // //                     key={credential.id}
// // // //                     credential={credential}
// // // //                     index={index}
// // // //                     isVisible={visibleCredentials.includes(credential.id)}
// // // //                     isLoading={loadingCredentials.includes(credential.id)}
// // // //                     isAdmin={isAdmin}
// // // //                     onToggleVisibility={toggleCredentialVisibility}
// // // //                     onUpdate={handleUpdateCredential}
// // // //                     onDelete={handleDeleteCredential}
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </TabsContent>

// // // //           <TabsContent value="members">
// // // //             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
// // // //           </TabsContent>

// // // //           {/* Settings Tab - Admin Only */}
// // // //           <TabsContent value="settings" className="space-y-6">
// // // //             {!isAdmin ? (
// // // //               <Alert variant="destructive" className="mb-6">
// // // //                 <AlertCircle className="h-4 w-4" />
// // // //                 <AlertDescription>You don't have permission to access project settings.</AlertDescription>
// // // //               </Alert>
// // // //             ) : (
// // // //               <>
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <div className="flex justify-between items-center">
// // // //                       <div>
// // // //                         <CardTitle>Project Settings</CardTitle>
// // // //                         <CardDescription>Configure project details and preferences</CardDescription>
// // // //                       </div>
// // // //                       <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
// // // //                     </div>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-6">
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                       <div>
// // // //                         <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
// // // //                           Project Name
// // // //                         </label>
// // // //                         <input
// // // //                           type="text"
// // // //                           id="project-name"
// // // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // //                           value={projectName}
// // // //                           onChange={(e) => setProjectName(e.target.value)}
// // // //                         />
// // // //                       </div>
// // // //                       <div>
// // // //                         <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
// // // //                           Description
// // // //                         </label>
// // // //                         <textarea
// // // //                           id="project-description"
// // // //                           rows={3}
// // // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // //                           placeholder="Project description"
// // // //                         />
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex justify-end">
// // // //                       <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Credential Management</CardTitle>
// // // //                     <CardDescription>Set up how credentials are managed in your project</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-4">
// // // //                     <div className="space-y-2">
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Credential Rotation Policy</label>
// // // //                       <div className="space-y-2">
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <input
// // // //                             type="radio"
// // // //                             id="manual"
// // // //                             name="rotationPolicy"
// // // //                             value="manual"
// // // //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// // // //                             defaultChecked
// // // //                           />
// // // //                           <label htmlFor="manual" className="text-sm">
// // // //                             Manual
// // // //                           </label>
// // // //                         </div>
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <input
// // // //                             type="radio"
// // // //                             id="automatic"
// // // //                             name="rotationPolicy"
// // // //                             value="automatic"
// // // //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// // // //                           />
// // // //                           <label htmlFor="automatic" className="text-sm">
// // // //                             Automatic
// // // //                           </label>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-1">
// // // //                         Master Key
// // // //                       </label>
// // // //                       <div className="relative">
// // // //                         <input
// // // //                           id="masterKey"
// // // //                           type="password"
// // // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // //                           placeholder="Enter your master key"
// // // //                         />
// // // //                         <button
// // // //                           type="button"
// // // //                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
// // // //                         >
// // // //                           <Eye className="h-4 w-4 text-gray-400" />
// // // //                         </button>
// // // //                       </div>
// // // //                       <p className="text-sm text-gray-500">
// // // //                         Ensure your master key is secure and known only to authorized personnel.
// // // //                       </p>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <label htmlFor="rotationInterval" className="block text-sm font-medium text-gray-700 mb-1">
// // // //                         Rotation Interval (days)
// // // //                       </label>
// // // //                       <input
// // // //                         id="rotationInterval"
// // // //                         type="number"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // //                         defaultValue={90}
// // // //                         min={10}
// // // //                         max={365}
// // // //                       />
// // // //                       <p className="text-sm text-gray-500">Recommended: 90 days or less for optimal security.</p>
// // // //                     </div>

// // // //                     <div className="flex justify-end">
// // // //                       <Button className="bg-black hover:bg-gray-800">Save Credential Settings</Button>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Logging and Auditing</CardTitle>
// // // //                     <CardDescription>Configure logging and auditing settings for your project</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-4">
// // // //                     <div className="space-y-2">
// // // //                       <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
// // // //                         Log Retention Period (days)
// // // //                       </label>
// // // //                       <input
// // // //                         id="logRetentionPeriod"
// // // //                         type="number"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // // //                         defaultValue={90}
// // // //                         min={30}
// // // //                         max={3650}
// // // //                       />
// // // //                       <p className="text-sm text-gray-500">
// // // //                         Minimum 30 days. For compliance purposes, 90+ days is recommended.
// // // //                       </p>
// // // //                     </div>

// // // //                     <div className="flex items-center justify-between">
// // // //                       <label htmlFor="enableAuditLog" className="text-sm font-medium">
// // // //                         Enable Detailed Audit Logs
// // // //                       </label>
// // // //                       <div
// // // //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // //                         role="switch"
// // // //                         aria-checked="true"
// // // //                       >
// // // //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="flex items-center justify-between">
// // // //                       <label htmlFor="alertOnCriticalEvents" className="text-sm font-medium">
// // // //                         Alert on Critical Events
// // // //                       </label>
// // // //                       <div
// // // //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // //                         role="switch"
// // // //                         aria-checked="true"
// // // //                       >
// // // //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="flex justify-end">
// // // //                       <Button className="bg-black hover:bg-gray-800">Save Logging Settings</Button>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Permission Management</CardTitle>
// // // //                     <CardDescription>Control what different roles can access</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-6">
// // // //                       {[
// // // //                         {
// // // //                           id: 1,
// // // //                           role: "Project Manager",
// // // //                           permissions: [
// // // //                             { id: "pm_view", name: "View Credentials", enabled: true },
// // // //                             { id: "pm_create", name: "Create Credentials", enabled: true },
// // // //                             { id: "pm_update", name: "Update Credentials", enabled: true },
// // // //                             { id: "pm_delete", name: "Delete Credentials", enabled: true },
// // // //                             { id: "pm_invite", name: "Invite Members", enabled: true },
// // // //                           ],
// // // //                         },
// // // //                         {
// // // //                           id: 2,
// // // //                           role: "Team Member",
// // // //                           permissions: [
// // // //                             { id: "tm_view", name: "View Credentials", enabled: true },
// // // //                             { id: "tm_create", name: "Create Credentials", enabled: false },
// // // //                             { id: "tm_update", name: "Update Credentials", enabled: false },
// // // //                             { id: "tm_delete", name: "Delete Credentials", enabled: false },
// // // //                             { id: "tm_invite", name: "Invite Members", enabled: false },
// // // //                           ],
// // // //                         },
// // // //                         {
// // // //                           id: 3,
// // // //                           role: "Viewer",
// // // //                           permissions: [
// // // //                             { id: "v_view", name: "View Credentials", enabled: true },
// // // //                             { id: "v_create", name: "Create Credentials", enabled: false },
// // // //                             { id: "v_update", name: "Update Credentials", enabled: false },
// // // //                             { id: "v_delete", name: "Delete Credentials", enabled: false },
// // // //                             { id: "v_invite", name: "Invite Members", enabled: false },
// // // //                           ],
// // // //                         },
// // // //                       ].map((roleGroup) => (
// // // //                         <div key={roleGroup.id} className="border rounded-lg p-4">
// // // //                           <h4 className="font-medium mb-3">{roleGroup.role}</h4>
// // // //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // // //                             {roleGroup.permissions.map((permission) => (
// // // //                               <div key={permission.id} className="flex items-center justify-between">
// // // //                                 <span className="text-sm">{permission.name}</span>
// // // //                                 <div
// // // //                                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
// // // //                                   data-state={permission.enabled ? "checked" : "unchecked"}
// // // //                                   role="switch"
// // // //                                   aria-checked={permission.enabled}
// // // //                                 >
// // // //                                   <span
// // // //                                     className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
// // // //                                     data-state={permission.enabled ? "checked" : "unchecked"}
// // // //                                   />
// // // //                                 </div>
// // // //                               </div>
// // // //                             ))}
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}
// // // //                       <div className="flex justify-end">
// // // //                         <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Credential Policies</CardTitle>
// // // //                     <CardDescription>Set security requirements for credentials</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Require rotation</p>
// // // //                           <p className="text-xs text-gray-500">Force credential rotation after a period</p>
// // // //                         </div>
// // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // //                           <option>90 days</option>
// // // //                           <option>60 days</option>
// // // //                           <option>30 days</option>
// // // //                           <option>Never</option>
// // // //                         </select>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Minimum password length</p>
// // // //                           <p className="text-xs text-gray-500">For password-type credentials</p>
// // // //                         </div>
// // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // //                           <option>12 characters</option>
// // // //                           <option>16 characters</option>
// // // //                           <option>20 characters</option>
// // // //                         </select>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Require approval for changes</p>
// // // //                           <p className="text-xs text-gray-500">Admin must approve credential changes</p>
// // // //                         </div>
// // // //                         <div
// // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200"
// // // //                           role="switch"
// // // //                           aria-checked="false"
// // // //                         >
// // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Auto-revoke on member removal</p>
// // // //                           <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
// // // //                         </div>
// // // //                         <div
// // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // //                           role="switch"
// // // //                           aria-checked="true"
// // // //                         >
// // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // //                         </div>
// // // //                       </div>

// // // //                       <Separator className="my-4" />

// // // //                       <div className="flex justify-end">
// // // //                         <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Audit & Compliance</CardTitle>
// // // //                     <CardDescription>Configure audit settings and compliance features</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Detailed audit logs</p>
// // // //                           <p className="text-xs text-gray-500">Track all credential access and changes</p>
// // // //                         </div>
// // // //                         <div
// // // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // // //                           role="switch"
// // // //                           aria-checked="true"
// // // //                         >
// // // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Export audit logs</p>
// // // //                           <p className="text-xs text-gray-500">For compliance reporting</p>
// // // //                         </div>
// // // //                         <Button variant="outline" size="sm" className="rounded-full text-xs">
// // // //                           Export Logs
// // // //                         </Button>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Compliance reports</p>
// // // //                           <p className="text-xs text-gray-500">Generate compliance reports</p>
// // // //                         </div>
// // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // //                           <option>Weekly</option>
// // // //                           <option>Monthly</option>
// // // //                           <option>Quarterly</option>
// // // //                           <option>On demand</option>
// // // //                         </select>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between">
// // // //                         <div>
// // // //                           <p className="font-medium text-sm">Retention period</p>
// // // //                           <p className="text-xs text-gray-500">How long to keep audit logs</p>
// // // //                         </div>
// // // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // // //                           <option>1 year</option>
// // // //                           <option>2 years</option>
// // // //                           <option>5 years</option>
// // // //                           <option>Forever</option>
// // // //                         </select>
// // // //                       </div>

// // // //                       <Separator className="my-4" />

// // // //                       <div className="flex justify-end">
// // // //                         <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Project Integration</CardTitle>
// // // //                     <CardDescription>Connect with other services</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       {[
// // // //                         { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
// // // //                         { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
// // // //                         { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
// // // //                         { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
// // // //                       ].map((integration) => (
// // // //                         <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
// // // //                           <div className="flex items-center">
// // // //                             <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
// // // //                             <p className="font-medium">{integration.name}</p>
// // // //                           </div>
// // // //                           <Button
// // // //                             variant={integration.connected ? "outline" : "default"}
// // // //                             size="sm"
// // // //                             className={`rounded-full text-xs ${
// // // //                               integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
// // // //                             }`}
// // // //                           >
// // // //                             {integration.connected ? "Connected" : "Connect"}
// // // //                           </Button>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card className="border-red-200">
// // // //                   <CardHeader className="text-red-600">
// // // //                     <CardTitle>Danger Zone</CardTitle>
// // // //                     <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // // //                         <div>
// // // //                           <p className="font-medium">Archive Project</p>
// // // //                           <p className="text-sm text-gray-500">
// // // //                             The project will be archived and read-only for all members
// // // //                           </p>
// // // //                         </div>
// // // //                         <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
// // // //                           Archive
// // // //                         </Button>
// // // //                       </div>

// // // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // // //                         <div>
// // // //                           <p className="font-medium">Delete Project</p>
// // // //                           <p className="text-sm text-gray-500">
// // // //                             This action is permanent and cannot be undone. All credentials will be deleted.
// // // //                           </p>
// // // //                         </div>
// // // //                         <Button variant="destructive">Delete</Button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </>
// // // //             )}
// // // //           </TabsContent>
// // // //         </Tabs>

// // // //         <AddCredentialModal
// // // //           isOpen={isAddModalOpen}
// // // //           onClose={() => setIsAddModalOpen(false)}
// // // //           projectId={projectId}
// // // //           onCredentialAdded={refreshCredentials}
// // // //           existingCredentials={credentials}
// // // //         />

// // // //         {selectedCredential && (
// // // //           <UpdateCredentialModal
// // // //             isOpen={isUpdateModalOpen}
// // // //             onClose={() => {
// // // //               setIsUpdateModalOpen(false)
// // // //               setSelectedCredential(null)
// // // //             }}
// // // //             credential={selectedCredential}
// // // //             projectId={projectId}
// // // //             onCredentialUpdated={refreshCredentials}
// // // //           />
// // // //         )}

// // // //         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // //           <AlertDialogContent>
// // // //             <AlertDialogHeader>
// // // //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // // //               <AlertDialogDescription>
// // // //                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
// // // //               </AlertDialogDescription>
// // // //             </AlertDialogHeader>
// // // //             <AlertDialogFooter>
// // // //               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
// // // //               <AlertDialogAction
// // // //                 onClick={confirmDeleteCredential}
// // // //                 disabled={deleteLoading}
// // // //                 className="bg-red-600 hover:bg-red-700"
// // // //               >
// // // //                 {deleteLoading ? (
// // // //                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
// // // //                 ) : (
// // // //                   "Delete"
// // // //                 )}
// // // //               </AlertDialogAction>
// // // //             </AlertDialogFooter>
// // // //           </AlertDialogContent>
// // // //         </AlertDialog>
// // // //       </main>
// // // //     </div>
// // // //   )
// // // // }


// // // "use client"

// // // import { useParams } from "next/navigation"
// // // import { useState, useEffect } from "react"
// // // import { Button } from "@/components/ui/button"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { AlertCircle, Shield, FileText, Lock, Users, Eye } from "lucide-react"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import {
// // //   AlertDialog,
// // //   AlertDialogAction,
// // //   AlertDialogCancel,
// // //   AlertDialogContent,
// // //   AlertDialogDescription,
// // //   AlertDialogFooter,
// // //   AlertDialogHeader,
// // //   AlertDialogTitle,
// // // } from "@/components/ui/alert-dialog"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Separator } from "@/components/ui/separator"
// // // import AddCredentialModal from "@/app/components/AddCredentialModal"
// // // import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// // // import ProjectMembers from "@/app/components/project-members"
// // // import CredentialCard from "@/app/components/credential-card"

// // // // Interfaces from your original code
// // // interface TagObject {
// // //   id: string
// // //   name: string
// // // }

// // // interface CreatedBy {
// // //   id: string
// // //   name: string
// // // }

// // // interface Credential {
// // //   id: string
// // //   name: string
// // //   type: string
// // //   value?: string
// // //   description: string
// // //   createdBy: CreatedBy
// // //   tags: TagObject[]
// // //   lastUpdated?: string
// // //   updatedBy?: string
// // // }

// // // export default function ProjectPage() {
// // //   const [credentials, setCredentials] = useState<Credential[]>([])
// // //   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
// // //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
// // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // //   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
// // //   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [error, setError] = useState<string | null>(null)
// // //   const [isAdmin, setIsAdmin] = useState(false)
// // //   const [deleteLoading, setDeleteLoading] = useState(false)
// // //   const [activeTab, setActiveTab] = useState("credentials")
// // //   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])
// // //   const [projectName, setProjectName] = useState("Project Dashboard")

// // //   const params = useParams()

// // //   // Safely extract projectId and orgId from params
// // //   const projectId = params?.projectId as string
// // //   const orgId = params?.orgId as string

// // //   // Check if user is admin
// // //   useEffect(() => {
// // //     const fetchAdminStatus = async () => {
// // //       try {
// // //         // Import the server action
// // //         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

// // //         // Call the server action to check admin status
// // //         const isAdminResult = await checkAdminStatus(projectId)
// // //         setIsAdmin(isAdminResult)
// // //       } catch (error) {
// // //         console.error("Error checking admin status:", error)
// // //         setIsAdmin(false)
// // //       }
// // //     }

// // //     if (projectId) {
// // //       fetchAdminStatus()
// // //     }
// // //   }, [projectId])

// // //   useEffect(() => {
// // //     if (!projectId) return
// // //     const fetchCredentials = async () => {
// // //       setIsLoading(true)
// // //       setError(null)

// // //       try {
// // //         // Get the authentication token from cookie
// // //         const token = document.cookie
// // //           .split("; ")
// // //           .find((row) => row.startsWith("token="))
// // //           ?.split("=")[1]

// // //         if (!token) {
// // //           throw new Error("Authentication token not found. Please log in again.")
// // //         }

// // //         const response = await fetch(
// // //           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
// // //           {
// // //             method: "GET",
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //               "Content-Type": "application/json",
// // //             },
// // //           },
// // //         )

// // //         if (!response.ok) {
// // //           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
// // //         }

// // //         const data = await response.json()
// // //         setCredentials(data)
// // //       } catch (err) {
// // //         console.error("Error fetching credentials:", err)
// // //         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
// // //       } finally {
// // //         setIsLoading(false)
// // //       }
// // //     }

// // //     fetchCredentials()
// // //   }, [projectId])

// // //   const toggleCredentialVisibility = async (credentialId: string) => {
// // //     // If already visible, just hide it
// // //     if (visibleCredentials.includes(credentialId)) {
// // //       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
// // //       return
// // //     }

// // //     // Set loading state
// // //     setLoadingCredentials((prev) => [...prev, credentialId])

// // //     // If not visible, fetch the credential value from the server
// // //     try {
// // //       const token = document.cookie
// // //         .split("; ")
// // //         .find((row) => row.startsWith("token="))
// // //         ?.split("=")[1]

// // //       if (!token) {
// // //         throw new Error("Authentication token not found. Please log in again.")
// // //       }

// // //       const response = await fetch(
// // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
// // //         {
// // //           method: "GET",
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //         },
// // //       )

// // //       if (!response.ok) {
// // //         throw new Error(`Failed to fetch credential: ${response.statusText}`)
// // //       }

// // //       const data = await response.json()

// // //       // Update the credential in the credentials array with the fetched value
// // //       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

// // //       // Add to visible credentials
// // //       setVisibleCredentials((prev) => [...prev, credentialId])
// // //     } catch (err) {
// // //       console.error("Error fetching credential:", err)
// // //       setError(err instanceof Error ? err.message : "Failed to fetch credential")
// // //     } finally {
// // //       // Remove loading state
// // //       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
// // //     }
// // //   }

// // //   const handleUpdateCredential = (credential: Credential) => {
// // //     setSelectedCredential(credential)
// // //     setIsUpdateModalOpen(true)
// // //   }

// // //   const handleDeleteCredential = (credential: Credential) => {
// // //     setSelectedCredential(credential)
// // //     setIsDeleteDialogOpen(true)
// // //   }

// // //   const confirmDeleteCredential = async () => {
// // //     if (!selectedCredential || !projectId) return

// // //     setDeleteLoading(true)
// // //     try {
// // //       const token = document.cookie
// // //         .split("; ")
// // //         .find((row) => row.startsWith("token="))
// // //         ?.split("=")[1]

// // //       if (!token) {
// // //         throw new Error("Authentication token not found")
// // //       }

// // //       const response = await fetch(
// // //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
// // //         {
// // //           method: "DELETE",
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({ projectId }),
// // //         },
// // //       )

// // //       if (!response.ok) {
// // //         throw new Error("Failed to delete credential")
// // //       }

// // //       // Remove the credential from the state
// // //       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
// // //       setIsDeleteDialogOpen(false)
// // //       setSelectedCredential(null)
// // //     } catch (err) {
// // //       console.error("Error deleting credential:", err)
// // //       setError(err instanceof Error ? err.message : "Failed to delete credential")
// // //     } finally {
// // //       setDeleteLoading(false)
// // //     }
// // //   }

// // //   const refreshCredentials = async () => {
// // //     if (!projectId) return

// // //     setIsLoading(true)
// // //     setError(null)

// // //     try {
// // //       const token = document.cookie
// // //         .split("; ")
// // //         .find((row) => row.startsWith("token="))
// // //         ?.split("=")[1]

// // //       if (!token) {
// // //         throw new Error("Authentication token not found")
// // //       }

// // //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// // //         method: "GET",
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           "Content-Type": "application/json",
// // //         },
// // //       })

// // //       if (!response.ok) {
// // //         throw new Error("Failed to refresh credentials")
// // //       }

// // //       const data = await response.json()

// // //       setCredentials(data)
// // //     } catch (err) {
// // //       console.error("Error refreshing credentials:", err)
// // //       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const canAddCredential = true // Temporarily set to true for testing

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <main className="container mx-auto px-4 py-8">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h1 className="text-3xl font-bold">{projectName}</h1>
// // //           <div className="flex space-x-2">
// // //             {canAddCredential && activeTab === "credentials" && (
// // //               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // //           <TabsList>
// // //             <TabsTrigger value="credentials">Credentials</TabsTrigger>
// // //             <TabsTrigger value="members">Members</TabsTrigger>
// // //             {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
// // //           </TabsList>

// // //           <TabsContent value="credentials">
// // //             {error && (
// // //               <Alert variant="destructive" className="mb-6">
// // //                 <AlertCircle className="h-4 w-4" />
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}

// // //             {isLoading ? (
// // //               <div className="flex justify-center items-center h-64">
// // //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // //               </div>
// // //             ) : credentials.length === 0 ? (
// // //               <div className="text-center p-8 bg-white rounded-lg shadow">
// // //                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
// // //                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
// // //                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// // //               </div>
// // //             ) : (
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                 {credentials.map((credential, index) => (
// // //                   <CredentialCard
// // //                     key={credential.id}
// // //                     credential={credential}
// // //                     index={index}
// // //                     isVisible={visibleCredentials.includes(credential.id)}
// // //                     isLoading={loadingCredentials.includes(credential.id)}
// // //                     isAdmin={isAdmin}
// // //                     onToggleVisibility={toggleCredentialVisibility}
// // //                     onUpdate={handleUpdateCredential}
// // //                     onDelete={handleDeleteCredential}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </TabsContent>

// // //           <TabsContent value="members">
// // //             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
// // //           </TabsContent>

// // //           {/* Settings Tab - Admin Only */}
// // //           <TabsContent value="settings" className="space-y-6">
// // //             {!isAdmin ? (
// // //               <Alert variant="destructive" className="mb-6">
// // //                 <AlertCircle className="h-4 w-4" />
// // //                 <AlertDescription>You don't have permission to access project settings.</AlertDescription>
// // //               </Alert>
// // //             ) : (
// // //               <>
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <div className="flex justify-between items-center">
// // //                       <div>
// // //                         <CardTitle>Project Settings</CardTitle>
// // //                         <CardDescription>Configure project details and preferences</CardDescription>
// // //                       </div>
// // //                       <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
// // //                     </div>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-6">
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                       <div>
// // //                         <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
// // //                           Project Name
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           id="project-name"
// // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // //                           value={projectName}
// // //                           onChange={(e) => setProjectName(e.target.value)}
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
// // //                           Description
// // //                         </label>
// // //                         <textarea
// // //                           id="project-description"
// // //                           rows={3}
// // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // //                           placeholder="Project description"
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex justify-end">
// // //                       <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Credential Management</CardTitle>
// // //                     <CardDescription>Set up how credentials are managed in your project</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-4">
// // //                     <div className="space-y-2">
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Credential Rotation Policy</label>
// // //                       <div className="space-y-2">
// // //                         <div className="flex items-center space-x-2">
// // //                           <input
// // //                             type="radio"
// // //                             id="manual"
// // //                             name="rotationPolicy"
// // //                             value="manual"
// // //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// // //                             defaultChecked
// // //                           />
// // //                           <label htmlFor="manual" className="text-sm">
// // //                             Manual
// // //                           </label>
// // //                         </div>
// // //                         <div className="flex items-center space-x-2">
// // //                           <input
// // //                             type="radio"
// // //                             id="automatic"
// // //                             name="rotationPolicy"
// // //                             value="automatic"
// // //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// // //                           />
// // //                           <label htmlFor="automatic" className="text-sm">
// // //                             Automatic
// // //                           </label>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                       <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Master Key
// // //                       </label>
// // //                       <div className="relative">
// // //                         <input
// // //                           id="masterKey"
// // //                           type="password"
// // //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // //                           placeholder="Enter your master key"
// // //                         />
// // //                         <button
// // //                           type="button"
// // //                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
// // //                         >
// // //                           <Eye className="h-4 w-4 text-gray-400" />
// // //                         </button>
// // //                       </div>
// // //                       <p className="text-sm text-gray-500">
// // //                         Ensure your master key is secure and known only to authorized personnel.
// // //                       </p>
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                       <label htmlFor="rotationInterval" className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Rotation Interval (days)
// // //                       </label>
// // //                       <input
// // //                         id="rotationInterval"
// // //                         type="number"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // //                         defaultValue={90}
// // //                         min={10}
// // //                         max={365}
// // //                       />
// // //                       <p className="text-sm text-gray-500">Recommended: 90 days or less for optimal security.</p>
// // //                     </div>

// // //                     <div className="flex justify-end">
// // //                       <Button className="bg-black hover:bg-gray-800">Save Credential Settings</Button>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Logging and Auditing</CardTitle>
// // //                     <CardDescription>Configure logging and auditing settings for your project</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-4">
// // //                     <div className="space-y-2">
// // //                       <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
// // //                         Log Retention Period (days)
// // //                       </label>
// // //                       <input
// // //                         id="logRetentionPeriod"
// // //                         type="number"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// // //                         defaultValue={90}
// // //                         min={30}
// // //                         max={3650}
// // //                       />
// // //                       <p className="text-sm text-gray-500">
// // //                         Minimum 30 days. For compliance purposes, 90+ days is recommended.
// // //                       </p>
// // //                     </div>

// // //                     <div className="flex items-center justify-between">
// // //                       <label htmlFor="enableAuditLog" className="text-sm font-medium">
// // //                         Enable Detailed Audit Logs
// // //                       </label>
// // //                       <div
// // //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // //                         role="switch"
// // //                         aria-checked="true"
// // //                       >
// // //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex items-center justify-between">
// // //                       <label htmlFor="alertOnCriticalEvents" className="text-sm font-medium">
// // //                         Alert on Critical Events
// // //                       </label>
// // //                       <div
// // //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // //                         role="switch"
// // //                         aria-checked="true"
// // //                       >
// // //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // //                       </div>
// // //                     </div>

// // //                     <div className="flex justify-end">
// // //                       <Button className="bg-black hover:bg-gray-800">Save Logging Settings</Button>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Permission Management</CardTitle>
// // //                     <CardDescription>Control what different roles can access</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-6">
// // //                       {[
// // //                         {
// // //                           id: 1,
// // //                           role: "Project Manager",
// // //                           permissions: [
// // //                             { id: "pm_view", name: "View Credentials", enabled: true },
// // //                             { id: "pm_create", name: "Create Credentials", enabled: true },
// // //                             { id: "pm_update", name: "Update Credentials", enabled: true },
// // //                             { id: "pm_delete", name: "Delete Credentials", enabled: true },
// // //                             { id: "pm_invite", name: "Invite Members", enabled: true },
// // //                           ],
// // //                         },
// // //                         {
// // //                           id: 2,
// // //                           role: "Team Member",
// // //                           permissions: [
// // //                             { id: "tm_view", name: "View Credentials", enabled: true },
// // //                             { id: "tm_create", name: "Create Credentials", enabled: false },
// // //                             { id: "tm_update", name: "Update Credentials", enabled: false },
// // //                             { id: "tm_delete", name: "Delete Credentials", enabled: false },
// // //                             { id: "tm_invite", name: "Invite Members", enabled: false },
// // //                           ],
// // //                         },
// // //                         {
// // //                           id: 3,
// // //                           role: "Viewer",
// // //                           permissions: [
// // //                             { id: "v_view", name: "View Credentials", enabled: true },
// // //                             { id: "v_create", name: "Create Credentials", enabled: false },
// // //                             { id: "v_update", name: "Update Credentials", enabled: false },
// // //                             { id: "v_delete", name: "Delete Credentials", enabled: false },
// // //                             { id: "v_invite", name: "Invite Members", enabled: false },
// // //                           ],
// // //                         },
// // //                       ].map((roleGroup) => (
// // //                         <div key={roleGroup.id} className="border rounded-lg p-4">
// // //                           <h4 className="font-medium mb-3">{roleGroup.role}</h4>
// // //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// // //                             {roleGroup.permissions.map((permission) => (
// // //                               <div key={permission.id} className="flex items-center justify-between">
// // //                                 <span className="text-sm">{permission.name}</span>
// // //                                 <div
// // //                                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
// // //                                   data-state={permission.enabled ? "checked" : "unchecked"}
// // //                                   role="switch"
// // //                                   aria-checked={permission.enabled}
// // //                                 >
// // //                                   <span
// // //                                     className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
// // //                                     data-state={permission.enabled ? "checked" : "unchecked"}
// // //                                   />
// // //                                 </div>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                       <div className="flex justify-end">
// // //                         <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Credential Policies</CardTitle>
// // //                     <CardDescription>Set security requirements for credentials</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Require rotation</p>
// // //                           <p className="text-xs text-gray-500">Force credential rotation after a period</p>
// // //                         </div>
// // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // //                           <option>90 days</option>
// // //                           <option>60 days</option>
// // //                           <option>30 days</option>
// // //                           <option>Never</option>
// // //                         </select>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Minimum password length</p>
// // //                           <p className="text-xs text-gray-500">For password-type credentials</p>
// // //                         </div>
// // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // //                           <option>12 characters</option>
// // //                           <option>16 characters</option>
// // //                           <option>20 characters</option>
// // //                         </select>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Require approval for changes</p>
// // //                           <p className="text-xs text-gray-500">Admin must approve credential changes</p>
// // //                         </div>
// // //                         <div
// // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200"
// // //                           role="switch"
// // //                           aria-checked="false"
// // //                         >
// // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
// // //                         </div>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Auto-revoke on member removal</p>
// // //                           <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
// // //                         </div>
// // //                         <div
// // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // //                           role="switch"
// // //                           aria-checked="true"
// // //                         >
// // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // //                         </div>
// // //                       </div>

// // //                       <Separator className="my-4" />

// // //                       <div className="flex justify-end">
// // //                         <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Audit & Compliance</CardTitle>
// // //                     <CardDescription>Configure audit settings and compliance features</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Detailed audit logs</p>
// // //                           <p className="text-xs text-gray-500">Track all credential access and changes</p>
// // //                         </div>
// // //                         <div
// // //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// // //                           role="switch"
// // //                           aria-checked="true"
// // //                         >
// // //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// // //                         </div>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Export audit logs</p>
// // //                           <p className="text-xs text-gray-500">For compliance reporting</p>
// // //                         </div>
// // //                         <Button variant="outline" size="sm" className="rounded-full text-xs">
// // //                           Export Logs
// // //                         </Button>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Compliance reports</p>
// // //                           <p className="text-xs text-gray-500">Generate compliance reports</p>
// // //                         </div>
// // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // //                           <option>Weekly</option>
// // //                           <option>Monthly</option>
// // //                           <option>Quarterly</option>
// // //                           <option>On demand</option>
// // //                         </select>
// // //                       </div>

// // //                       <div className="flex items-center justify-between">
// // //                         <div>
// // //                           <p className="font-medium text-sm">Retention period</p>
// // //                           <p className="text-xs text-gray-500">How long to keep audit logs</p>
// // //                         </div>
// // //                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
// // //                           <option>1 year</option>
// // //                           <option>2 years</option>
// // //                           <option>5 years</option>
// // //                           <option>Forever</option>
// // //                         </select>
// // //                       </div>

// // //                       <Separator className="my-4" />

// // //                       <div className="flex justify-end">
// // //                         <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Project Integration</CardTitle>
// // //                     <CardDescription>Connect with other services</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       {[
// // //                         { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
// // //                         { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
// // //                         { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
// // //                         { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
// // //                       ].map((integration) => (
// // //                         <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
// // //                           <div className="flex items-center">
// // //                             <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
// // //                             <p className="font-medium">{integration.name}</p>
// // //                           </div>
// // //                           <Button
// // //                             variant={integration.connected ? "outline" : "default"}
// // //                             size="sm"
// // //                             className={`rounded-full text-xs ${
// // //                               integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
// // //                             }`}
// // //                           >
// // //                             {integration.connected ? "Connected" : "Connect"}
// // //                           </Button>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card className="border-red-200">
// // //                   <CardHeader className="text-red-600">
// // //                     <CardTitle>Danger Zone</CardTitle>
// // //                     <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // //                         <div>
// // //                           <p className="font-medium">Archive Project</p>
// // //                           <p className="text-sm text-gray-500">
// // //                             The project will be archived and read-only for all members
// // //                           </p>
// // //                         </div>
// // //                         <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
// // //                           Archive
// // //                         </Button>
// // //                       </div>

// // //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// // //                         <div>
// // //                           <p className="font-medium">Delete Project</p>
// // //                           <p className="text-sm text-gray-500">
// // //                             This action is permanent and cannot be undone. All credentials will be deleted.
// // //                           </p>
// // //                         </div>
// // //                         <Button variant="destructive">Delete</Button>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </>
// // //             )}
// // //           </TabsContent>
// // //         </Tabs>

// // //         <AddCredentialModal
// // //           isOpen={isAddModalOpen}
// // //           onClose={() => setIsAddModalOpen(false)}
// // //           projectId={projectId}
// // //           onCredentialAdded={refreshCredentials}
// // //           existingCredentials={credentials}
// // //         />

// // //         {selectedCredential && (
// // //           <UpdateCredentialModal
// // //             isOpen={isUpdateModalOpen}
// // //             onClose={() => {
// // //               setIsUpdateModalOpen(false)
// // //               setSelectedCredential(null)
// // //             }}
// // //             credential={selectedCredential}
// // //             projectId={projectId}
// // //             onCredentialUpdated={refreshCredentials}
// // //           />
// // //         )}

// // //         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // //           <AlertDialogContent>
// // //             <AlertDialogHeader>
// // //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // //               <AlertDialogDescription>
// // //                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
// // //               </AlertDialogDescription>
// // //             </AlertDialogHeader>
// // //             <AlertDialogFooter>
// // //               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
// // //               <AlertDialogAction
// // //                 onClick={confirmDeleteCredential}
// // //                 disabled={deleteLoading}
// // //                 className="bg-red-600 hover:bg-red-700"
// // //               >
// // //                 {deleteLoading ? (
// // //                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
// // //                 ) : (
// // //                   "Delete"
// // //                 )}
// // //               </AlertDialogAction>
// // //             </AlertDialogFooter>
// // //           </AlertDialogContent>
// // //         </AlertDialog>
// // //       </main>
// // //     </div>
// // //   )
// // // }

// // "use client"

// // import { useParams } from "next/navigation"
// // import { useState, useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { AlertCircle, Shield, FileText, Lock, Users, Eye } from "lucide-react"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// // } from "@/components/ui/alert-dialog"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Badge } from "@/components/ui/badge"
// // import { Separator } from "@/components/ui/separator"
// // import AddCredentialModal from "@/app/components/AddCredentialModal"
// // import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// // import ProjectMembers from "@/app/components/project-members"
// // import CredentialCard from "@/app/components/credential-card"

// // // Interfaces from your original code
// // interface TagObject {
// //   id: string
// //   name: string
// // }

// // interface CreatedBy {
// //   id: string
// //   name: string
// // }

// // interface Credential {
// //   id: string
// //   name: string
// //   type: string
// //   value?: string
// //   description: string
// //   createdBy: CreatedBy
// //   tags: TagObject[]
// //   lastUpdated?: string
// //   updatedBy?: string
// // }

// // export default function ProjectPage() {
// //   const [credentials, setCredentials] = useState<Credential[]>([])
// //   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
// //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
// //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// //   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
// //   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const [isAdmin, setIsAdmin] = useState(false)
// //   const [deleteLoading, setDeleteLoading] = useState(false)
// //   const [activeTab, setActiveTab] = useState("credentials")
// //   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])
// //   const [projectName, setProjectName] = useState("Project Dashboard")
// //   const [rotationPolicy, setRotationPolicy] = useState("manual")

// //   const params = useParams()

// //   // Safely extract projectId and orgId from params
// //   const projectId = params?.projectId as string
// //   const orgId = params?.orgId as string

// //   // Check if user is admin
// //   useEffect(() => {
// //     const fetchAdminStatus = async () => {
// //       try {
// //         // Import the server action
// //         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

// //         // Call the server action to check admin status
// //         const isAdminResult = await checkAdminStatus(projectId)
// //         setIsAdmin(isAdminResult)
// //       } catch (error) {
// //         console.error("Error checking admin status:", error)
// //         setIsAdmin(false)
// //       }
// //     }

// //     if (projectId) {
// //       fetchAdminStatus()
// //     }
// //   }, [projectId])

// //   useEffect(() => {
// //     if (!projectId) return
// //     const fetchCredentials = async () => {
// //       setIsLoading(true)
// //       setError(null)

// //       try {
// //         // Get the authentication token from cookie
// //         const token = document.cookie
// //           .split("; ")
// //           .find((row) => row.startsWith("token="))
// //           ?.split("=")[1]

// //         if (!token) {
// //           throw new Error("Authentication token not found. Please log in again.")
// //         }

// //         const response = await fetch(
// //           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
// //           {
// //             method: "GET",
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               "Content-Type": "application/json",
// //             },
// //           },
// //         )

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
// //         }

// //         const data = await response.json()
// //         setCredentials(data)
// //       } catch (err) {
// //         console.error("Error fetching credentials:", err)
// //         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     fetchCredentials()
// //   }, [projectId])

// //   const toggleCredentialVisibility = async (credentialId: string) => {
// //     // If already visible, just hide it
// //     if (visibleCredentials.includes(credentialId)) {
// //       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
// //       return
// //     }

// //     // Set loading state
// //     setLoadingCredentials((prev) => [...prev, credentialId])

// //     // If not visible, fetch the credential value from the server
// //     try {
// //       const token = document.cookie
// //         .split("; ")
// //         .find((row) => row.startsWith("token="))
// //         ?.split("=")[1]

// //       if (!token) {
// //         throw new Error("Authentication token not found. Please log in again.")
// //       }

// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         },
// //       )

// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch credential: ${response.statusText}`)
// //       }

// //       const data = await response.json()

// //       // Update the credential in the credentials array with the fetched value
// //       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

// //       // Add to visible credentials
// //       setVisibleCredentials((prev) => [...prev, credentialId])
// //     } catch (err) {
// //       console.error("Error fetching credential:", err)
// //       setError(err instanceof Error ? err.message : "Failed to fetch credential")
// //     } finally {
// //       // Remove loading state
// //       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
// //     }
// //   }

// //   const handleUpdateCredential = (credential: Credential) => {
// //     setSelectedCredential(credential)
// //     setIsUpdateModalOpen(true)
// //   }

// //   const handleDeleteCredential = (credential: Credential) => {
// //     setSelectedCredential(credential)
// //     setIsDeleteDialogOpen(true)
// //   }

// //   const confirmDeleteCredential = async () => {
// //     if (!selectedCredential || !projectId) return

// //     setDeleteLoading(true)
// //     try {
// //       const token = document.cookie
// //         .split("; ")
// //         .find((row) => row.startsWith("token="))
// //         ?.split("=")[1]

// //       if (!token) {
// //         throw new Error("Authentication token not found")
// //       }

// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
// //         {
// //           method: "DELETE",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ projectId }),
// //         },
// //       )

// //       if (!response.ok) {
// //         throw new Error("Failed to delete credential")
// //       }

// //       // Remove the credential from the state
// //       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
// //       setIsDeleteDialogOpen(false)
// //       setSelectedCredential(null)
// //     } catch (err) {
// //       console.error("Error deleting credential:", err)
// //       setError(err instanceof Error ? err.message : "Failed to delete credential")
// //     } finally {
// //       setDeleteLoading(false)
// //     }
// //   }

// //   const refreshCredentials = async () => {
// //     if (!projectId) return

// //     setIsLoading(true)
// //     setError(null)

// //     try {
// //       const token = document.cookie
// //         .split("; ")
// //         .find((row) => row.startsWith("token="))
// //         ?.split("=")[1]

// //       if (!token) {
// //         throw new Error("Authentication token not found")
// //       }

// //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       })

// //       if (!response.ok) {
// //         throw new Error("Failed to refresh credentials")
// //       }

// //       const data = await response.json()

// //       setCredentials(data)
// //     } catch (err) {
// //       console.error("Error refreshing credentials:", err)
// //       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const canAddCredential = true // Temporarily set to true for testing

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <main className="container mx-auto px-4 py-8">
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold">{projectName}</h1>
// //           <div className="flex space-x-2">
// //             {canAddCredential && activeTab === "credentials" && (
// //               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// //             )}
// //           </div>
// //         </div>

// //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// //           <TabsList>
// //             <TabsTrigger value="credentials">Credentials</TabsTrigger>
// //             <TabsTrigger value="members">Members</TabsTrigger>
// //             {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
// //           </TabsList>

// //           <TabsContent value="credentials">
// //             {error && (
// //               <Alert variant="destructive" className="mb-6">
// //                 <AlertCircle className="h-4 w-4" />
// //                 <AlertDescription>{error}</AlertDescription>
// //               </Alert>
// //             )}

// //             {isLoading ? (
// //               <div className="flex justify-center items-center h-64">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// //               </div>
// //             ) : credentials.length === 0 ? (
// //               <div className="text-center p-8 bg-white rounded-lg shadow">
// //                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
// //                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
// //                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {credentials.map((credential, index) => (
// //                   <CredentialCard
// //                     key={credential.id}
// //                     credential={credential}
// //                     index={index}
// //                     isVisible={visibleCredentials.includes(credential.id)}
// //                     isLoading={loadingCredentials.includes(credential.id)}
// //                     isAdmin={isAdmin}
// //                     onToggleVisibility={toggleCredentialVisibility}
// //                     onUpdate={handleUpdateCredential}
// //                     onDelete={handleDeleteCredential}
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </TabsContent>

// //           <TabsContent value="members">
// //             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
// //           </TabsContent>

// //           {/* Settings Tab - Admin Only */}
// //           <TabsContent value="settings" className="space-y-6">
// //             {!isAdmin ? (
// //               <Alert variant="destructive" className="mb-6">
// //                 <AlertCircle className="h-4 w-4" />
// //                 <AlertDescription>You don't have permission to access project settings.</AlertDescription>
// //               </Alert>
// //             ) : (
// //               <>
// //                 <Card>
// //                   <CardHeader>
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <CardTitle>Project Settings</CardTitle>
// //                         <CardDescription>Configure project details and preferences</CardDescription>
// //                       </div>
// //                       <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent className="space-y-6">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       <div>
// //                         <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
// //                           Project Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           id="project-name"
// //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// //                           value={projectName}
// //                           onChange={(e) => setProjectName(e.target.value)}
// //                         />
// //                       </div>
// //                       <div>
// //                         <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
// //                           Description
// //                         </label>
// //                         <textarea
// //                           id="project-description"
// //                           rows={3}
// //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// //                           placeholder="Project description"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="flex justify-end">
// //                       <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Credential Management</CardTitle>
// //                     <CardDescription>Set up how credentials are managed in your project</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <div className="space-y-2">
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Credential Rotation Policy</label>
// //                       <div className="space-y-2">
// //                         <div className="flex items-center space-x-2">
// //                           <input
// //                             type="radio"
// //                             id="manual"
// //                             name="rotationPolicy"
// //                             value="manual"
// //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// //                             checked={rotationPolicy === "manual"}
// //                             onChange={() => setRotationPolicy("manual")}
// //                           />
// //                           <label htmlFor="manual" className="text-sm">
// //                             Manual
// //                           </label>
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <input
// //                             type="radio"
// //                             id="automatic"
// //                             name="rotationPolicy"
// //                             value="automatic"
// //                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
// //                             checked={rotationPolicy === "automatic"}
// //                             onChange={() => setRotationPolicy("automatic")}
// //                           />
// //                           <label htmlFor="automatic" className="text-sm">
// //                             Automatic
// //                           </label>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {rotationPolicy === "manual" && (
// //                       <div className="space-y-2">
// //                         <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-1">
// //                           Master Key
// //                         </label>
// //                         <div className="relative">
// //                           <input
// //                             id="masterKey"
// //                             type="password"
// //                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// //                             placeholder="Enter your master key"
// //                           />
// //                           <button
// //                             type="button"
// //                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
// //                           >
// //                             <Eye className="h-4 w-4 text-gray-400" />
// //                           </button>
// //                         </div>
// //                         <p className="text-sm text-gray-500">
// //                           Ensure your master key is secure and known only to authorized personnel.
// //                         </p>
// //                       </div>
// //                     )}

// //                     {rotationPolicy === "automatic" && (
// //                       <div className="space-y-2">
// //                         <label htmlFor="rotationInterval" className="block text-sm font-medium text-gray-700 mb-1">
// //                           Rotation Interval (days)
// //                         </label>
// //                         <select
// //                           id="rotationInterval"
// //                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// //                         >
// //                           <option value="30">30 days</option>
// //                           <option value="60">60 days</option>
// //                           <option value="90" selected>
// //                             90 days
// //                           </option>
// //                           <option value="180">180 days</option>
// //                         </select>
// //                         <p className="text-sm text-gray-500">Recommended: 90 days or less for optimal security.</p>
// //                       </div>
// //                     )}

// //                     <div className="flex justify-end">
// //                       <Button className="bg-black hover:bg-gray-800">Save Credential Settings</Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Logging and Auditing</CardTitle>
// //                     <CardDescription>Configure logging and auditing settings for your project</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <div className="space-y-2">
// //                       <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
// //                         Log Retention Period (days)
// //                       </label>
// //                       <input
// //                         id="logRetentionPeriod"
// //                         type="number"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
// //                         defaultValue={90}
// //                         min={30}
// //                         max={3650}
// //                       />
// //                       <p className="text-sm text-gray-500">
// //                         Minimum 30 days. For compliance purposes, 90+ days is recommended.
// //                       </p>
// //                     </div>

// //                     <div className="flex items-center justify-between">
// //                       <label htmlFor="enableAuditLog" className="text-sm font-medium">
// //                         Enable Detailed Audit Logs
// //                       </label>
// //                       <div
// //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// //                         role="switch"
// //                         aria-checked="true"
// //                       >
// //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// //                       </div>
// //                     </div>

// //                     <div className="flex items-center justify-between">
// //                       <label htmlFor="alertOnCriticalEvents" className="text-sm font-medium">
// //                         Alert on Critical Events
// //                       </label>
// //                       <div
// //                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// //                         role="switch"
// //                         aria-checked="true"
// //                       >
// //                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// //                       </div>
// //                     </div>

// //                     <div className="flex justify-end">
// //                       <Button className="bg-black hover:bg-gray-800">Save Logging Settings</Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Permission Management</CardTitle>
// //                     <CardDescription>Control what different roles can access</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-6">
// //                       {[
// //                         {
// //                           id: 1,
// //                           role: "Project Manager",
// //                           permissions: [
// //                             { id: "pm_view", name: "View Credentials", enabled: true },
// //                             { id: "pm_create", name: "Create Credentials", enabled: true },
// //                             { id: "pm_update", name: "Update Credentials", enabled: true },
// //                             { id: "pm_delete", name: "Delete Credentials", enabled: true },
// //                             { id: "pm_invite", name: "Invite Members", enabled: true },
// //                           ],
// //                         },
// //                         {
// //                           id: 2,
// //                           role: "Team Member",
// //                           permissions: [
// //                             { id: "tm_view", name: "View Credentials", enabled: true },
// //                             { id: "tm_create", name: "Create Credentials", enabled: false },
// //                             { id: "tm_update", name: "Update Credentials", enabled: false },
// //                             { id: "tm_delete", name: "Delete Credentials", enabled: false },
// //                             { id: "tm_invite", name: "Invite Members", enabled: false },
// //                           ],
// //                         },
// //                         {
// //                           id: 3,
// //                           role: "Viewer",
// //                           permissions: [
// //                             { id: "v_view", name: "View Credentials", enabled: true },
// //                             { id: "v_create", name: "Create Credentials", enabled: false },
// //                             { id: "v_update", name: "Update Credentials", enabled: false },
// //                             { id: "v_delete", name: "Delete Credentials", enabled: false },
// //                             { id: "v_invite", name: "Invite Members", enabled: false },
// //                           ],
// //                         },
// //                       ].map((roleGroup) => (
// //                         <div key={roleGroup.id} className="border rounded-lg p-4">
// //                           <h4 className="font-medium mb-3">{roleGroup.role}</h4>
// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                             {roleGroup.permissions.map((permission) => (
// //                               <div key={permission.id} className="flex items-center justify-between">
// //                                 <span className="text-sm">{permission.name}</span>
// //                                 <div
// //                                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
// //                                   data-state={permission.enabled ? "checked" : "unchecked"}
// //                                   role="switch"
// //                                   aria-checked={permission.enabled}
// //                                 >
// //                                   <span
// //                                     className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
// //                                     data-state={permission.enabled ? "checked" : "unchecked"}
// //                                   />
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       ))}
// //                       <div className="flex justify-end">
// //                         <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Credential Policies</CardTitle>
// //                     <CardDescription>Set security requirements for credentials</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Require rotation</p>
// //                           <p className="text-xs text-gray-500">Force credential rotation after a period</p>
// //                         </div>
// //                         <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-black focus:border-black">
// //                           <option>90 days</option>
// //                           <option>60 days</option>
// //                           <option>30 days</option>
// //                           <option>Never</option>
// //                         </select>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Minimum password length</p>
// //                           <p className="text-xs text-gray-500">For password-type credentials</p>
// //                         </div>
// //                         <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-black focus:border-black">
// //                           <option>12 characters</option>
// //                           <option>16 characters</option>
// //                           <option>20 characters</option>
// //                         </select>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Require approval for changes</p>
// //                           <p className="text-xs text-gray-500">Admin must approve credential changes</p>
// //                         </div>
// //                         <div
// //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200"
// //                           role="switch"
// //                           aria-checked="false"
// //                         >
// //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
// //                         </div>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Auto-revoke on member removal</p>
// //                           <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
// //                         </div>
// //                         <div
// //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// //                           role="switch"
// //                           aria-checked="true"
// //                         >
// //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// //                         </div>
// //                       </div>

// //                       <Separator className="my-4" />

// //                       <div className="flex justify-end">
// //                         <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Audit & Compliance</CardTitle>
// //                     <CardDescription>Configure audit settings and compliance features</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Detailed audit logs</p>
// //                           <p className="text-xs text-gray-500">Track all credential access and changes</p>
// //                         </div>
// //                         <div
// //                           className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
// //                           role="switch"
// //                           aria-checked="true"
// //                         >
// //                           <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
// //                         </div>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Export audit logs</p>
// //                           <p className="text-xs text-gray-500">For compliance reporting</p>
// //                         </div>
// //                         <Button variant="outline" size="sm" className="rounded-full text-xs">
// //                           Export Logs
// //                         </Button>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Compliance reports</p>
// //                           <p className="text-xs text-gray-500">Generate compliance reports</p>
// //                         </div>
// //                         <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-black focus:border-black">
// //                           <option>Weekly</option>
// //                           <option>Monthly</option>
// //                           <option>Quarterly</option>
// //                           <option>On demand</option>
// //                         </select>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-sm">Retention period</p>
// //                           <p className="text-xs text-gray-500">How long to keep audit logs</p>
// //                         </div>
// //                         <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-black focus:border-black">
// //                           <option>1 year</option>
// //                           <option>2 years</option>
// //                           <option>5 years</option>
// //                           <option>Forever</option>
// //                         </select>
// //                       </div>

// //                       <Separator className="my-4" />

// //                       <div className="flex justify-end">
// //                         <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Project Integration</CardTitle>
// //                     <CardDescription>Connect with other services</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       {[
// //                         { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
// //                         { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
// //                         { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
// //                         { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
// //                       ].map((integration) => (
// //                         <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
// //                           <div className="flex items-center">
// //                             <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
// //                             <p className="font-medium">{integration.name}</p>
// //                           </div>
// //                           <Button
// //                             variant={integration.connected ? "outline" : "default"}
// //                             size="sm"
// //                             className={`rounded-full text-xs ${
// //                               integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
// //                             }`}
// //                           >
// //                             {integration.connected ? "Connected" : "Connect"}
// //                           </Button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card className="border-red-200">
// //                   <CardHeader className="text-red-600">
// //                     <CardTitle>Danger Zone</CardTitle>
// //                     <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// //                         <div>
// //                           <p className="font-medium">Archive Project</p>
// //                           <p className="text-sm text-gray-500">
// //                             The project will be archived and read-only for all members
// //                           </p>
// //                         </div>
// //                         <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
// //                           Archive
// //                         </Button>
// //                       </div>

// //                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
// //                         <div>
// //                           <p className="font-medium">Delete Project</p>
// //                           <p className="text-sm text-gray-500">
// //                             This action is permanent and cannot be undone. All credentials will be deleted.
// //                           </p>
// //                         </div>
// //                         <Button variant="destructive">Delete</Button>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </>
// //             )}
// //           </TabsContent>
// //         </Tabs>

// //         <AddCredentialModal
// //           isOpen={isAddModalOpen}
// //           onClose={() => setIsAddModalOpen(false)}
// //           projectId={projectId}
// //           onCredentialAdded={refreshCredentials}
// //           existingCredentials={credentials}
// //         />

// //         {selectedCredential && (
// //           <UpdateCredentialModal
// //             isOpen={isUpdateModalOpen}
// //             onClose={() => {
// //               setIsUpdateModalOpen(false)
// //               setSelectedCredential(null)
// //             }}
// //             credential={selectedCredential}
// //             projectId={projectId}
// //             onCredentialUpdated={refreshCredentials}
// //           />
// //         )}

// //         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// //           <AlertDialogContent>
// //             <AlertDialogHeader>
// //               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// //               <AlertDialogDescription>
// //                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
// //               </AlertDialogDescription>
// //             </AlertDialogHeader>
// //             <AlertDialogFooter>
// //               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
// //               <AlertDialogAction
// //                 onClick={confirmDeleteCredential}
// //                 disabled={deleteLoading}
// //                 className="bg-red-600 hover:bg-red-700"
// //               >
// //                 {deleteLoading ? (
// //                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
// //                 ) : (
// //                   "Delete"
// //                 )}
// //               </AlertDialogAction>
// //             </AlertDialogFooter>
// //           </AlertDialogContent>
// //         </AlertDialog>
// //       </main>
// //     </div>
// //   )
// // }

// "use client"

// import { useParams } from "next/navigation"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AlertCircle, Shield, FileText, Lock, Users, Eye } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import AddCredentialModal from "@/app/components/AddCredentialModal"
// import UpdateCredentialModal from "@/app/components/UpdateCredentialModal"
// import ProjectMembers from "@/app/components/project-members"
// import CredentialCard from "@/app/components/credential-card"

// // Interfaces from your original code
// interface TagObject {
//   id: string
//   name: string
// }

// interface CreatedBy {
//   id: string
//   name: string
// }

// interface Credential {
//   id: string
//   name: string
//   type: string
//   value?: string
//   description: string
//   createdBy: CreatedBy
//   tags: TagObject[]
//   lastUpdated?: string
//   updatedBy?: string
// }

// export default function ProjectPage() {
//   const [credentials, setCredentials] = useState<Credential[]>([])
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
//   const [visibleCredentials, setVisibleCredentials] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [deleteLoading, setDeleteLoading] = useState(false)
//   const [activeTab, setActiveTab] = useState("credentials")
//   const [loadingCredentials, setLoadingCredentials] = useState<string[]>([])
//   const [projectName, setProjectName] = useState("Project Dashboard")
//   const [rotationPolicy, setRotationPolicy] = useState("manual")

//   // Add these state variables at the top of the component with the other state variables
//   const [enableAuditLog, setEnableAuditLog] = useState(true)
//   const [alertOnCriticalEvents, setAlertOnCriticalEvents] = useState(true)
//   const [detailedAuditLogs, setDetailedAuditLogs] = useState(true)
//   const [requireApproval, setRequireApproval] = useState(false)
//   const [autoRevokeOnRemoval, setAutoRevokeOnRemoval] = useState(true)

//   const params = useParams()

//   // Safely extract projectId and orgId from params
//   const projectId = params?.projectId as string
//   const orgId = params?.orgId as string

//   // Check if user is admin
//   useEffect(() => {
//     const fetchAdminStatus = async () => {
//       try {
//         // Import the server action
//         const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

//         // Call the server action to check admin status
//         const isAdminResult = await checkAdminStatus(projectId)
//         setIsAdmin(isAdminResult)
//       } catch (error) {
//         console.error("Error checking admin status:", error)
//         setIsAdmin(false)
//       }
//     }

//     if (projectId) {
//       fetchAdminStatus()
//     }
//   }, [projectId])

//   useEffect(() => {
//     if (!projectId) return
//     const fetchCredentials = async () => {
//       setIsLoading(true)
//       setError(null)

//       try {
//         // Get the authentication token from cookie
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("token="))
//           ?.split("=")[1]

//         if (!token) {
//           throw new Error("Authentication token not found. Please log in again.")
//         }

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           },
//         )

//         if (!response.ok) {
//           throw new Error(`Failed to fetch credentials: ${response.statusText}`)
//         }

//         const data = await response.json()
//         setCredentials(data)
//       } catch (err) {
//         console.error("Error fetching credentials:", err)
//         setError(err instanceof Error ? err.message : "Failed to fetch credentials")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchCredentials()
//   }, [projectId])

//   const toggleCredentialVisibility = async (credentialId: string) => {
//     // If already visible, just hide it
//     if (visibleCredentials.includes(credentialId)) {
//       setVisibleCredentials((prev) => prev.filter((id) => id !== credentialId))
//       return
//     }

//     // Set loading state
//     setLoadingCredentials((prev) => [...prev, credentialId])

//     // If not visible, fetch the credential value from the server
//     try {
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1]

//       if (!token) {
//         throw new Error("Authentication token not found. Please log in again.")
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       )

//       if (!response.ok) {
//         throw new Error(`Failed to fetch credential: ${response.statusText}`)
//       }

//       const data = await response.json()

//       // Update the credential in the credentials array with the fetched value
//       setCredentials((prev) => prev.map((cred) => (cred.id === credentialId ? { ...cred, value: data.value } : cred)))

//       // Add to visible credentials
//       setVisibleCredentials((prev) => [...prev, credentialId])
//     } catch (err) {
//       console.error("Error fetching credential:", err)
//       setError(err instanceof Error ? err.message : "Failed to fetch credential")
//     } finally {
//       // Remove loading state
//       setLoadingCredentials((prev) => prev.filter((id) => id !== credentialId))
//     }
//   }

//   const handleUpdateCredential = (credential: Credential) => {
//     setSelectedCredential(credential)
//     setIsUpdateModalOpen(true)
//   }

//   const handleDeleteCredential = (credential: Credential) => {
//     setSelectedCredential(credential)
//     setIsDeleteDialogOpen(true)
//   }

//   const confirmDeleteCredential = async () => {
//     if (!selectedCredential || !projectId) return

//     setDeleteLoading(true)
//     try {
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1]

//       if (!token) {
//         throw new Error("Authentication token not found")
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ projectId }),
//         },
//       )

//       if (!response.ok) {
//         throw new Error("Failed to delete credential")
//       }

//       // Remove the credential from the state
//       setCredentials((prev) => prev.filter((cred) => cred.id !== selectedCredential.id))
//       setIsDeleteDialogOpen(false)
//       setSelectedCredential(null)
//     } catch (err) {
//       console.error("Error deleting credential:", err)
//       setError(err instanceof Error ? err.message : "Failed to delete credential")
//     } finally {
//       setDeleteLoading(false)
//     }
//   }

//   const refreshCredentials = async () => {
//     if (!projectId) return

//     setIsLoading(true)
//     setError(null)

//     try {
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token="))
//         ?.split("=")[1]

//       if (!token) {
//         throw new Error("Authentication token not found")
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (!response.ok) {
//         throw new Error("Failed to refresh credentials")
//       }

//       const data = await response.json()

//       setCredentials(data)
//     } catch (err) {
//       console.error("Error refreshing credentials:", err)
//       setError(err instanceof Error ? err.message : "Failed to refresh credentials")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const canAddCredential = true // Temporarily set to true for testing

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">{projectName}</h1>
//           <div className="flex space-x-2">
//             {canAddCredential && activeTab === "credentials" && (
//               <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
//             )}
//           </div>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="credentials">Credentials</TabsTrigger>
//             <TabsTrigger value="members">Members</TabsTrigger>
//             {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
//           </TabsList>

//           <TabsContent value="credentials">
//             {error && (
//               <Alert variant="destructive" className="mb-6">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//               </div>
//             ) : credentials.length === 0 ? (
//               <div className="text-center p-8 bg-white rounded-lg shadow">
//                 <h3 className="text-xl font-medium mb-2">No credentials found</h3>
//                 <p className="text-gray-500 mb-4">Add your first credential to get started</p>
//                 <Button onClick={() => setIsAddModalOpen(true)}>Add New Credential</Button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {credentials.map((credential, index) => (
//                   <CredentialCard
//                     key={credential.id}
//                     credential={credential}
//                     index={index}
//                     isVisible={visibleCredentials.includes(credential.id)}
//                     isLoading={loadingCredentials.includes(credential.id)}
//                     isAdmin={isAdmin}
//                     onToggleVisibility={toggleCredentialVisibility}
//                     onUpdate={handleUpdateCredential}
//                     onDelete={handleDeleteCredential}
//                   />
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="members">
//             <ProjectMembers projectId={projectId} orgId={orgId} isAdmin={isAdmin} />
//           </TabsContent>

//           {/* Settings Tab - Admin Only */}
//           <TabsContent value="settings" className="space-y-6">
//             {!isAdmin ? (
//               <Alert variant="destructive" className="mb-6">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>You don't have permission to access project settings.</AlertDescription>
//               </Alert>
//             ) : (
//               <>
//                 <Card>
//                   <CardHeader>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <CardTitle>Project Settings</CardTitle>
//                         <CardDescription>Configure project details and preferences</CardDescription>
//                       </div>
//                       <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
//                           Project Name
//                         </label>
//                         <input
//                           type="text"
//                           id="project-name"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                           value={projectName}
//                           onChange={(e) => setProjectName(e.target.value)}
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
//                           Description
//                         </label>
//                         <textarea
//                           id="project-description"
//                           rows={3}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                           placeholder="Project description"
//                         />
//                       </div>
//                     </div>
//                     <div className="flex justify-end">
//                       <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Credential Management</CardTitle>
//                     <CardDescription>Set up how credentials are managed in your project</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Credential Rotation Policy</label>
//                       <div className="space-y-2">
//                         <div className="flex items-center space-x-2">
//                           <input
//                             type="radio"
//                             id="manual"
//                             name="rotationPolicy"
//                             value="manual"
//                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
//                             checked={rotationPolicy === "manual"}
//                             onChange={() => setRotationPolicy("manual")}
//                           />
//                           <label htmlFor="manual" className="text-sm">
//                             Manual
//                           </label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <input
//                             type="radio"
//                             id="automatic"
//                             name="rotationPolicy"
//                             value="automatic"
//                             className="h-4 w-4 text-black focus:ring-black border-gray-300"
//                             checked={rotationPolicy === "automatic"}
//                             onChange={() => setRotationPolicy("automatic")}
//                           />
//                           <label htmlFor="automatic" className="text-sm">
//                             Automatic
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     {rotationPolicy === "manual" && (
//                       <div className="space-y-2">
//                         <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-1">
//                           Master Key
//                         </label>
//                         <div className="relative">
//                           <input
//                             id="masterKey"
//                             type="password"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                             placeholder="Enter your master key"
//                           />
//                           <button
//                             type="button"
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                           >
//                             <Eye className="h-4 w-4 text-gray-400" />
//                           </button>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           Ensure your master key is secure and known only to authorized personnel.
//                         </p>
//                       </div>
//                     )}

//                     {rotationPolicy === "automatic" && (
//                       <div className="space-y-2">
//                         <label htmlFor="rotationInterval" className="block text-sm font-medium text-gray-700 mb-1">
//                           Rotation Interval (days)
//                         </label>
//                         <select
//                           id="rotationInterval"
//                           className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-black focus:border-black"
//                         >
//                           <option value="30">30 days</option>
//                           <option value="60">60 days</option>
//                           <option value="90" selected>
//                             90 days
//                           </option>
//                           <option value="180">180 days</option>
//                         </select>
//                         <p className="text-sm text-gray-500">Recommended: 90 days or less for optimal security.</p>
//                       </div>
//                     )}

//                     <div className="flex justify-end">
//                       <Button className="bg-black hover:bg-gray-800">Save Credential Settings</Button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Logging and Auditing</CardTitle>
//                     <CardDescription>Configure logging and auditing settings for your project</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                       <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
//                         Log Retention Period (days)
//                       </label>
//                       <input
//                         id="logRetentionPeriod"
//                         type="number"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
//                         defaultValue={90}
//                         min={30}
//                         max={3650}
//                       />
//                       <p className="text-sm text-gray-500">
//                         Minimum 30 days. For compliance purposes, 90+ days is recommended.
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <label htmlFor="enableAuditLog" className="text-sm font-medium">
//                         Enable Detailed Audit Logs
//                       </label>
//                       <div
//                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
//                         role="switch"
//                         aria-checked={enableAuditLog}
//                         onClick={() => setEnableAuditLog(!enableAuditLog)}
//                       >
//                         <span
//                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                             enableAuditLog ? "translate-x-5" : "translate-x-1"
//                           }`}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <label htmlFor="alertOnCriticalEvents" className="text-sm font-medium">
//                         Alert on Critical Events
//                       </label>
//                       <div
//                         className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-black"
//                         role="switch"
//                         aria-checked={alertOnCriticalEvents}
//                         onClick={() => setAlertOnCriticalEvents(!alertOnCriticalEvents)}
//                       >
//                         <span
//                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                             alertOnCriticalEvents ? "translate-x-5" : "translate-x-1"
//                           }`}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex justify-end">
//                       <Button className="bg-black hover:bg-gray-800">Save Logging Settings</Button>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Permission Management</CardTitle>
//                     <CardDescription>Control what different roles can access</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       {[
//                         {
//                           id: 1,
//                           role: "Project Manager",
//                           permissions: [
//                             { id: "pm_view", name: "View Credentials", enabled: true },
//                             { id: "pm_create", name: "Create Credentials", enabled: true },
//                             { id: "pm_update", name: "Update Credentials", enabled: true },
//                             { id: "pm_delete", name: "Delete Credentials", enabled: true },
//                             { id: "pm_invite", name: "Invite Members", enabled: true },
//                           ],
//                         },
//                         {
//                           id: 2,
//                           role: "Team Member",
//                           permissions: [
//                             { id: "tm_view", name: "View Credentials", enabled: true },
//                             { id: "tm_create", name: "Create Credentials", enabled: false },
//                             { id: "tm_update", name: "Update Credentials", enabled: false },
//                             { id: "tm_delete", name: "Delete Credentials", enabled: false },
//                             { id: "tm_invite", name: "Invite Members", enabled: false },
//                           ],
//                         },
//                         {
//                           id: 3,
//                           role: "Viewer",
//                           permissions: [
//                             { id: "v_view", name: "View Credentials", enabled: true },
//                             { id: "v_create", name: "Create Credentials", enabled: false },
//                             { id: "v_update", name: "Update Credentials", enabled: false },
//                             { id: "v_delete", name: "Delete Credentials", enabled: false },
//                             { id: "v_invite", name: "Invite Members", enabled: false },
//                           ],
//                         },
//                       ].map((roleGroup) => (
//                         <div key={roleGroup.id} className="border rounded-lg p-4">
//                           <h4 className="font-medium mb-3">{roleGroup.role}</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             {roleGroup.permissions.map((permission) => (
//                               <div key={permission.id} className="flex items-center justify-between">
//                                 <span className="text-sm">{permission.name}</span>
//                                 <div
//                                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
//                                   data-state={permission.enabled ? "checked" : "unchecked"}
//                                   role="switch"
//                                   aria-checked={permission.enabled}
//                                 >
//                                   <span
//                                     className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
//                                     data-state={permission.enabled ? "checked" : "unchecked"}
//                                   />
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                       <div className="flex justify-end">
//                         <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Credential Policies</CardTitle>
//                     <CardDescription>Set security requirements for credentials</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Require rotation</p>
//                           <p className="text-xs text-gray-500">Force credential rotation after a period</p>
//                         </div>
//                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
//                           <option>90 days</option>
//                           <option>60 days</option>
//                           <option>30 days</option>
//                           <option>Never</option>
//                         </select>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Minimum password length</p>
//                           <p className="text-xs text-gray-500">For password-type credentials</p>
//                         </div>
//                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
//                           <option>12 characters</option>
//                           <option>16 characters</option>
//                           <option>20 characters</option>
//                         </select>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Require approval for changes</p>
//                           <p className="text-xs text-gray-500">Admin must approve credential changes</p>
//                         </div>
//                         <div
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
//                             requireApproval ? "bg-black" : "bg-gray-200"
//                           }`}
//                           role="switch"
//                           aria-checked={requireApproval}
//                           onClick={() => setRequireApproval(!requireApproval)}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               requireApproval ? "translate-x-5" : "translate-x-1"
//                             }`}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Auto-revoke on member removal</p>
//                           <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
//                         </div>
//                         <div
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
//                             autoRevokeOnRemoval ? "bg-black" : "bg-gray-200"
//                           }`}
//                           role="switch"
//                           aria-checked={autoRevokeOnRemoval}
//                           onClick={() => setAutoRevokeOnRemoval(!autoRevokeOnRemoval)}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               autoRevokeOnRemoval ? "translate-x-5" : "translate-x-1"
//                             }`}
//                           />
//                         </div>
//                       </div>

//                       <Separator className="my-4" />

//                       <div className="flex justify-end">
//                         <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Audit & Compliance</CardTitle>
//                     <CardDescription>Configure audit settings and compliance features</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Detailed audit logs</p>
//                           <p className="text-xs text-gray-500">Track all credential access and changes</p>
//                         </div>
//                         <div
//                           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
//                             detailedAuditLogs ? "bg-black" : "bg-gray-200"
//                           }`}
//                           role="switch"
//                           aria-checked={detailedAuditLogs}
//                           onClick={() => setDetailedAuditLogs(!detailedAuditLogs)}
//                         >
//                           <span
//                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                               detailedAuditLogs ? "translate-x-5" : "translate-x-1"
//                             }`}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Export audit logs</p>
//                           <p className="text-xs text-gray-500">For compliance reporting</p>
//                         </div>
//                         <Button variant="outline" size="sm" className="rounded-full text-xs">
//                           Export Logs
//                         </Button>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Compliance reports</p>
//                           <p className="text-xs text-gray-500">Generate compliance reports</p>
//                         </div>
//                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
//                           <option>Weekly</option>
//                           <option>Monthly</option>
//                           <option>Quarterly</option>
//                           <option>On demand</option>
//                         </select>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">Retention period</p>
//                           <p className="text-xs text-gray-500">How long to keep audit logs</p>
//                         </div>
//                         <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
//                           <option>1 year</option>
//                           <option>2 years</option>
//                           <option>5 years</option>
//                           <option>Forever</option>
//                         </select>
//                       </div>

//                       <Separator className="my-4" />

//                       <div className="flex justify-end">
//                         <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Project Integration</CardTitle>
//                     <CardDescription>Connect with other services</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
//                         { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
//                         { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
//                         { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
//                       ].map((integration) => (
//                         <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
//                           <div className="flex items-center">
//                             <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
//                             <p className="font-medium">{integration.name}</p>
//                           </div>
//                           <Button
//                             variant={integration.connected ? "outline" : "default"}
//                             size="sm"
//                             className={`rounded-full text-xs ${
//                               integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
//                             }`}
//                           >
//                             {integration.connected ? "Connected" : "Connect"}
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="border-red-200">
//                   <CardHeader className="text-red-600">
//                     <CardTitle>Danger Zone</CardTitle>
//                     <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
//                         <div>
//                           <p className="font-medium">Archive Project</p>
//                           <p className="text-sm text-gray-500">
//                             The project will be archived and read-only for all members
//                           </p>
//                           <p className="font-medium">Archive Project</p>
//                           <p className="text-sm text-gray-500">
//                             The project will be archived and read-only for all members
//                           </p>
//                         </div>
//                         <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
//                           Archive
//                         </Button>
//                       </div>

//                       <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
//                         <div>
//                           <p className="font-medium">Delete Project</p>
//                           <p className="text-sm text-gray-500">
//                             This action is permanent and cannot be undone. All credentials will be deleted.
//                           </p>
//                         </div>
//                         <Button variant="destructive">Delete</Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </>
//             )}
//           </TabsContent>
//         </Tabs>

//         <AddCredentialModal
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//           projectId={projectId}
//           onCredentialAdded={refreshCredentials}
//           existingCredentials={credentials}
//         />

//         {selectedCredential && (
//           <UpdateCredentialModal
//             isOpen={isUpdateModalOpen}
//             onClose={() => {
//               setIsUpdateModalOpen(false)
//               setSelectedCredential(null)
//             }}
//             credential={selectedCredential}
//             projectId={projectId}
//             onCredentialUpdated={refreshCredentials}
//           />
//         )}

//         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will permanently delete the credential "{selectedCredential?.name}". This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={() => setSelectedCredential(null)}>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={confirmDeleteCredential}
//                 disabled={deleteLoading}
//                 className="bg-red-600 hover:bg-red-700"
//               >
//                 {deleteLoading ? (
//                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                 ) : (
//                   "Delete"
//                 )}
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </main>
//     </div>
//   )
// }

"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Shield, FileText, Lock, Users, Eye } from "lucide-react"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  const [projectName, setProjectName] = useState("Project Dashboard")
  const [rotationPolicy, setRotationPolicy] = useState("manual")

  // Add these state variables at the top of the component with the other state variables
  const [enableAuditLog, setEnableAuditLog] = useState(true)
  const [alertOnCriticalEvents, setAlertOnCriticalEvents] = useState(true)
  const [detailedAuditLogs, setDetailedAuditLogs] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)
  const [autoRevokeOnRemoval, setAutoRevokeOnRemoval] = useState(true)

  // Add this state to manage permission toggles
  const [permissions, setPermissions] = useState({
    // Project Manager
    pm_view: true,
    pm_create: true,
    pm_update: true,
    pm_delete: true,
    pm_invite: true,
    // Team Member
    tm_view: true,
    tm_create: false,
    tm_update: false,
    tm_delete: false,
    tm_invite: false,
    // Viewer
    v_view: true,
    v_create: false,
    v_update: false,
    v_delete: false,
    v_invite: false,
  })

  // Add this function to toggle permissions
  const togglePermission = (id: string) => {
    setPermissions((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }))
  }

  const params = useParams()

  // Safely extract projectId and orgId from params
  const projectId = params?.projectId as string
  const orgId = params?.orgId as string

  // Check if user is admin
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        // Import the server action
        const { checkAdminStatus } = await import("@/app/actions/checkAdminStatus")

        // Call the server action to check admin status
        const isAdminResult = await checkAdminStatus(projectId)
        setIsAdmin(isAdminResult)
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      }
    }

    if (projectId) {
      fetchAdminStatus()
    }
  }, [projectId])

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

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credentialId}/project/${projectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

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
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${selectedCredential.id}/project/${projectId}`,
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/project/${projectId}`, {
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
          <h1 className="text-3xl font-bold">{projectName}</h1>
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
            {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
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

          {/* Settings Tab - Admin Only */}
          <TabsContent value="settings" className="space-y-6">
            {!isAdmin ? (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>You don't have permission to access project settings.</AlertDescription>
              </Alert>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Project Settings</CardTitle>
                        <CardDescription>Configure project details and preferences</CardDescription>
                      </div>
                      <Badge className="bg-black hover:bg-gray-800">Admin Only</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          id="project-name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="project-description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                          placeholder="Project description"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-800">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credential Management</CardTitle>
                    <CardDescription>Set up how credentials are managed in your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Credential Rotation Policy</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="manual"
                            name="rotationPolicy"
                            value="manual"
                            className="h-4 w-4 text-black focus:ring-black border-gray-300"
                            checked={rotationPolicy === "manual"}
                            onChange={() => setRotationPolicy("manual")}
                          />
                          <label htmlFor="manual" className="text-sm">
                            Manual
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="automatic"
                            name="rotationPolicy"
                            value="automatic"
                            className="h-4 w-4 text-black focus:ring-black border-gray-300"
                            checked={rotationPolicy === "automatic"}
                            onChange={() => setRotationPolicy("automatic")}
                          />
                          <label htmlFor="automatic" className="text-sm">
                            Automatic
                          </label>
                        </div>
                      </div>
                    </div>

                    {rotationPolicy === "manual" && (
                      <div className="space-y-2">
                        <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-1">
                          Master Key
                        </label>
                        <div className="relative">
                          <input
                            id="masterKey"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                            placeholder="Enter your master key"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          >
                            <Eye className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Ensure your master key is secure and known only to authorized personnel.
                        </p>
                      </div>
                    )}

                    {rotationPolicy === "automatic" && (
                      <div className="space-y-2">
                        <label htmlFor="rotationInterval" className="block text-sm font-medium text-gray-700 mb-1">
                          Rotation Interval (days)
                        </label>
                        <select
                          id="rotationInterval"
                          className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-black focus:border-black"
                        >
                          <option value="30">30 days</option>
                          <option value="60">60 days</option>
                          <option value="90" selected>
                            90 days
                          </option>
                          <option value="180">180 days</option>
                        </select>
                        <p className="text-sm text-gray-500">Recommended: 90 days or less for optimal security.</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-800">Save Credential Settings</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Logging and Auditing</CardTitle>
                    <CardDescription>Configure logging and auditing settings for your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="logRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                        Log Retention Period (days)
                      </label>
                      <input
                        id="logRetentionPeriod"
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        defaultValue={90}
                        min={30}
                        max={3650}
                      />
                      <p className="text-sm text-gray-500">
                        Minimum 30 days. For compliance purposes, 90+ days is recommended.
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="enableAuditLog" className="text-sm font-medium">
                        Enable Detailed Audit Logs
                      </label>
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
                          enableAuditLog ? "bg-black" : "bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={enableAuditLog}
                        onClick={() => setEnableAuditLog(!enableAuditLog)}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enableAuditLog ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="alertOnCriticalEvents" className="text-sm font-medium">
                        Alert on Critical Events
                      </label>
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
                          alertOnCriticalEvents ? "bg-black" : "bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={alertOnCriticalEvents}
                        onClick={() => setAlertOnCriticalEvents(!alertOnCriticalEvents)}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            alertOnCriticalEvents ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-800">Save Logging Settings</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Permission Management</CardTitle>
                    <CardDescription>Control what different roles can access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          id: 1,
                          role: "Project Manager",
                          permissions: [
                            { id: "pm_view", name: "View Credentials", enabled: permissions.pm_view },
                            { id: "pm_create", name: "Create Credentials", enabled: permissions.pm_create },
                            { id: "pm_update", name: "Update Credentials", enabled: permissions.pm_update },
                            { id: "pm_delete", name: "Delete Credentials", enabled: permissions.pm_delete },
                            { id: "pm_invite", name: "Invite Members", enabled: permissions.pm_invite },
                          ],
                        },
                        {
                          id: 2,
                          role: "Team Member",
                          permissions: [
                            { id: "tm_view", name: "View Credentials", enabled: permissions.tm_view },
                            { id: "tm_create", name: "Create Credentials", enabled: permissions.tm_create },
                            { id: "tm_update", name: "Update Credentials", enabled: permissions.tm_update },
                            { id: "tm_delete", name: "Delete Credentials", enabled: permissions.tm_delete },
                            { id: "tm_invite", name: "Invite Members", enabled: permissions.tm_invite },
                          ],
                        },
                        {
                          id: 3,
                          role: "Viewer",
                          permissions: [
                            { id: "v_view", name: "View Credentials", enabled: permissions.v_view },
                            { id: "v_create", name: "Create Credentials", enabled: permissions.v_create },
                            { id: "v_update", name: "Update Credentials", enabled: permissions.v_update },
                            { id: "v_delete", name: "Delete Credentials", enabled: permissions.v_delete },
                            { id: "v_invite", name: "Invite Members", enabled: permissions.v_invite },
                          ],
                        },
                      ].map((roleGroup) => (
                        <div key={roleGroup.id} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">{roleGroup.role}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {roleGroup.permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center justify-between">
                                <span className="text-sm">{permission.name}</span>
                                <div
                                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer bg-gray-200 data-[state=checked]:bg-black"
                                  data-state={permission.enabled ? "checked" : "unchecked"}
                                  role="switch"
                                  aria-checked={permission.enabled}
                                  onClick={() => togglePermission(permission.id)}
                                >
                                  <span
                                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
                                    data-state={permission.enabled ? "checked" : "unchecked"}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button className="bg-black hover:bg-gray-800">Save Permissions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credential Policies</CardTitle>
                    <CardDescription>Set security requirements for credentials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Require rotation</p>
                          <p className="text-xs text-gray-500">Force credential rotation after a period</p>
                        </div>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
                          <option>90 days</option>
                          <option>60 days</option>
                          <option>30 days</option>
                          <option>Never</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Minimum password length</p>
                          <p className="text-xs text-gray-500">For password-type credentials</p>
                        </div>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
                          <option>12 characters</option>
                          <option>16 characters</option>
                          <option>20 characters</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Require approval for changes</p>
                          <p className="text-xs text-gray-500">Admin must approve credential changes</p>
                        </div>
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
                            requireApproval ? "bg-black" : "bg-gray-200"
                          }`}
                          role="switch"
                          aria-checked={requireApproval}
                          onClick={() => setRequireApproval(!requireApproval)}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              requireApproval ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Auto-revoke on member removal</p>
                          <p className="text-xs text-gray-500">Revoke access when a member is removed</p>
                        </div>
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
                            autoRevokeOnRemoval ? "bg-black" : "bg-gray-200"
                          }`}
                          role="switch"
                          aria-checked={autoRevokeOnRemoval}
                          onClick={() => setAutoRevokeOnRemoval(!autoRevokeOnRemoval)}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              autoRevokeOnRemoval ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex justify-end">
                        <Button className="bg-black hover:bg-gray-800">Save Policies</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audit & Compliance</CardTitle>
                    <CardDescription>Configure audit settings and compliance features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Detailed audit logs</p>
                          <p className="text-xs text-gray-500">Track all credential access and changes</p>
                        </div>
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer ${
                            detailedAuditLogs ? "bg-black" : "bg-gray-200"
                          }`}
                          role="switch"
                          aria-checked={detailedAuditLogs}
                          onClick={() => setDetailedAuditLogs(!detailedAuditLogs)}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              detailedAuditLogs ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Export audit logs</p>
                          <p className="text-xs text-gray-500">For compliance reporting</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          Export Logs
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Compliance reports</p>
                          <p className="text-xs text-gray-500">Generate compliance reports</p>
                        </div>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
                          <option>Weekly</option>
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>On demand</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Retention period</p>
                          <p className="text-xs text-gray-500">How long to keep audit logs</p>
                        </div>
                        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-black focus:border-black">
                          <option>1 year</option>
                          <option>2 years</option>
                          <option>5 years</option>
                          <option>Forever</option>
                        </select>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex justify-end">
                        <Button className="bg-black hover:bg-gray-800">Save Audit Settings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Integration</CardTitle>
                    <CardDescription>Connect with other services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 1, name: "GitHub", connected: true, icon: <FileText className="h-5 w-5" /> },
                        { id: 2, name: "AWS Secrets Manager", connected: false, icon: <Lock className="h-5 w-5" /> },
                        { id: 3, name: "HashiCorp Vault", connected: false, icon: <Shield className="h-5 w-5" /> },
                        { id: 4, name: "Slack Notifications", connected: true, icon: <Users className="h-5 w-5" /> },
                      ].map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">{integration.icon}</div>
                            <p className="font-medium">{integration.name}</p>
                          </div>
                          <Button
                            variant={integration.connected ? "outline" : "default"}
                            size="sm"
                            className={`rounded-full text-xs ${
                              integration.connected ? "border-green-500 text-green-600" : "bg-black hover:bg-gray-800"
                            }`}
                          >
                            {integration.connected ? "Connected" : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader className="text-red-600">
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription className="text-red-500">Destructive actions for this project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                        <div>
                          <p className="font-medium">Archive Project</p>
                          <p className="text-sm text-gray-500">
                            The project will be archived and read-only for all members
                          </p>
                          <p className="font-medium">Archive Project</p>
                          <p className="text-sm text-gray-500">
                            The project will be archived and read-only for all members
                          </p>
                        </div>
                        <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                          Archive
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                        <div>
                          <p className="font-medium">Delete Project</p>
                          <p className="text-sm text-gray-500">
                            This action is permanent and cannot be undone. All credentials will be deleted.
                          </p>
                        </div>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
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
            existingCredentials={credentials}
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
