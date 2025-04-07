// import { AuthProvider } from './contexts/AuthContext'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Credential Management System',
  description: 'Secure credential management for teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          {children}
          <Toaster/>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}

