// 'use client'

// import { Button } from "@/components/ui/button"
// import { PlusCircle, Key, Users, Settings } from 'lucide-react'
// import { motion } from "framer-motion"

// export function QuickAccessSidebar() {
//   const actions = [
//     { icon: PlusCircle, label: 'New Project' },
//     { icon: Key, label: 'Manage Keys' },
//     { icon: Users, label: 'Team Members' },
//     { icon: Settings, label: 'Settings' },
//   ]

//   return (
//     <motion.div
//       className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-l-lg shadow-lg"
//       initial={{ x: 100 }}
//       animate={{ x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {actions.map((action, index) => (
//         <motion.div
//           key={action.label}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: index * 0.1 }}
//         >
//           <Button
//             variant="ghost"
//             size="icon"
//             className="w-10 h-10 mb-2"
//             title={action.label}
//           >
//             <action.icon className="h-5 w-5" />
//           </Button>
//         </motion.div>
//       ))}
//     </motion.div>
//   )
// }


'use client'

import { Button } from "@/components/ui/button"
import { PlusCircle, Key, Users, Settings } from 'lucide-react'
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function QuickAccessSidebar() {
  const router = useRouter()
  const actions = [
    { icon: PlusCircle, label: "New Project", route: "/dashboard/new-org" },
    { icon: Key, label: "Manage Keys", route: "/dashboard/manage-keys" },
    { icon: Users, label: "Team Members", route: "/team-management" },
    { icon: Settings, label: "Settings", route: "/settings" },
  ]

  return (
    <motion.div
      className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-l-lg shadow-lg"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 mb-2"
            title={action.label}
            onClick={() => router.push(action.route)}
          >
            <action.icon className="h-5 w-5" />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}


