'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/utils/shadcn'

export const Shortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
Shortcut.displayName = 'DropdownMenuShortcut'
