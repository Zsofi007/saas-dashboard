import { BookOpen, Headphones, MessageCircle, Send } from 'lucide-react'
import { Card } from '../components/ui/Card.tsx'
import { PageHeader } from '../components/ui/PageHeader.tsx'

const tickets = [
  {
    id: '#4821',
    subject: 'Tax IDs not syncing for DE accounts',
    status: 'In progress' as const,
    owner: 'Lina',
  },
  {
    id: '#4790',
    subject: 'Webhook retries capped at 24h',
    status: 'Waiting on you' as const,
    owner: 'Marco',
  },
  {
    id: '#4773',
    subject: 'CSV export missing custom fields',
    status: 'Resolved' as const,
    owner: 'Priya',
  },
]

const statusClass: Record<(typeof tickets)[number]['status'], string> = {
  'In progress': 'bg-sky-500/15 text-sky-800 dark:text-sky-200',
  'Waiting on you': 'bg-amber-500/15 text-amber-900 dark:text-amber-100',
  Resolved: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
}

export function SupportPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Support"
        description="Channels and a lightweight ticket list — swap in your helpdesk when you wire the backend."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
          <Headphones className="h-6 w-6 text-accent" aria-hidden />
          <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
            Priority line
          </h2>
          <p className="mt-2 text-sm text-muted">
            Mock SLA: first response under 2h on Pro+.
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-accent transition group-hover:underline"
            aria-label="Open priority support call playbook (demo)"
          >
            Call playbook
          </button>
        </Card>
        <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
          <MessageCircle className="h-6 w-6 text-accent" aria-hidden />
          <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
            Chat
          </h2>
          <p className="mt-2 text-sm text-muted">
            In-app messenger with transcripts attached to accounts.
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-accent transition group-hover:underline"
            aria-label="Open in-app chat widget (demo)"
          >
            Open widget
          </button>
        </Card>
        <Card className="group transition hover:-translate-y-0.5 hover:shadow-md">
          <BookOpen className="h-6 w-6 text-accent" aria-hidden />
          <h2 className="mt-3 font-display text-lg font-semibold text-foreground">
            Docs
          </h2>
          <p className="mt-2 text-sm text-muted">
            Guides for billing, webhooks, and data exports.
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-accent transition group-hover:underline"
            aria-label="Browse support documentation library (demo)"
          >
            Browse library
          </button>
        </Card>
      </section>

      <Card className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Open tickets
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:-translate-y-0.5"
            aria-label="Create a new support ticket (demo)"
          >
            <Send className="h-4 w-4" aria-hidden />
            New ticket
          </button>
        </div>
        <ul className="mt-4 divide-y divide-border" aria-label="Open tickets">
          {tickets.map((t) => (
            <li
              key={t.id}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t.id}
                </p>
                <p className="font-semibold text-foreground">{t.subject}</p>
                <p className="text-xs text-muted">Owner · {t.owner}</p>
              </div>
              <span
                className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:self-center ${statusClass[t.status]}`}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
