'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X, Lock } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

interface NavbarProps {
  hideAuthButtons?: boolean
}

export function Navbar({ hideAuthButtons = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // <nav className="bg-white shadow-md">
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* <Lock className="h-8 w-8 text-black" /> */}
              <div className="bg-black/5 p-2 rounded-full mr-2">
                <Lock className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold text-gray-800">CredVault</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium  transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium  transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium  transition-colors">
                About
              </Link>
            </div>
          </div>
          {!hideAuthButtons && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link href="/login">
                <Button variant="outline" className="text-black border-black hover:bg-gray-100 rounded-full px-6">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="ml-4 bg-black text-white hover:bg-gray-800 rounded-full px-6">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black ">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
      {isMenuOpen && (
        // <div className="sm:hidden">
          // <div className="pt-2 pb-3 space-y-1">
          <motion.div
            className="sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-2 pb-3 space-y-1 px-4">
            <Link href="/features" className="block py-2 px-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="block py-2 px-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="block py-2 px-4 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
              About
            </Link>
          </div>
          {!hideAuthButtons && (
            <div className="pt-4 pb-5 border-t border-gray-200">
              <div className="px-4 space-y-3">
              <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full justify-center text-black border-black hover:bg-gray-100 rounded-full"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full justify-center bg-black text-white hover:bg-gray-800 rounded-full">
                      Sign Up
                    </Button>
                  </Link>
              </div>
            </div>
          )}
        {/* </div> */}
          </motion.div>
      )}
      </AnimatePresence>
    </nav>
  )
}

