'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/utils/shadcn'

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)

Header.displayName = 'DialogHeader'
