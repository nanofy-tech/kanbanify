'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { SelectLabel } from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

export const Label = forwardRef<
  ElementRef<typeof SelectLabel>,
  ComponentPropsWithoutRef<typeof SelectLabel>
>(({ className, ...props }, ref) => (
  <SelectLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
Label.displayName = SelectLabel.displayName
