import type { Metadata } from "next"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Material Management System",
  description: "A system for managing construction materials",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                {/* <SignInButton />
                <SignUpButton /> */}
              </SignedOut>
              <SignedIn>
                
              </SignedIn>
            </header>
            <AppSidebar />
            {children}
            <Toaster position="top-right" />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}