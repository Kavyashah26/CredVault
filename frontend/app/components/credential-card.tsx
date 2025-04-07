"use client"

import { motion } from "framer-motion"
import { Key, Clock, User, Eye, EyeOff, Tag, Pencil, Trash2, Copy, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

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

interface CredentialCardProps {
  credential: Credential
  index: number
  isVisible: boolean
  isLoading: boolean
  isAdmin: boolean
  onToggleVisibility: (id: string) => void
  onUpdate: (credential: Credential) => void
  onDelete: (credential: Credential) => void
}

export default function CredentialCard({
  credential,
  index,
  isVisible,
  isLoading,
  isAdmin,
  onToggleVisibility,
  onUpdate,
  onDelete,
}: CredentialCardProps) {
  const [copied, setCopied] = useState(false)

  // Format credential type for display
  const getFormattedType = (type: string) => {
    switch (type.toLowerCase()) {
      case "api_key":
        return "API Key"
      case "password":
        return "Password"
      case "token":
        return "Access Token"
      case "secret":
        return "Secret Key"
      case "certificate":
        return "Certificate"
      default:
        return type
    }
  }

  const copyToClipboard = () => {
    if (credential.value && isVisible) {
      navigator.clipboard.writeText(credential.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 flex flex-col relative border-gray-200 overflow-hidden group h-[420px]">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisibility(credential.id)}
            disabled={isLoading}
            className="h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-gray-100 flex items-center justify-center"
            aria-label={isVisible ? "Hide credential" : "Show credential"}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-800 border-t-transparent" />
            ) : isVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        <CardHeader className="pb-2 pt-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
              {getFormattedType(credential.type)}
            </Badge>
          </div>
          <CardTitle className="text-xl flex items-center truncate">
            <Key className="h-5 w-5 mr-2 flex-shrink-0 text-gray-500" />
            <span className="truncate">{credential.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col space-y-4 pb-2 overflow-hidden">
          {/* Fixed height credential value section to prevent layout shifts */}
          <div className="h-[60px]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-gray-700">Value</span>
            </div>
            <div className="font-mono bg-gray-50 p-2.5 rounded-md border border-gray-200 flex items-center justify-between group relative h-[40px]">
              <p className="truncate pr-8 text-sm">
                {isVisible ? credential.value || "No value" : "••••••••••••••••••••••••"}
              </p>
              {credential.value && isVisible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="absolute right-1 h-7 w-7 rounded-md hover:bg-gray-200 flex items-center justify-center opacity-80 hover:opacity-100"
                  aria-label="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-gray-800" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-gray-600" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Fixed height description section */}
          <div className="h-[100px]">
            <h4 className="text-sm font-medium text-gray-700 mb-1.5">Description</h4>
            <div className="text-sm text-gray-600 bg-gray-50 p-2.5 rounded-md border border-gray-200 h-[80px] overflow-y-auto">
              {credential.description || <span className="text-gray-400 italic">No description provided</span>}
            </div>
          </div>

          {/* Fixed height tags section */}
          <div className="h-[60px]">
            <div className="flex items-center mb-1.5">
              <Tag className="h-4 w-4 mr-1.5 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-700">Tags</h4>
            </div>
            <div className="flex flex-wrap gap-1.5 h-[40px] overflow-y-auto">
              {credential.tags && credential.tags.length > 0 ? (
                credential.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">No tags</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mt-auto pt-2 border-t border-gray-100">
            {credential.lastUpdated && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span className="truncate text-gray-600">Updated {credential.lastUpdated}</span>
              </div>
            )}
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate text-gray-600">By {credential.createdBy.name}</span>
            </div>
          </div>
        </CardContent>

        {isAdmin && (
          <CardFooter className="pt-3 pb-3 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end w-full gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdate(credential)}
                className="flex items-center gap-1.5 h-8 bg-white hover:bg-gray-100"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(credential)}
                className="flex items-center gap-1.5 h-8"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

