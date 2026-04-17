type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
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
    </header>
  )
}
