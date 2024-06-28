'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Label as DropdownLabel } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/shadcn'

export const Label = forwardRef<
  ElementRef<typeof DropdownLabel>,
  ComponentPropsWithoutRef<typeof DropdownLabel> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownLabel
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
Label.displayName = DropdownLabel.displayName
