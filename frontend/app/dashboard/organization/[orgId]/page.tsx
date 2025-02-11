// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import Link from 'next/link'
// // import { useRouter } from 'next/navigation'
// // import { motion } from "framer-motion"
// // import { Briefcase, Users, Calendar, ArrowRight } from 'lucide-react'
// // import { LoggedInNavbar } from '../../../components/LoggedInNavbar'

// // interface Project {
// //   id: string
// //   name: string
// //   role: string
// //   memberCount: number
// //   lastActive: string
// // }

// // export default function OrganizationPage({ params }: { params: { orgId: string } }) {
// //   const [projects, setProjects] = useState<Project[]>([])
// //   const router = useRouter()

// //   useEffect(() => {
// //     // Simulate fetching projects
// //     const fetchProjects = async () => {
// //       // In a real app, this would be an API call
// //       const mockProjects = [
// //         { id: '1', name: 'Project Alpha', role: 'admin', memberCount: 5, lastActive: '2 hours ago' },
// //         { id: '2', name: 'Project Beta', role: 'project_manager', memberCount: 8, lastActive: '1 day ago' },
// //         { id: '3', name: 'Project Gamma', role: 'team_member', memberCount: 12, lastActive: '3 hours ago' },
// //       ]
// //       setProjects(mockProjects)
// //     }

// //     fetchProjects()
// //   }, [params.orgId])

// //   const canCreateProject = true // Temporarily set to true for testing

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* <LoggedInNavbar /> */}
// //       <main className="container mx-auto px-4 py-8">
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold">Projects in Organization {params.orgId}</h1>
// //           {canCreateProject && (
// //             <Button onClick={() =>router.push(`${window.location.pathname}/new-project`)}>
// //               Create New Project
// //             </Button>
// //           )}
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {projects.map((project, index) => (
// //             <motion.div
// //               key={project.id}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.3, delay: index * 0.1 }}
// //             >
// //               <Card className="hover:shadow-lg transition-shadow duration-300">
// //                 <CardHeader>
// //                   <CardTitle className="text-xl">{project.name}</CardTitle>
// //                   <CardDescription>Role: {project.role}</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="grid grid-cols-2 gap-4 mb-4">
// //                     <div className="flex items-center">
// //                       <Users className="h-5 w-5 mr-2 text-gray-500" />
// //                       <span>{project.memberCount} Members</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <Calendar className="h-5 w-5 mr-2 text-gray-500" />
// //                       <span>Active {project.lastActive}</span>
// //                     </div>
// //                   </div>
// //                   <Link href={`/dashboard/organization/${params.orgId}/project/${project.id}`}>
// //                     <Button className="w-full">
// //                       View Credentials
// //                       <ArrowRight className="ml-2 h-4 w-4" />
// //                     </Button>
// //                   </Link>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }


// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { motion } from "framer-motion"
// import { Users, Calendar, ArrowRight } from 'lucide-react'
// import { usePathname } from 'next/navigation';

// import { headers } from "next/headers"
// interface Project {
//   id: string
//   name: string
//   role: string
//   memberCount: number
//   lastActive: string
//   orgName:string
// }

// export default async function OrganizationPage() {
//   const [projects, setProjects] = useState<Project[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [organizationName, setOrganizationName] = useState<string | null>("orgName")
//   const router = useRouter()
  
//   const pathname=usePathname()


//   const parts = pathname.split('/');
//   const orgId = parts.includes('organization') ? parts[parts.indexOf('organization') + 1]:0;
//   const headersList = headers()
//   const role = (await headersList).get("x-org-role")
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const token = document.cookie
//           .split('; ')
//           .find((row) => row.startsWith('token='))
//           ?.split('=')[1]

//         const response = await fetch(`http://localhost:5000/api/organizations/${orgId}/user`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`)
//         }

//         const data = await response.json()

//         if (data.success) {
//           const formattedProjects = data.data.map((project: any) => ({
//             id: project.id,
//             name: project.name,
//             role: project.role,
//             memberCount: project.memberCount,
//             lastActive: new Date(project.updatedAt).toLocaleString(), // Format `lastActive`
//           }))
//           setProjects(formattedProjects)
//           setOrganizationName(data.data[0].orgName);
//           console.log(organizationName);
          
//         } else {
//           throw new Error('Failed to fetch projects.')
//         }
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProjects()
//   }, [orgId])

//   const canCreateProject = true // Adjust based on your logic

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500">{error}</p>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Projects in Organization {organizationName}</h1>
//           {canCreateProject && (
//             <Button onClick={() => router.push(`${window.location.pathname}/new-project`)}>
//               Create New Project
//             </Button>
//           )}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//             >
//               <Card className="hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader>
//                   <CardTitle className="text-xl">{project.name}</CardTitle>
//                   <CardDescription>Role: {project.role}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="flex items-center">
//                       <Users className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>{project.memberCount} Members</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Calendar className="h-5 w-5 mr-2 text-gray-500" />
//                       <span>Active {project.lastActive}</span>
//                     </div>
//                   </div>
//                   <Link href={`/dashboard/organization/${orgId}/project/${project.id}`}>
//                     <Button className="w-full">
//                       View Credentials
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }


// import { headers } from "next/headers"
// import OrganizationPageClient from "./OrganizationPageClient"

// export default async function OrganizationPage({ params }: { params: { orgId: string } }) {
//   const headersList = headers()
//   const role = (await headersList).get("x-org-role") || "MEMBER" // Default to MEMBER if no role is found
//   console.log("allrole",role);
//   const { orgId } = params;
//   return <OrganizationPageClient orgId={orgId} role={role} />
// }


import { headers } from "next/headers";
import OrganizationPageClient from "./OrganizationPageClient";

interface OrganizationPageProps {
  params: {
    orgId: string;
  };
}


// export default async function OrganizationPage({ params }: { params: { orgId: string } }) {
//   const headersList = await headers();  // Await here to get the resolved headers
//   const role = headersList.get("x-org-role") || "MEMBER";  // Now 'get' will work properly

//   console.log("allrole", role);

//   const { orgId } = params;
//   return <OrganizationPageClient orgId={orgId} role={role} />;
// }

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const headersList = await headers();
  const role = headersList.get("x-org-role") || "MEMBER";

  console.log("allrole", role);

  const { orgId } = params;
  return <OrganizationPageClient orgId={orgId} role={role} />;
}
