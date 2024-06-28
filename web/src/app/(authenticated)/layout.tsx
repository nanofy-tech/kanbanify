import { Fragment, type ReactNode } from 'react'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/next-auth'

import Navbar from './components/navbar'

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden">
        <Navbar />

        <div className="h-full flex-1 overflow-auto p-4">{children}</div>
      </div>

      <div className="fixed bottom-4 left-4 rounded-md border p-2.5">
        Seu ID: {session?.user.id}
      </div>
    </>
  )
}
