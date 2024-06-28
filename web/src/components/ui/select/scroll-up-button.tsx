'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import { ScrollUpButton as SelectScrollUpButton } from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

export const ScrollUpButton = forwardRef<
  ElementRef<typeof SelectScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectScrollUpButton>
))

ScrollUpButton.displayName = SelectScrollUpButton.displayName
