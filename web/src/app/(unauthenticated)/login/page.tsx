import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

import SignIn from './sign-in'

export default function Login() {
  return (
    <>
      <h2 className="mb-2 mt-6 font-bold">Acesse sua conta</h2>

      <SignIn />

      <Link href="/criar-conta" className="mb-4 mt-8 block hover:underline">
        Não possui uma conta?
      </Link>

      <div className="mt-4 space-y-4">
        <button className="text-md flex w-full items-center justify-center gap-2 rounded-md border p-2.5 hover:bg-muted">
          <FcGoogle className="size-5" /> Entre com Google
        </button>
      </div>
    </>
  )
}
