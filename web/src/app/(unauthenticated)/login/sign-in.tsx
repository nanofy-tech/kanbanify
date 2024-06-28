'use client'

import { useEffect } from 'react'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SignInData, signInSchema } from './schema'

export default function SignIn() {
  const { push } = useRouter()
  const { data: session } = useSession()

  const { handleSubmit, register } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    signIn('email', {
      ...data,
      redirect: false,
    })
  }

  useEffect(() => {
    if (session?.user.accessToken && session?.user.email) {
      setCookie(null, 'access_token', session.user.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      push('/quadros')
    }
  }, [session, push])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input type="email" placeholder="E-mail" {...register('email')} />

        <Button type="submit" className="w-full" size="lg">
          Acessar
        </Button>
      </form>
    </>
  )
}
