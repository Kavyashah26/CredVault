// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from 'next/link'
// import { motion } from "framer-motion"
// import { Building2, Users, Key, Activity, ArrowRight, Briefcase, Calendar } from 'lucide-react'
// import { StatCard } from '../components/StatCard'
// import { RecentActivityFeed } from '../components/RecentActivityFeed'
// import { QuickAccessSidebar } from '../components/QuickAccessSidebar'

// // Interface for a Project
// interface Project {
//   projectId: string;
//   role: "OWNER" | "ADMIN";
// }

// // Interface for an Organization
// interface Organization {
//   organizationId: string;
//   role: "MEMBER" | "ADMIN";
//   addedAt: string; // ISO 8601 format date
//   name: string;
//   memberCount: number;
//   totalProjects: number;
//   userProjectsCount: number;
// }

// // Interface for the User Response
// interface UserResponse {
//   id: string;
//   name: string;
//   email: string;
//   projects: Project[];
//   organizations: Organization[];
// }

// export default function DashboardPage() {
//   const [organizations, setOrganizations] = useState<Organization[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [userName, setUserName] = useState<string>('')

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token=document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

//         const response = await fetch('http://localhost:5000/api/users/me', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         })
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data')
//         }
//         const data: UserResponse = await response.json()
//         console.log(data);
        
//         setOrganizations(data.organizations)
//         setProjects(data.projects)
//         setUserName(data.name)
//       } catch (error) {
//         console.error('Error fetching user data:', error)
//       }
//     }

//     fetchUserData()

//     const abc=organizations.reduce((sum, org) => sum + org.memberCount, 0)
//     console.log(organizations);
    
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* <LoggedInNavbar /> */}
//       <main className="container mx-auto px-4 py-8">
//         <motion.h1
//           className="text-4xl font-bold mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Welcome, {userName || 'User'}
//         </motion.h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard title="Organizations" value={organizations.length} icon={<Building2 className="h-4 w-4 text-muted-foreground" />} />
//           <StatCard title="Team Members" value={organizations.reduce((sum, org) => sum + org.memberCount, 0)} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
//           <StatCard title="Active Projects" value={projects.length} icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
//           <StatCard title="Managed Credentials" value={42} icon={<Key className="h-4 w-4 text-muted-foreground" />} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <Card className="col-span-2">
//             <CardHeader>
//               <CardTitle className="text-2xl">Your Organizations</CardTitle>
//               <CardDescription>Select an organization to view its projects</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 gap-4">
//                 {organizations.map((org) => (
//                   <motion.div
//                     key={org.organizationId}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className="hover:shadow-lg transition-shadow duration-300">
//                       <CardContent className="p-6">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4">
//                             <div className="bg-primary text-primary-foreground rounded-full p-3">
//                               <Building2 className="h-6 w-6" />
//                             </div>
//                             <div>
//                               <h3 className="text-xl font-semibold">{org.name}</h3>
//                               <p className="text-sm text-muted-foreground">ID: {org.organizationId}</p>
//                             </div>
//                           </div>
//                           <Link href={`/dashboard/organization/${org.organizationId}`}>
//                             <Button variant="ghost" className="hover:bg-primary hover:text-primary-foreground">
//                               View Projects
//                               <ArrowRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </Link>
//                         </div>
//                         <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
//                           <div className="flex items-center">
//                             <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
//                             <span>{org.totalProjects} Projects</span>
//                           </div>
//                           <div className="flex items-center">
//                             <Users className="h-4 w-4 mr-2 text-muted-foreground" />
//                             <span>{org.memberCount} Members</span>
//                           </div>
//                           <div className="flex items-center">
//                             <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
//                             <span>Added {new Date(org.addedAt).toLocaleDateString()}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="pt-6">
//               <RecentActivityFeed />
//             </CardContent>
//           </Card>
//         </div>

//         <QuickAccessSidebar />
//       </main>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2, Users, Key, Activity, ArrowRight, Briefcase, Calendar } from "lucide-react"
import { StatCard } from "../components/StatCard"
import { RecentActivityFeed } from "../components/RecentActivityFeed"
import { QuickAccessSidebar } from "../components/QuickAccessSidebar"
import { redirectToOrganization } from "../actions/redirectToOrganization"

// Interface for a Project
interface Project {
  projectId: string
  role: "OWNER" | "ADMIN"
}

// Interface for an Organization
interface Organization {
  organizationId: string
  role: "MEMBER" | "ADMIN"
  addedAt: string // ISO 8601 format date
  name: string
  memberCount: number
  totalProjects: number
  userProjectsCount: number
}

// Interface for the User Response
interface UserResponse {
  id: string
  name: string
  email: string
  projects: Project[]
  organizations: Organization[]
}

export default function DashboardPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1]

        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        const data: UserResponse = await response.json()
        console.log(data)

        setOrganizations(data.organizations)
        setProjects(data.projects)
        setUserName(data.name)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  const handleViewProjects = (organizationId: string, role: string) => {
    console.log("myrole",role);
    
    redirectToOrganization(organizationId, role)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome, {userName || "User"}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Organizations"
            value={organizations.length}
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Team Members"
            value={organizations.reduce((sum, org) => sum + org.memberCount, 0)}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Active Projects"
            value={projects.length}
            icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard title="Managed Credentials" value={42} icon={<Key className="h-4 w-4 text-muted-foreground" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Your Organizations</CardTitle>
              <CardDescription>Select an organization to view its projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {organizations.map((org) => (
                  <motion.div
                    key={org.organizationId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary text-primary-foreground rounded-full p-3">
                              <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{org.name}</h3>
                              <p className="text-sm text-muted-foreground">ID: {org.organizationId}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleViewProjects(org.organizationId, org.role)}
                          >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{org.totalProjects} Projects</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{org.memberCount} Members</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Added {new Date(org.addedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <RecentActivityFeed />
            </CardContent>
          </Card>
        </div>

        <QuickAccessSidebar />
      </main>
    </div>
  )
}

