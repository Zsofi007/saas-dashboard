import {
  ArrowUpRight,
  CalendarClock,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Card } from '../components/ui/Card.tsx'
import { PageHeader } from '../components/ui/PageHeader.tsx'

const highlights = [
  {
    title: 'Pipeline health',
    value: 'Strong',
    detail: 'Win rate up 6% vs last month',
    icon: TrendingUp,
  },
  {
    title: 'Expansion revenue',
    value: '$18.4k',
    detail: 'Net revenue from add-ons & seats',
    icon: ArrowUpRight,
  },
  {
    title: 'Churn watch',
    value: '0.9%',
    detail: 'Voluntary churn, trailing 30d',
    icon: Sparkles,
  },
]

const activity = [
  { title: 'Acme upgraded to Scale', time: '2h ago', tone: 'positive' as const },
  { title: 'Invoice #1842 paid', time: '5h ago', tone: 'neutral' as const },
  { title: 'Northwind trialing Pro', time: 'Yesterday', tone: 'neutral' as const },
  { title: 'Webhook delivery retried', time: 'Yesterday', tone: 'warning' as const },
]

export function OverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Home"
        title="Overview"
        description="A quick read on momentum, cash, and what changed recently across your workspace."
      />

      <section className="grid gap-4 md:grid-cols-3" aria-label="Highlights">
        {highlights.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted">{item.title}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-foreground transition duration-300 group-hover:-translate-y-0.5">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs text-muted">{item.detail}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-accent transition duration-300 group-hover:border-accent/40 group-hover:shadow-md">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Recent activity
            </h2>
            <span className="text-xs font-medium text-muted">Mock feed</span>
          </div>
          <ul className="mt-4 divide-y divide-border" aria-label="Recent workspace activity">
            {activity.map((row) => (
              <li
                key={row.title}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{row.title}</p>
                  <p className="text-xs text-muted">{row.time}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                    row.tone === 'positive'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : row.tone === 'warning'
                        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200'
                        : 'bg-border/60 text-muted'
                  }`}
                  aria-label={`Activity tag: ${row.tone}`}
                >
                  {row.tone}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-lg font-semibold text-foreground">
              This week
            </h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-muted" aria-label="Planned work this week">
            <li className="rounded-xl border border-border/80 bg-surface px-3 py-2">
              <span className="font-semibold text-foreground">Mon</span> — Launch
              checklist for EU invoices
            </li>
            <li className="rounded-xl border border-border/80 bg-surface px-3 py-2">
              <span className="font-semibold text-foreground">Wed</span> — Review
              dunning copy with finance
            </li>
            <li className="rounded-xl border border-border/80 bg-surface px-3 py-2">
              <span className="font-semibold text-foreground">Fri</span> — Ship
              saved segments to beta cohort
            </li>
          </ul>
        </Card>
      </section>
    </div>
  )
}
