'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Description as DialogDescription } from '@radix-ui/react-dialog'

import { cn } from '@/utils/shadcn'

export const Description = forwardRef<
  ElementRef<typeof DialogDescription>,
  ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => (
  <DialogDescription
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))

Description.displayName = DialogDescription.displayName
