'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import {Navbar} from '../components/Navbar'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Input type="text" placeholder="Subject" required />
              <Textarea placeholder="Your Message" required className="h-32" />
              <Button type="submit" className="w-full">
                {isSubmitted ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <CheckCircle className="mr-2" size={16} />
                    Sent Successfully
                  </motion.span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2" size={16} />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="mr-2" size={20} />
                <span>support@credmanager.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" size={20} />
                <span>123 Security Street, Cybertown, CT 00000</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={20} />
                <span>Monday - Friday, 9am - 5pm EST</span>
              </div>
            </div>
            
          </div>
        </div>

      </main>
    </div>
  )
}

