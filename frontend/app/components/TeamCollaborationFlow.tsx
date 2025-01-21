'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Users, Shield, Key, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Define types for roles and actions
interface Role {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

interface Action {
  name: string
  allowedRoles: string[]
}

const roles: Role[] = [
  { name: 'Admin', icon: Shield, color: 'bg-red-500' },
  { name: 'Moderator', icon: Key, color: 'bg-yellow-500' },
  { name: 'Member', icon: Eye, color: 'bg-green-500' },
]

const actions: Action[] = [
  { name: 'Create Project', allowedRoles: ['Admin'] },
  { name: 'Invite Team', allowedRoles: ['Admin', 'Moderator'] },
  { name: 'Add Credential', allowedRoles: ['Admin', 'Moderator'] },
  { name: 'View Credential', allowedRoles: ['Admin', 'Moderator', 'Member'] },
  { name: 'Revoke Access', allowedRoles: ['Admin'] },
]

export default function TeamCollaborationFlow() {
  const [currentRole, setCurrentRole] = useState<Role>(roles[0])
  const [currentAction, setCurrentAction] = useState<Action | null>(null)

  const selectAction = (action: Action) => {
    setCurrentAction(action)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Team Collaboration Workflow</h3>
      <div className="flex justify-around mb-8">
        {roles.map((role) => (
          <Button
            key={role.name}
            onClick={() => setCurrentRole(role)}
            variant={currentRole.name === role.name ? 'default' : 'outline'}
            className="flex items-center"
          >
            <role.icon className="mr-2" width={16} height={16} />
            {role.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {actions.map((action) => (
          <motion.div
            key={action.name}
            className={`p-4 rounded-lg ${
              action.allowedRoles.includes(currentRole.name)
                ? currentRole.color
                : 'bg-gray-200'
            } cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            onClick={() => selectAction(action)}
          >
            {action.name}
          </motion.div>
        ))}
      </div>
      {currentAction && (
        <div className="text-center">
          <p>
            {currentAction.allowedRoles.includes(currentRole.name)
              ? `As a ${currentRole.name}, you can ${currentAction.name.toLowerCase()}.`
              : `As a ${currentRole.name}, you don't have permission to ${currentAction.name.toLowerCase()}.`}
          </p>
        </div>
      )}
    </div>
  )
}
