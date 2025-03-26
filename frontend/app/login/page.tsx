// // // 'use client'

// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import Link from 'next/link'
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // // import { Navbar } from '../components/Navbar'
// // // import { setCookie } from 'cookies-next' 
// // // import FingerprintJS from '@fingerprintjs/fingerprintjs';

// // // const getFingerprint = async () => {
// // //   const fp = await FingerprintJS.load();
// // //   const result = await fp.get();
// // //   return result.visitorId; // This is the unique fingerprint
// // // };


// // // export default function LoginPage() {
// // //   const [email, setEmail] = useState('')
// // //   const [password, setPassword] = useState('')
// // //   const [error, setError] = useState('')
// // //   const router = useRouter()

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setError('')

// // //     try {
// // //       const fingerprint = await getFingerprint();
// // //       // Make the API call to login the user
// // //       const response = await fetch('https://admin-credvault.vercel.app/api/users/login', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           email: email,
// // //           password: password,
// // //           fingerprint
// // //         }),
// // //       })

// // //       if (!response.ok) {
// // //         const errorData = await response.json()
// // //         throw new Error(errorData.message || 'Invalid email or password')
// // //       }

// // //       const data = await response.json()
// // //       if(data.success && data.IsCode!=true){
// // //         console.log("No code");
        
// // //         // Save the token in a cookie
// // //         setCookie('token', data.token, { maxAge: 60 * 60 * 24 * 7, path: '/' })  // 7 days expiration 
// // //         router.push('/dashboard')
// // //       }else{
// // //         // console.log("/abc");
        
// // //         // router.push('/abc');
// // //       }
// // //     } catch (err:any) {
// // //       setError(err.message || 'An error occurred. Please try again.')
// // //     }
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <Navbar hideAuthButtons />
// // //       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// // //         <Card className="w-full max-w-md">
// // //           <CardHeader className="space-y-1">
// // //             <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
// // //             <CardDescription className="text-center">
// // //               Enter your email and password to access your account
// // //             </CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="email">Email</Label>
// // //                 <Input
// // //                   id="email"
// // //                   type="email"
// // //                   placeholder="m@example.com"
// // //                   value={email}
// // //                   onChange={(e) => setEmail(e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="password">Password</Label>
// // //                 <Input
// // //                   id="password"
// // //                   type="password"
// // //                   value={password}
// // //                   onChange={(e) => setPassword(e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //               {error && (
// // //                 <Alert variant="destructive">
// // //                   <AlertTitle>Error</AlertTitle>
// // //                   <AlertDescription>{error}</AlertDescription>
// // //                 </Alert>
// // //               )}
// // //               <Button type="submit" className="w-full">
// // //                 Login
// // //               </Button>
// // //             </form>
// // //           </CardContent>
// // //           <CardFooter className="flex flex-col space-y-2">
// // //             <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
// // //               Forgot your password?
// // //             </Link>
// // //             <div className="text-sm text-gray-600">
// // //               Don&apos;t have an account?{' '}
// // //               <Link href="/signup" className="text-blue-600 hover:underline">
// // //                 Sign up
// // //               </Link>
// // //             </div>
// // //           </CardFooter>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   )
// // // }


// // "use client"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { Navbar } from "../components/Navbar"
// // import { setCookie } from "cookies-next"
// // import FingerprintJS from "@fingerprintjs/fingerprintjs"

// // const getFingerprint = async () => {
// //   const fp = await FingerprintJS.load()
// //   const result = await fp.get()
// //   return result.visitorId
// // }

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [securityCode, setSecurityCode] = useState("")
// //   const [error, setError] = useState("")
// //   const [showSecurityCodeForm, setShowSecurityCodeForm] = useState(false)
// //   const router = useRouter()

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError("")

// //     try {
// //       const fingerprint = await getFingerprint()
// //       const response = await fetch("https://admin-credvault.vercel.app/api/users/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //           fingerprint,
// //         }),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Invalid email or password")
// //       }

// //       const data = await response.json()
// //       if (data.success && !data.IsCode) {
// //         setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
// //         router.push("/dashboard")
// //       } else if (data.IsCode) {
// //         setShowSecurityCodeForm(true)
// //       }
// //     } catch (err: any) {
// //       setError(err.message || "An error occurred. Please try again.")
// //     }
// //   }

// //   const handleSecurityCodeSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError("")

// //     try {
// //       const response = await fetch("https://mail-credvault.vercel.app/api/verify-code", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           code: securityCode,
// //         }),
// //       })

// //       if (!response.ok) {
// //         const errorData = await response.json()
// //         throw new Error(errorData.message || "Invalid security code")
// //       }

// //       const data = await response.json()
// //       if (data.success) {
// //         setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
// //         router.push("/dashboard")
// //       } else {
// //         throw new Error("Verification failed. Please try again.")
// //       }
// //     } catch (err: any) {
// //       setError(err.message || "An error occurred. Please try again.")
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Navbar hideAuthButtons />
// //       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //         <Card className="w-full max-w-md">
// //           <CardHeader className="space-y-1">
// //             <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
// //             <CardDescription className="text-center">
// //               {showSecurityCodeForm
// //                 ? "Enter the 6-digit security code sent to your email"
// //                 : "Enter your email and password to access your account"}
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             {!showSecurityCodeForm ? (
// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="email">Email</Label>
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     placeholder="m@example.com"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="space-y-2">
// //                   <Label htmlFor="password">Password</Label>
// //                   <Input
// //                     id="password"
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 {error && (
// //                   <Alert variant="destructive">
// //                     <AlertTitle>Error</AlertTitle>
// //                     <AlertDescription>{error}</AlertDescription>
// //                   </Alert>
// //                 )}
// //                 <Button type="submit" className="w-full">
// //                   Login
// //                 </Button>
// //               </form>
// //             ) : (
// //               <form onSubmit={handleSecurityCodeSubmit} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="securityCode">Security Code</Label>
// //                   <Input
// //                     id="securityCode"
// //                     type="text"
// //                     placeholder="Enter 6-digit code"
// //                     value={securityCode}
// //                     onChange={(e) => setSecurityCode(e.target.value)}
// //                     required
// //                     maxLength={6}
// //                     pattern="\d{6}"
// //                   />
// //                 </div>
// //                 {error && (
// //                   <Alert variant="destructive">
// //                     <AlertTitle>Error</AlertTitle>
// //                     <AlertDescription>{error}</AlertDescription>
// //                   </Alert>
// //                 )}
// //                 <Button type="submit" className="w-full">
// //                   Verify Code
// //                 </Button>
// //               </form>
// //             )}
// //           </CardContent>
// //           <CardFooter className="flex flex-col space-y-2">
// //             <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
// //               Forgot your password?
// //             </Link>
// //             <div className="text-sm text-gray-600">
// //               Don&apos;t have an account?{" "}
// //               <Link href="/signup" className="text-blue-600 hover:underline">
// //                 Sign up
// //               </Link>
// //             </div>
// //           </CardFooter>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Navbar } from "../components/Navbar"
// import { setCookie } from "cookies-next"
// import FingerprintJS from "@fingerprintjs/fingerprintjs"
// import { Checkbox } from "@/components/ui/checkbox"

// const getFingerprint = async () => {
//   const fp = await FingerprintJS.load()
//   const result = await fp.get()
//   return result.visitorId
// }

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [securityCode, setSecurityCode] = useState("")
//   const [error, setError] = useState("")
//   const [showSecurityCodeForm, setShowSecurityCodeForm] = useState(false)
//   const [saveBrowser, setSaveBrowser] = useState(false)
//   const [fingerprint, setFingerprint] = useState("")
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     try {
//       const userFingerprint = await getFingerprint()
//       setFingerprint(userFingerprint)
//       const response = await fetch("https://admin-credvault.vercel.app/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           fingerprint: userFingerprint,
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Invalid email or password")
//       }

//       const data = await response.json()
//       if (data.success && !data.IsCode) {
//         setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
//         router.push("/dashboard")
//       } else if (data.IsCode) {
//         setShowSecurityCodeForm(true)
//       }
//     } catch (err: any) {
//       setError(err.message || "An error occurred. Please try again.")
//     }
//   }

//   const handleSecurityCodeSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     try {
//       const response = await fetch("https://admin-credvault.vercel.app/api/users/verify-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           code: securityCode,
//           saveFingerprint: saveBrowser,
//           userFingerprint: fingerprint,
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Invalid security code")
//       }

//       const data = await response.json()
//       console.log("data",data);
      
//       if (data.success) {
//         setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
//         router.push("/dashboard")
//       } else {
//         throw new Error("Verification failed. Please try again.")
//       }
//     } catch (err: any) {
//       setError(err.message || "An error occurred. Please try again.")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar hideAuthButtons />
//       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <Card className="w-full max-w-md">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//             <CardDescription className="text-center">
//               {showSecurityCodeForm
//                 ? "Enter the 6-digit security code sent to your email"
//                 : "Enter your email and password to access your account"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {!showSecurityCodeForm ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="m@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 {error && (
//                   <Alert variant="destructive">
//                     <AlertTitle>Error</AlertTitle>
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )}
//                 <Button type="submit" className="w-full">
//                   Login
//                 </Button>
//               </form>
//             ) : (
//               <form onSubmit={handleSecurityCodeSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="securityCode">Security Code</Label>
//                   <Input
//                     id="securityCode"
//                     type="text"
//                     placeholder="Enter 6-digit code"
//                     value={securityCode}
//                     onChange={(e) => setSecurityCode(e.target.value)}
//                     required
//                     maxLength={6}
//                     pattern="\d{6}"
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="saveBrowser"
//                     checked={saveBrowser}
//                     onCheckedChange={(checked) => setSaveBrowser(checked as boolean)}
//                   />
//                   <Label htmlFor="saveBrowser">
//                     Save this browser as trusted (won't ask for verification code in future)
//                   </Label>
//                 </div>
//                 {error && (
//                   <Alert variant="destructive">
//                     <AlertTitle>Error</AlertTitle>
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 )}
//                 <Button type="submit" className="w-full">
//                   Verify Code
//                 </Button>
//               </form>
//             )}
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-2">
//             <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//               Forgot your password?
//             </Link>
//             <div className="text-sm text-gray-600">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="text-blue-600 hover:underline">
//                 Sign up
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Navbar } from "../components/Navbar"
import { setCookie } from "cookies-next"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader } from "@/components/loader"

const getFingerprint = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [error, setError] = useState("")
  const [showSecurityCodeForm, setShowSecurityCodeForm] = useState(false)
  const [saveBrowser, setSaveBrowser] = useState(false)
  const [fingerprint, setFingerprint] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const userFingerprint = await getFingerprint()
      setFingerprint(userFingerprint)
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          fingerprint: userFingerprint,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Invalid email or password")
      }

      const data = await response.json()
      if (data.success && !data.IsCode) {
        setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
        router.push("/dashboard")
      } else if (data.IsCode) {
        setShowSecurityCodeForm(true)
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecurityCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("https://admin-credvault.vercel.app/api/users/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: securityCode,
          saveFingerprint: saveBrowser,
          userFingerprint: fingerprint,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Invalid security code")
      }

      const data = await response.json()

      if (data.success) {
        setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7, path: "/" })
        router.push("/dashboard")
      } else {
        throw new Error("Verification failed. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar hideAuthButtons />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              {showSecurityCodeForm
                ? "Enter the 6-digit security code sent to your email"
                : "Enter your email and password to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showSecurityCodeForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" className="mr-2" />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSecurityCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="securityCode">Security Code</Label>
                  <Input
                    id="securityCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveBrowser"
                    checked={saveBrowser}
                    onCheckedChange={(checked) => setSaveBrowser(checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="saveBrowser">
                    Save this browser as trusted (won't ask for verification code in future)
                  </Label>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" className="mr-2" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
            <div className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

