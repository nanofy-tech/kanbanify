'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'
import { MdError } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { SendEmailData, sendEmailSchema } from './schema'

import useSendEmail from './hooks/use-send-email'
import { useStep } from '../../sign-up'

export default function FormSendEmail() {
  const { handleNextStep, setEmail } = useStep()
  const { asyncFn: sendEmail, loading } = useSendEmail()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailData>({
    resolver: zodResolver(sendEmailSchema),
  })

  const onSubmit: SubmitHandler<SendEmailData> = async (data) => {
    const status = await sendEmail(data)

    if (status === 200) {
      handleNextStep()
      setEmail(data.email)
    }
  }

  return (
    <>
      <h2 className="mb-2 mt-6 font-bold">Insira seu e-mail para continuar</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Input
            placeholder="E-mail"
            {...register('email')}
            disabled={loading}
          />

          {errors.email && (
            <span className="flex items-center text-sm text-red-400">
              <MdError className="mr-1 size-4" />

              {errors.email.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <Oval
              height={20}
              width={20}
              strokeWidth={4}
              color="#ffffff"
              secondaryColor="#ffffff"
            />
          )}
          Enviar
        </Button>
      </form>
    </>
  )
}
