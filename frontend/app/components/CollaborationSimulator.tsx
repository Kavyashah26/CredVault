'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  { id: 1, name: 'Alice', avatar: '/placeholder.svg' },
  { id: 2, name: 'Bob', avatar: '/placeholder.svg' },
  { id: 3, name: 'Charlie', avatar: '/placeholder.svg' },
]

const actions = [
  'viewed a credential',
  'updated a secret',
  'added a new API key',
  'revoked access to a credential',
  'invited a new team member',
]

export default function CollaborationSimulator() {
  const [logs, setLogs] = useState<Array<{ user: (typeof users)[0], action: string }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const user = users[Math.floor(Math.random() * users.length)]
      const action = actions[Math.floor(Math.random() * actions.length)]
      setLogs(prevLogs => [{ user, action }, ...prevLogs.slice(0, 4)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Real-Time Activity Log</h3>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="flex items-center space-x-4 animate-fade-in">
            <Avatar>
              <AvatarImage src={log.user.avatar} alt={log.user.name} />
              <AvatarFallback>{log.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{log.user.name}</span> {log.action}
              </p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
