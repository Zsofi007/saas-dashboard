import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md'
}

const pad: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-4',
  md: 'p-5 sm:p-6',
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface-elevated shadow-sm transition-shadow duration-300 hover:shadow-md ${pad[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
