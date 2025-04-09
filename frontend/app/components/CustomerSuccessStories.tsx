'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"

const successStories = [
  {
    company: "TechInnovate Inc.",
    logo: "/placeholder.svg",
    quote: "CredManager has revolutionized how we handle sensitive information. Our team feels more secure than ever.",
    author: "Sarah Johnson, CTO",
    stats: { timeReduced: "60%", breachesPrevented: 12 }
  },
  {
    company: "Global Finance Group",
    logo: "/placeholder.svg",
    quote: "The ROI with CredManager is undeniable. We've seen a significant reduction in security incidents.",
    author: "Michael Chen, CISO",
    stats: { costSaved: "$500K", productivityGain: "40%" }
  },
  {
    company: "HealthTech Solutions",
    logo: "/placeholder.svg",
    quote: "In healthcare, data security is paramount. CredManager gives us peace of mind and regulatory compliance.",
    author: "Dr. Emily Patel, CEO",
    stats: { complianceScore: "99%", dataProtected: "10M+ records" }
  }
]

export default function CustomerSuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % successStories.length)
  }

  const prevStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + successStories.length) % successStories.length)
  }

  const currentStory = successStories[currentIndex]

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Customer Success Stories</h3>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img src={currentStory.logo} alt={currentStory.company} className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <blockquote className="text-xl italic mb-4">"{currentStory.quote}"</blockquote>
            <p className="font-semibold mb-2">{currentStory.author}</p>
            <p className="text-gray-600 mb-6">{currentStory.company}</p>
            <div className="flex justify-center space-x-8">
              {Object.entries(currentStory.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{value}</p>
                  <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <Button variant="ghost" className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full" onClick={prevStory}>
          <ChevronLeft size={24} />
        </Button>
        <Button variant="ghost" className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full" onClick={nextStory}>
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  )
}
