import { Check, FileText, Receipt } from 'lucide-react'
import { useId } from 'react'
import { Card } from '../components/ui/Card.tsx'
import { PageHeader } from '../components/ui/PageHeader.tsx'

const planFeatures = [
  'Unlimited seats in this mock',
  'Priority sync windows',
  'SOC2-friendly audit trail (placeholder)',
]

const invoices = [
  { id: 'INV-1922', date: 'Apr 2, 2026', amount: 890, status: 'Paid' as const },
  { id: 'INV-1888', date: 'Mar 2, 2026', amount: 890, status: 'Paid' as const },
  { id: 'INV-1842', date: 'Feb 2, 2026', amount: 890, status: 'Paid' as const },
  { id: 'INV-1810', date: 'Jan 2, 2026', amount: 620, status: 'Void' as const },
]

export function BillingPage() {
  const invoiceHeadingId = useId()

  return (
    <div>
      <PageHeader
        eyebrow="Finance"
        title="Billing"
        description="Plan snapshot and recent invoices — static placeholders for a billing surface."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">Current plan</p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                Northline Pro
              </p>
              <p className="mt-2 text-sm text-muted">
                $890 / month · renews <span className="font-medium text-foreground">May 12</span>
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="Manage subscription and billing details"
            >
              Manage subscription
            </button>
          </div>
          <ul className="mt-6 space-y-3" aria-label="Plan features">
            {planFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Payment method
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted">
            Visa •••• 4242 · Exp 09/28
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:shadow-sm"
            aria-label="Update payment card on file"
          >
            Update card
          </button>
        </Card>
      </div>

      <section className="mt-6" aria-labelledby={invoiceHeadingId}>
        <Card className="overflow-hidden p-0" padding="sm">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <FileText className="h-5 w-5 text-accent" aria-hidden />
            <h2 id={invoiceHeadingId} className="font-display text-lg font-semibold text-foreground">
              Invoices
            </h2>
          </div>
          <ul className="divide-y divide-border" aria-label="Recent invoices">
            {invoices.map((inv) => (
              <li
                key={inv.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 transition hover:bg-border/20"
              >
                <div>
                  <p className="font-semibold text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">
                    ${inv.amount.toLocaleString()}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
                        : 'bg-border/70 text-muted'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}
