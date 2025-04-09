"use client"

import { useEffect, useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
}

export function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors by mounting only on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-3 right-3 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
              
              {/* Video container with 16:9 aspect ratio */}
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
