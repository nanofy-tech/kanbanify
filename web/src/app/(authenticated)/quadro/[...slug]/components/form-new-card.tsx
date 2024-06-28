import { Dispatch, SetStateAction } from 'react'
import { nanoid } from 'nanoid'
import { Oval } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useCtx } from '../page'
import { useCreateCard } from '../../hooks/use-create-card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type FieldValues = {
  title: string
  description: string
  priority: boolean
}

type Props = {
  columnId: string
  onClose: Dispatch<SetStateAction<boolean>>
}

export default function FormNewCard(props: Props) {
  const { columnId, onClose } = props

  const { boardId, queryKey, setData } = useCtx()

  const { mutate: handleCreateCard } = useCreateCard({ queryKey })
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const itemId = nanoid()

    handleCreateCard({ id: boardId, columnId, itemId, ...data })

    const newTask = {
      itemId,
      ...data,
    }

    setData((prev) => {
      const newColumnMap = {
        ...prev?.columnMap,
        [columnId]: {
          ...prev?.columnMap[columnId],
          items: [...(prev?.columnMap[columnId]?.items ?? []), newTask],
        },
      }

      return {
        columnMap: newColumnMap,
        orderedColumnIds: [...(prev?.orderedColumnIds ?? [])],
      }
    })

    reset()
    onClose(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-end">
      <Input
        {...register('title')}
        className="h-9 px-2 py-1"
        placeholder="Tarefa"
        disabled={isSubmitting}
      />

      <Textarea
        rows={4}
        className="resize-none"
        placeholder="Descrição"
        {...register('description')}
        disabled={isSubmitting}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="priority"
          onCheckedChange={(value) => setValue('priority', Boolean(value))}
        />

        <Label htmlFor="priority">Marcar como prioridade</Label>
      </div>

      <Button type="submit" size="sm" disabled={isSubmitting}>
        {isSubmitting && (
          <Oval
            width={20}
            height={20}
            strokeWidth={4}
            color="#ffffff"
            secondaryColor="#ffffff"
          />
        )}

        <span className="ml-1">Adicionar Tarefa</span>
      </Button>
    </form>
  )
}
