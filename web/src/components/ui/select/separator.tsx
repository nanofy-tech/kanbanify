'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { SelectSeparator } from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

export const Separator = forwardRef<
  ElementRef<typeof SelectSeparator>,
  ComponentPropsWithoutRef<typeof SelectSeparator>
>(({ className, ...props }, ref) => (
  <SelectSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))

Separator.displayName = SelectSeparator.displayName
