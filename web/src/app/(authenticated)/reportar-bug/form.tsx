'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type FieldValues = {
  file: File[]
  type: string
  email: string
  userId: string
  subject: string
  description: string
}

export default function Form() {
  const { data } = useSession()

  const { handleSubmit, setValue, register, watch } = useForm<FieldValues>()

  const { file } = watch()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  const user = data?.user

  useEffect(() => {
    if (!user) return

    setValue('userId', user.id)
    setValue('email', user.email)
  }, [user, setValue])

  return (
    <>
      <main className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-xl font-bold">Reportar um bug</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-end">
          <div className="grid grid-cols-2 gap-4">
            <Input disabled={!!user?.id} {...register('userId')} />

            <Input disabled={!!user?.email} {...register('email')} />
          </div>

          <Select.Root onValueChange={(value) => setValue('type', value)}>
            <Select.Trigger className="h-12">
              <Select.Value placeholder="Selecione uma opção" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="problem_board" className="h-12">
                Problemas com os quadros
              </Select.Item>
              <Select.Item value="problem_account" className="h-12">
                Problemas com a conta
              </Select.Item>
              <Select.Item value="problem_interface" className="h-12">
                Problemas com a interface
              </Select.Item>
              <Select.Item value="another" className="h-12">
                Outro
              </Select.Item>
            </Select.Content>
          </Select.Root>

          <Input placeholder="Assunto" {...register('subject')} />

          <Textarea
            rows={6}
            placeholder="Descreva o problema que você está enfrentando"
            className="resize-none"
            {...register('description')}
          />

          <Input type="file" className="py-3" />

          <Button>Enviar</Button>
        </form>
      </main>
    </>
  )
}
