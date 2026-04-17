import { Bell, KeyRound, UserRound } from 'lucide-react'
import { useId, useState } from 'react'
import { Card } from '../components/ui/Card.tsx'
import { CopyToClipboardButton } from '../components/ui/CopyToClipboardButton.tsx'
import { PageHeader } from '../components/ui/PageHeader.tsx'

const MOCK_API_SECRET = 'sk_live_mock_7f3c9a2e1b8d4c6a0e5f9d2b7a4c1e8'

function ToggleRow({
  id,
  label,
  description,
  defaultOn,
}: {
  id: string
  label: string
  description: string
  defaultOn?: boolean
}) {
  const [on, setOn] = useState(Boolean(defaultOn))
  const descId = `${id}-description`
  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span id={`${id}-label`} className="font-semibold text-foreground">
          {label}
        </span>
        <p id={descId} className="text-sm text-muted">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${id}-label`}
        aria-describedby={descId}
        onClick={() => setOn((v) => !v)}
        className={`relative h-8 w-14 shrink-0 rounded-full border transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated ${
          on
            ? 'border-accent bg-accent shadow-inner'
            : 'border-border bg-surface'
        }`}
      >
        <span
          className={`absolute top-0.5 h-7 w-7 rounded-full bg-surface-elevated shadow transition duration-300 ${
            on ? 'left-6' : 'left-0.5'
          }`}
          aria-hidden
        />
      </button>
    </div>
  )
}

export function SettingsPage() {
  const base = useId()
  const nameId = `${base}-display-name`
  const emailId = `${base}-work-email`

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Profile, notifications, and API access — interactive toggles are local-only."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Profile
            </h2>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={nameId} className="block text-sm font-medium text-muted">
                Display name
              </label>
              <input
                id={nameId}
                name="displayName"
                defaultValue="Zsofia Kato"
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor={emailId} className="block text-sm font-medium text-muted">
                Work email
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                defaultValue="zsofia@northline.example"
                autoComplete="email"
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
              />
            </div>
            <button
              type="button"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:-translate-y-0.5"
            >
              Save changes
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-lg font-semibold text-foreground">
              Notifications
            </h2>
          </div>
          <div className="mt-2">
            <ToggleRow
              id={`${base}-digest`}
              label="Weekly digest"
              description="Summary of revenue, churn, and experiments."
              defaultOn
            />
            <ToggleRow
              id={`${base}-failures`}
              label="Failed payments"
              description="Alert owners when a renewal needs attention."
              defaultOn
            />
            <ToggleRow
              id={`${base}-marketing`}
              label="Product updates"
              description="What we shipped — no more than twice a month."
            />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="font-display text-lg font-semibold text-foreground">
              API keys
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted">
            Mock secret shown once — rotate from your vault in production.
          </p>
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all text-xs text-foreground" aria-label="Mock API secret key">
              {MOCK_API_SECRET}
            </code>
            <CopyToClipboardButton
              text={MOCK_API_SECRET}
              idleLabel="Copy"
              variant="copy"
              ariaLabel="Copy mock API key to clipboard"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
