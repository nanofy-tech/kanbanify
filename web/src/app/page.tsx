import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-20 space-y-4 text-center">
        <h1 className="text-2xl font-bold uppercase">Kanbanfy</h1>

        <Button className="cursor-pointer" asChild>
          <Link href="/login">Acessar plataforma</Link>
        </Button>
      </div>
    </main>
  )
}
