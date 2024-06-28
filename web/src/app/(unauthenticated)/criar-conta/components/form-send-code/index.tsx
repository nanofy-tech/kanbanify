'use client'

import { Oval } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { InputOTP } from '@/components/ui/input-otp'

import useSendCode from './hooks'
import { SendCodeData } from './schema'

import { useStep } from '../../sign-up'

export default function FormSendCode() {
  const { handleNextStep, email: emailToSignUp } = useStep()
  const { asyncFn: validateCode, loading } = useSendCode()

  const { handleSubmit, setValue } = useForm<SendCodeData>()

  const onSubmit: SubmitHandler<SendCodeData> = async (data) => {
    const { email } = await validateCode(data)

    if (email === emailToSignUp) {
      handleNextStep()
    }
  }

  return (
    <>
      <h2 className="mb-2 mt-6 font-bold">
        Insira o código enviado para seu e-mail
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputOTP.Root
          maxLength={6}
          onChange={(value) => setValue('code', value)}
        >
          <InputOTP.Group>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTP.Slot key={index} index={index} />
            ))}
          </InputOTP.Group>
        </InputOTP.Root>
        <Button type="submit" className="w-full" disabled={loading}>
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
