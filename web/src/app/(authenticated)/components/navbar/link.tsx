'use client'

import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import NextLink, { type LinkProps } from 'next/link'

import { cn } from '@/utils/shadcn'

interface Props extends LinkProps {
  className?: string
  children: ReactNode
}

export default function Link({ className, ...rest }: Props) {
  const pathname = usePathname()

  const isActive = rest.href === pathname

  return (
    <NextLink
      className={cn(
        className,
        'flex items-center gap-1 text-sm transition-colors hover:text-slate-400 data-[active=active]:text-slate-500',
      )}
      data-active={isActive ? 'active' : 'inactive'}
      {...rest}
    />
  )
}
