import { useRouter } from 'next/navigation'
import { MdError } from 'react-icons/md'
import { SubmitHandler, useForm } from 'react-hook-form'

import { auth } from '@/services/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SignUpData } from './schemas'

import { useStep } from '../../sign-up'

export default function FormSignUp() {
  const { email } = useStep()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: {
      email,
    },
  })

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      await auth.signUp(data)

      push('/login')
    } catch (error) {}
  }

  return (
    <>
      <h2 className="mb-2 mt-6 font-bold">Complete seu cadastro</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Input placeholder="E-mail" {...register('email')} disabled />

          {errors.email && (
            <span className="flex items-center text-sm text-red-400">
              <MdError className="mr-1 size-4" />

              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Input placeholder="Nome de usuário" {...register('username')} />

          {errors.username && (
            <span className="flex items-center text-sm text-red-400">
              <MdError className="mr-1 size-4" />

              {errors.username.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />

          {errors.password && (
            <span className="flex items-center text-sm text-red-400">
              <MdError className="mr-1 size-4" />

              {errors.password.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Confirmar senha"
            {...register('confirmPassword')}
          />

          {errors.confirmPassword && (
            <span className="flex items-center text-sm text-red-400">
              <MdError className="mr-1 size-4" />

              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </>
  )
}
