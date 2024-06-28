'use client'

import { ReactNode, forwardRef, memo } from 'react'

type BoardProps = {
  children: ReactNode
}

const Board = forwardRef<HTMLDivElement, BoardProps>(
  ({ children }: BoardProps, ref) => {
    return (
      <div className="relative flex h-full items-start gap-4" ref={ref}>
        {children}
      </div>
    )
  },
)

Board.displayName = 'Board'

export default memo(Board)
