import { useId } from 'react'
import { Card } from '../ui/Card.tsx'

type MetricCardProps = {
  label: string
  value: string
  hint?: string
}

export function MetricCard({ label, value, hint }: MetricCardProps) {
  const labelId = useId()
  const hintId = useId()

  return (
    <article
      aria-labelledby={labelId}
      {...(hint ? { 'aria-describedby': hintId } : {})}
    >
      <Card className="group relative h-full overflow-hidden">
        <div
          className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <p id={labelId} className="text-sm font-medium text-muted">
          {label}
        </p>
        <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:-translate-y-0.5">
          {value}
        </p>
        {hint ? (
          <p
            id={hintId}
            className="mt-2 text-xs text-muted/90 transition-colors duration-300 group-hover:text-muted"
          >
            {hint}
          </p>
        ) : null}
      </Card>
    </article>
  )
}
