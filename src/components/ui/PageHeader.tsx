import { useLocation } from 'react-router-dom'
import { CopyToClipboardButton } from './CopyToClipboardButton.tsx'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  /** When true (default), show a control to copy the current page URL. */
  copyLink?: boolean
}

export function PageHeader({
  eyebrow,
  title,
  description,
  copyLink = true,
}: PageHeaderProps) {
  const location = useLocation()
  const pageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}${location.search}`
      : ''

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {copyLink && pageUrl ? (
          <CopyToClipboardButton
            text={pageUrl}
            idleLabel="Copy link"
            ariaLabel="Copy page link to clipboard"
          />
        ) : null}
      </div>
    </header>
  )
}
