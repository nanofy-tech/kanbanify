import Link from 'next/link'
import SignUp from './sign-up'

export default function SignUpPage() {
  return (
    <>
      <SignUp />

      <Link href="/login" className="mb-4 mt-8 block hover:underline">
        Já possui uma conta?
      </Link>
    </>
  )
}
