import { Mail, MoreHorizontal } from 'lucide-react'
import { Card } from '../components/ui/Card.tsx'
import { PageHeader } from '../components/ui/PageHeader.tsx'

const rows = [
  {
    name: 'Acme Robotics',
    email: 'billing@acme.example',
    plan: 'Scale',
    mrr: 2400,
    status: 'Healthy' as const,
  },
  {
    name: 'Northwind Trading',
    email: 'ops@northwind.example',
    plan: 'Pro',
    mrr: 890,
    status: 'Trialing' as const,
  },
  {
    name: 'Blueprint Studio',
    email: 'hello@blueprint.example',
    plan: 'Pro',
    mrr: 620,
    status: 'Healthy' as const,
  },
  {
    name: 'Helios Labs',
    email: 'finance@helios.example',
    plan: 'Enterprise',
    mrr: 12800,
    status: 'Renewal' as const,
  },
  {
    name: 'Rivermill Co.',
    email: 'team@rivermill.example',
    plan: 'Starter',
    mrr: 120,
    status: 'At risk' as const,
  },
]

const statusStyles: Record<(typeof rows)[number]['status'], string> = {
  Healthy: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  Trialing: 'bg-sky-500/15 text-sky-800 dark:text-sky-200',
  Renewal: 'bg-violet-500/15 text-violet-800 dark:text-violet-200',
  'At risk': 'bg-rose-500/15 text-rose-800 dark:text-rose-200',
}

export function CustomersPage() {
  return (
    <div className="min-w-0">
      <PageHeader
        eyebrow="Directory"
        title="Customers"
        description="Mock directory of accounts with plan, MRR, and lifecycle tags. Hook this to your CRM when ready."
      />

      <Card padding="sm" className="min-w-0 overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <p className="text-sm text-muted">{rows.length} accounts</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-accent/40 hover:shadow-sm"
            aria-label="Export customer list as CSV"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Export CSV
          </button>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Customers with plan, monthly recurring revenue, and account status
            </caption>
            <thead className="bg-surface text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-5">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 sm:px-5">
                  Plan
                </th>
                <th scope="col" className="px-4 py-3 sm:px-5">
                  MRR
                </th>
                <th scope="col" className="px-4 py-3 sm:px-5">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 sm:px-5 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr
                  key={row.email}
                  className="bg-surface-elevated/40 transition-colors hover:bg-border/25"
                >
                  <td className="px-4 py-3 sm:px-5">
                    <p className="font-semibold text-foreground">{row.name}</p>
                    <p className="text-xs text-muted">{row.email}</p>
                  </td>
                  <td className="px-4 py-3 sm:px-5 text-muted">{row.plan}</td>
                  <td className="px-4 py-3 sm:px-5 font-medium text-foreground">
                    ${row.mrr.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5 text-right">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-muted transition hover:border-border hover:text-foreground"
                      aria-label={`Row actions for ${row.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
