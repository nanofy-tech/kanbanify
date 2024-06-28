'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { SelectScrollDownButton } from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

export const ScrollDownButton = forwardRef<
  ElementRef<typeof SelectScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectScrollDownButton>
))

ScrollDownButton.displayName = SelectScrollDownButton.displayName
