'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Title as DialogTitle } from '@radix-ui/react-dialog'

import { cn } from '@/utils/shadcn'

export const Title = forwardRef<
  ElementRef<typeof DialogTitle>,
  ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => (
  <DialogTitle
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))

Title.displayName = DialogTitle.displayName
