'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, Lock, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

const stages = [
  { name: 'Creation', icon: Key, color: 'bg-blue-500' },
  { name: 'Storage', icon: Lock, color: 'bg-green-500' },
  { name: 'Usage', icon: RefreshCw, color: 'bg-yellow-500' },
  { name: 'Rotation', icon: RefreshCw, color: 'bg-purple-500' },
  { name: 'Revocation', icon: Trash2, color: 'bg-red-500' },
]

export default function CredentialLifecycleVisualizer() {
  const [currentStage, setCurrentStage] = useState(0)

  const nextStage = () => {
    setCurrentStage((prev) => (prev + 1) % stages.length)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Credential Lifecycle Management</h3>
      <div className="flex justify-between items-center mb-8">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center ${
                index === currentStage ? 'ring-4 ring-offset-2 ring-black' : ''
              }`}
              animate={{ scale: index === currentStage ? 1.2 : 1 }}
            >
              <stage.icon className="text-white" size={24} />
            </motion.div>
            <span className="mt-2 text-sm">{stage.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="mb-4">
          {currentStage === 0 && "Securely generate new credentials with strong entropy."}
          {currentStage === 1 && "Encrypt and store credentials using industry-standard algorithms."}
          {currentStage === 2 && "Safely retrieve and use credentials in your applications."}
          {currentStage === 3 && "Regularly update credentials to maintain security."}
          {currentStage === 4 && "Securely revoke and delete credentials when no longer needed."}
        </p>
        <Button onClick={nextStage}>Next Stage</Button>
      </div>
    </div>
  )
}

