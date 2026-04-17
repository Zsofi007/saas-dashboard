import type { Period } from '../../types/analytics.ts'

const options: { id: Period; label: string }[] = [
  { id: '7d', label: '7d' },
  { id: '30d', label: '30d' },
  { id: '90d', label: '90d' },
]

type PeriodFilterProps = {
  value: Period
  onChange: (period: Period) => void
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div
      className="inline-flex rounded-full border border-border bg-surface-elevated p-1 shadow-inner"
      role="radiogroup"
      aria-label="Date range"
    >
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
              active
                ? 'bg-accent text-white shadow-sm'
                : 'text-muted hover:text-foreground'
            } `}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
