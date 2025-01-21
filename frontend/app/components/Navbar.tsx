'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X, Lock } from 'lucide-react'

interface NavbarProps {
  hideAuthButtons?: boolean
}

export function Navbar({ hideAuthButtons = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Lock className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-bold text-gray-800">CredVault</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          {!hideAuthButtons && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/login">
                <Button variant="outline" className="text-black border-black hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="ml-4 bg-black text-white hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
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

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="#features" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              Features
            </Link>
            <Link href="#pricing" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              Pricing
            </Link>
            <Link href="#about" className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              About
            </Link>
          </div>
          {!hideAuthButtons && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="mt-3 space-y-1">
                <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Login
                </Link>
                <Link href="/signup" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

