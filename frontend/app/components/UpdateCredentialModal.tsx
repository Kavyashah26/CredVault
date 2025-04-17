// // "use client"

// // import type React from "react"

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
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { useState, useEffect } from "react"

// // interface Credential {
// //   id: string
// //   name: string
// //   type: string
// //   value?: string
// //   description: string
// //   createdBy: {
// //     id: string
// //     name: string
// //   }
// //   tags: {
// //     id: string
// //     name: string
// //   }[]
// //   lastUpdated?: string
// //   updatedBy?: string
// // }

// // interface UpdateCredentialModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   credential: Credential
// //   projectId?: string
// //   onCredentialUpdated: () => void
// // }

// // const UpdateCredentialModal: React.FC<UpdateCredentialModalProps> = ({
// //   isOpen,
// //   onClose,
// //   credential,
// //   projectId,
// //   onCredentialUpdated,
// // }) => {
// //   const [name, setName] = useState("")
// //   const [type, setType] = useState("")
// //   const [value, setValue] = useState("")
// //   const [description, setDescription] = useState("")
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     if (credential) {
// //       setName(credential.name || "")
// //       setType(credential.type || "")
// //       setValue(credential.value || "")
// //       setDescription(credential.description || "")
// //     }
// //   }, [credential])

// //   const handleSubmit = async () => {
// //     if (!projectId || !credential.id) {
// //       setError("Project ID and Credential ID are required")
// //       return
// //     }

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

// //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credential.id}/project/${projectId}`, {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           projectId: projectId,
// //           name: name,
// //           type: type,
// //           value: value,
// //           description: description,
// //         }),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Failed to update credential")
// //       }

// //       onCredentialUpdated()
// //       onClose()
// //     } catch (err) {
// //       console.error("Error updating credential:", err)
// //       setError(err instanceof Error ? err.message : "Failed to update credential")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <AlertDialog open={isOpen} onOpenChange={onClose}>
// //       <AlertDialogContent>
// //         <AlertDialogHeader>
// //           <AlertDialogTitle>Update Credential</AlertDialogTitle>
// //           <AlertDialogDescription>Update the details for "{credential?.name}".</AlertDialogDescription>
// //         </AlertDialogHeader>
// //         <div className="grid gap-4 py-4">
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="update-name" className="text-right">
// //               Name
// //             </Label>
// //             <Input id="update-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="update-type" className="text-right">
// //               Type
// //             </Label>
// //             <Input id="update-type" value={type} onChange={(e) => setType(e.target.value)} className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="update-value" className="text-right">
// //               Value
// //             </Label>
// //             <Input id="update-value" value={value} onChange={(e) => setValue(e.target.value)} className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="update-description" className="text-right">
// //               Description
// //             </Label>
// //             <Input
// //               id="update-description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               className="col-span-3"
// //             />
// //           </div>
// //           {error && <div className="text-red-500 col-span-4">{error}</div>}
// //         </div>
// //         <AlertDialogFooter>
// //           <AlertDialogCancel>Cancel</AlertDialogCancel>
// //           <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
// //             {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div> : "Update"}
// //           </AlertDialogAction>
// //         </AlertDialogFooter>
// //       </AlertDialogContent>
// //     </AlertDialog>
// //   )
// // }

// // export default UpdateCredentialModal




// ///check exising name here too

// "use client"

// import type React from "react"

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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { useState, useEffect } from "react"
// import { AlertCircle, Key, Lock, CoinsIcon as Token, FileKey, FileText } from "lucide-react"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// interface Credential {
//   id: string
//   name: string
//   type: string
//   value?: string
//   description: string
//   createdBy: {
//     id: string
//     name: string
//   }
//   tags: {
//     id: string
//     name: string
//   }[]
//   lastUpdated?: string
//   updatedBy?: string
// }

// interface UpdateCredentialModalProps {
//   isOpen: boolean
//   onClose: () => void
//   credential: Credential
//   projectId?: string
//   onCredentialUpdated: () => void
// }

// type CredentialType = {
//   id: string
//   name: string
//   icon: React.ElementType
//   description: string
// }

// const UpdateCredentialModal: React.FC<UpdateCredentialModalProps> = ({
//   isOpen,
//   onClose,
//   credential,
//   projectId,
//   onCredentialUpdated,
// }) => {
//   const [name, setName] = useState("")
//   const [type, setType] = useState("")
//   const [value, setValue] = useState("")
//   const [description, setDescription] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [typeError, setTypeError] = useState<string | null>(null)

//   const credentialTypes: CredentialType[] = [
//     {
//       id: "api_key",
//       name: "API Key",
//       icon: Key,
//       description: "Used to authenticate API requests",
//     },
//     {
//       id: "password",
//       name: "Password",
//       icon: Lock,
//       description: "Secure access to accounts and services",
//     },
//     {
//       id: "token",
//       name: "Access Token",
//       icon: Token,
//       description: "Temporary credentials for authentication",
//     },
//     {
//       id: "secret",
//       name: "Secret Key",
//       icon: FileKey,
//       description: "Private keys used for encryption/signing",
//     },
//     {
//       id: "certificate",
//       name: "Certificate",
//       icon: FileText,
//       description: "Digital certificates for secure connections",
//     },
//   ]

//   useEffect(() => {
//     if (credential) {
//       setName(credential.name || "")
//       setType(credential.type || "")
//       setValue(credential.value || "")
//       setDescription(credential.description || "")
//     }
//   }, [credential])

//   const validateForm = (): boolean => {
//     let isValid = true

//     // Reset errors
//     setTypeError(null)
//     setError(null)

//     // Check for credential type
//     if (!type) {
//       setTypeError("Please select a credential type")
//       isValid = false
//     }

//     return isValid
//   }

//   const handleSubmit = async () => {
//     if (!projectId || !credential.id) {
//       setError("Project ID and Credential ID are required")
//       return
//     }

//     if (!validateForm()) {
//       return
//     }

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

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credential.id}/project/${projectId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             projectId: projectId,
//             name: name,
//             type: type,
//             value: value,
//             description: description,
//           }),
//         },
//       )

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Failed to update credential")
//       }

//       onCredentialUpdated()
//       onClose()
//     } catch (err) {
//       console.error("Error updating credential:", err)
//       setError(err instanceof Error ? err.message : "Failed to update credential")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent className="max-w-md rounded-xl">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Update Credential</AlertDialogTitle>
//           <AlertDialogDescription>Update the details for "{credential?.name}".</AlertDialogDescription>
//         </AlertDialogHeader>

//         {error && (
//           <Alert variant="destructive" className="mb-4 rounded-xl">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="update-name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="update-name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="col-span-3 rounded-full"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-start gap-4">
//             <Label className="text-right pt-2">
//               Type <span className="text-red-500">*</span>
//             </Label>
//             <div className="col-span-3 space-y-1">
//               <div className="grid grid-cols-2 gap-2">
//                 {credentialTypes.map((credType) => (
//                   <div
//                     key={credType.id}
//                     className={`
//                       flex items-center p-2 rounded-xl cursor-pointer border transition-all
//                       ${type === credType.id ? "border-black bg-black/5" : "border-gray-200 hover:border-gray-300"}
//                     `}
//                     onClick={() => {
//                       setType(credType.id)
//                       if (typeError) setTypeError(null)
//                     }}
//                   >
//                     <div
//                       className={`
//                         p-1.5 rounded-full mr-2
//                         ${type === credType.id ? "bg-black text-white" : "bg-gray-100 text-gray-500"}
//                       `}
//                     >
//                       <credType.icon className="h-4 w-4" />
//                     </div>
//                     <div className="text-sm">
//                       <h4 className="font-medium">{credType.name}</h4>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {typeError && <p className="text-sm text-red-500">{typeError}</p>}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="update-value" className="text-right">
//               Value
//             </Label>
//             <Input
//               id="update-value"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               className="col-span-3 rounded-full"
//               type="text"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-start gap-4">
//             <Label htmlFor="update-description" className="text-right pt-2">
//               Description
//             </Label>
//             <Textarea
//               id="update-description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="col-span-3 rounded-xl"
//               rows={3}
//             />
//           </div>
//         </div>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             disabled={isLoading}
//             onClick={handleSubmit}
//             className="rounded-full bg-black text-white hover:bg-gray-800"
//           >
//             {isLoading ? (
//               <div className="flex items-center">
//                 <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
//                 Updating...
//               </div>
//             ) : (
//               "Update"
//             )}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

// export default UpdateCredentialModal

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
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { AlertCircle, Key, Lock, CoinsIcon as Token, FileKey, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  existingCredentials?: Credential[]
}

type CredentialType = {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

const UpdateCredentialModal: React.FC<UpdateCredentialModalProps> = ({
  isOpen,
  onClose,
  credential,
  projectId,
  onCredentialUpdated,
  existingCredentials,
}) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [typeError, setTypeError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)

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

  useEffect(() => {
    if (credential) {
      setName(credential.name || "")
      setType(credential.type || "")
      setValue(credential.value || "")
      setDescription(credential.description || "")
    }
  }, [credential])

  const validateForm = (): boolean => {
    let isValid = true

    // Reset errors
    setTypeError(null)
    setError(null)
    setNameError(null)

    // Check for unique name - only if name has changed
    if (
      name !== credential.name &&
      existingCredentials?.some((cred) => cred.id !== credential.id && cred.name.toLowerCase() === name.toLowerCase())
    ) {
      setNameError("Credential name must be unique")
      isValid = false
    }

    // Check for credential type
    if (!type) {
      setTypeError("Please select a credential type")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!projectId || !credential.id) {
      setError("Project ID and Credential ID are required")
      return
    }

    if (!validateForm()) {
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/${credential.id}/project/${projectId}`,
        {
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
        },
      )

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
      <AlertDialogContent className="max-w-md rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Update Credential</AlertDialogTitle>
          <AlertDialogDescription>Update the details for "{credential?.name}".</AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4 rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-name" className="text-right">
              Name
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="update-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-full ${nameError ? "border-red-500" : ""}`}
              />
              {nameError && <p className="text-sm text-red-500">{nameError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Type <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3 space-y-1">
              <div className="grid grid-cols-2 gap-2">
                {credentialTypes.map((credType) => (
                  <div
                    key={credType.id}
                    className={`
                      flex items-center p-2 rounded-xl cursor-pointer border transition-all
                      ${type === credType.id ? "border-black bg-black/5" : "border-gray-200 hover:border-gray-300"}
                    `}
                    onClick={() => {
                      setType(credType.id)
                      if (typeError) setTypeError(null)
                    }}
                  >
                    <div
                      className={`
                        p-1.5 rounded-full mr-2
                        ${type === credType.id ? "bg-black text-white" : "bg-gray-100 text-gray-500"}
                      `}
                    >
                      <credType.icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <h4 className="font-medium">{credType.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
              {typeError && <p className="text-sm text-red-500">{typeError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="update-value" className="text-right">
              Value
            </Label>
            <Input
              id="update-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="col-span-3 rounded-full"
              type="password"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="update-description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="update-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 rounded-xl"
              rows={3}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={handleSubmit}
            className="rounded-full bg-black text-white hover:bg-gray-800"
          >
            {isLoading ? (
              <div className="flex items-center">
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateCredentialModal
