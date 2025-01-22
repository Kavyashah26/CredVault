'use client'

import { motion } from "framer-motion"
import { Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  time: string
}

const mockActivities: ActivityItem[] = [
  { id: '1', user: 'Alice', action: 'created', target: 'Project X', time: '2 hours ago' },
  { id: '2', user: 'Bob', action: 'updated', target: 'API Key ABC', time: '4 hours ago' },
  { id: '3', user: 'Charlie', action: 'deleted', target: 'Old Credential', time: 'Yesterday' },
  { id: '4', user: 'Diana', action: 'added', target: 'New Team Member', time: '2 days ago' },
]

export function RecentActivityFeed() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Activity className="mr-2 h-4 w-4" />
        <h2 className="text-xl font-semibold">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {activity.user[0]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.user} {activity.action} {activity.target}
              </p>
              <p className="text-sm text-gray-500 truncate">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

