import { ReactNode } from 'react'

import ModeToggle from '@/components/mode-toggle'
import Kanbanfy from '@/components/icons/kanbanfy'

export default function UnathenticatedLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-md border p-4 text-center shadow">
        <h1 className="flex items-center justify-center gap-2">
          <Kanbanfy className="h-8 w-8" />

          <span className="text-2xl uppercase">Kanbanfy</span>
        </h1>

        <div className="absolute right-4 top-4">
          <ModeToggle />
        </div>
        {children}
      </div>
    </main>
  )
}
