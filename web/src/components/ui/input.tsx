'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/shadcn'

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variantSize: {
        default: 'px-3 py-1 h-12',
        sm: 'px-3 py-1 h-10',
      },
    },
    defaultVariants: {
      variantSize: 'default',
    },
  },
)

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variantSize, ...props }, ref) => {
    return (
      <input
        type="text"
        className={cn(inputVariants({ variantSize, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
