import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Providers from '@/providers'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '400'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Kanbanify',
    default: 'Kanbanify',
  },
  description: 'Kanbanify é um aplicativo de quadro kanban simples.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
