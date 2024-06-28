'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { DashIcon } from '@radix-ui/react-icons'

export const Separator = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <DashIcon />
  </div>
))
Separator.displayName = 'InputOTPSeparator'
