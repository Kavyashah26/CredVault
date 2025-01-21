'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Lock, Users, Layers, Key } from 'lucide-react'
import { Navbar } from './components/Navbar'
import CollaborationSimulator from './components/CollaborationSimulator'
import CredentialLifecycleVisualizer from './components/CredentialLifecycleVisualizer'
import TeamCollaborationFlow from './components/TeamCollaborationFlow'
import CustomerSuccessStories from './components/CustomerSuccessStories'

Navbar

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            Secure Credential Management
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto">
            Manage API keys, secrets, and passwords across your organization with granular access control.
          </p>
          <div className="flex justify-center">
            <Button className="bg-black text-white hover:bg-gray-800">
              Get Started <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
          style={{
            opacity: Math.min(scrollY / 500, 1)
          }}
        />
      </section>


      {/* Features */}
      <section id="features" className="py-20  bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Users, title: "Role-Based Access", description: "Admin, moderator, and member roles with customizable permissions." },
              { icon: Layers, title: "Hierarchical Structure", description: "Organize credentials by organization, project, and individual levels." },
              { icon: Lock, title: "Secure Storage", description: "Encrypted storage for API keys, secret keys, emails, and passwords." },
              { icon: Key, title: "Granular Permissions", description: "Control access to specific fields for each user role." }
            ].map((feature, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-lg flex items-start">
                <feature.icon className="mr-4 text-gray-600" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credential Lifecycle Visualizer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Credential Lifecycle Management</h2>
          <CredentialLifecycleVisualizer />
        </div>
      </section>

      {/* Team Collaboration Flow */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Seamless Team Collaboration</h2>
          <TeamCollaborationFlow />
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Success Stories</h2>
          <CustomerSuccessStories />
        </div>
      </section>


            {/* add encryption visualizer */}

      {/* Collaboration Simulator */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Real-Time Collaboration</h2>
          <CollaborationSimulator />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "1. Set Up Your Organization", description: "Create your organization and invite team members." },
              { title: "2. Create Projects", description: "Organize your credentials into different projects." },
              { title: "3. Manage Access", description: "Assign roles and permissions to team members for each project." }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Secure Your Credentials?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join organizations that trust our platform for managing their sensitive information.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your work email" className="w-full md:w-auto" />
            <Button className="w-full md:w-auto bg-black text-white hover:bg-gray-800">
              Start Free Trial
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 CredVault. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
              <a href="#" className="hover:text-gray-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

