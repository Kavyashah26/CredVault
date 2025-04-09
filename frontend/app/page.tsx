"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Lock, Users, Layers, Key, Play } from "lucide-react"
import { Navbar } from "./components/Navbar"
import { VideoModal } from "./components/VideoModal"
import CollaborationSimulator from "./components/CollaborationSimulator"
import CredentialLifecycleVisualizer from "./components/CredentialLifecycleVisualizer"
import TeamCollaborationFlow from "./components/TeamCollaborationFlow"
import CustomerSuccessStories from "./components/CustomerSuccessStories"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="FL00RvMAnMY" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 z-0" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-black/10 blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 z-10 py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-black/5 text-sm font-medium border border-black/10">
              Trusted by 500+ organizations worldwide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
              Secure Credential{" "}
              <span className="relative">
                Management
                <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300/30 -z-10"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-center max-w-2xl mx-auto text-gray-700">
              Manage API keys, secrets, and passwords across your organization with granular access control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg"
                onClick={() => router.push("/signup")}
              >
                Get Started <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button
                variant="outline"
                className="border-black/20 hover:bg-gray-100 rounded-full px-8 py-6 text-lg group"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play
                  className="mr-2 size-4 text-black group-hover:text-black/70 transition-colors"
                  fill="currentColor"
                />
                Watch Demo
              </Button>
            </div>

            {/* Video thumbnail preview */}
            <div
              className="mt-12 max-w-2xl mx-auto relative cursor-pointer group"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={`https://img.youtube.com/vi/FL00RvMAnMY/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-black" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-0 right-0 mx-auto w-[90%] h-[50px] bg-black/10 blur-xl rounded-full z-[-1]"></div>
            </div>
          </div>
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
          style={{
            opacity: Math.min(scrollY / 500, 1),
          }}
        />
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Features</div>
            <h2 className="text-4xl font-bold mb-6">Everything you need to manage credentials</h2>
            <p className="text-xl text-gray-600">
              Our platform provides comprehensive tools for secure credential management across your entire
              organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: "Role-Based Access",
                description: "Admin, moderator, and member roles with customizable permissions for your entire team.",
              },
              {
                icon: Layers,
                title: "Hierarchical Structure",
                description:
                  "Organize credentials by organization, project, and individual levels for better management.",
              },
              {
                icon: Lock,
                title: "Secure Storage",
                description: "End-to-end encrypted storage for API keys, secret keys, emails, and passwords.",
              },
              {
                icon: Key,
                title: "Granular Permissions",
                description: "Control access to specific fields for each user role with detailed audit logs.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="bg-black/5 p-3 rounded-xl inline-block mb-4">
                  <feature.icon className="text-black" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credential Lifecycle Visualizer */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Lifecycle Management
            </div>
            <h2 className="text-4xl font-bold mb-6">Manage the entire credential lifecycle</h2>
            <p className="text-xl text-gray-600">
              From creation to rotation to revocation, maintain complete control over your credentials.
            </p>
          </div>
          <CredentialLifecycleVisualizer />
        </div>
      </section>

      {/* Team Collaboration Flow */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Team Collaboration</div>
            <h2 className="text-4xl font-bold mb-6">Seamless team collaboration</h2>
            <p className="text-xl text-gray-600">
              Enable your team to work together securely without compromising on speed or security.
            </p>
          </div>
          <TeamCollaborationFlow />
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Success Stories</div>
            <h2 className="text-4xl font-bold mb-6">Trusted by innovative teams</h2>
            <p className="text-xl text-gray-600">
              See how organizations are securing their credentials with our platform.
            </p>
          </div>
          <CustomerSuccessStories />
        </div>
      </section>

      {/* Collaboration Simulator */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Real-Time Collaboration
            </div>
            <h2 className="text-4xl font-bold mb-6">See collaboration in action</h2>
            <p className="text-xl text-gray-600">
              Experience how teams work together in real-time with our interactive simulator.
            </p>
          </div>
          <CollaborationSimulator />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Getting Started</div>
            <h2 className="text-4xl font-bold mb-6">How it works</h2>
            <p className="text-xl text-gray-600">Get up and running with CredVault in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "Set Up Your Organization",
                description: "Create your organization and invite team members to collaborate securely.",
              },
              {
                number: "02",
                title: "Create Projects",
                description: "Organize your credentials into different projects for better management.",
              },
              {
                number: "03",
                title: "Manage Access",
                description: "Assign roles and permissions to team members for each project.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Ready to secure your credentials?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
              Join 500+ organizations that trust our platform for managing their sensitive information.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="w-full md:w-auto bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 rounded-full px-6">
                Start Free Trial
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-4">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">CredVault</h3>
              <p className="text-gray-400">Secure credential management for modern teams.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 CredVault. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
