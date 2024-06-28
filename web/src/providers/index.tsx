'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from './theme'
import { ReactQueryProvider } from './react-query'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
