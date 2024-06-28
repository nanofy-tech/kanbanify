'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { DialogOverlay } from '@radix-ui/react-dialog'

import { cn } from '@/utils/shadcn'

export const Overlay = forwardRef<
  ElementRef<typeof DialogOverlay>,
  ComponentPropsWithoutRef<typeof DialogOverlay>
>(({ className, ...props }, ref) => (
  <DialogOverlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))

Overlay.displayName = DialogOverlay.displayName
