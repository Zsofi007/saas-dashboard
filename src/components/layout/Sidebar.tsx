import { NavLink } from 'react-router-dom'
import { defaultNavId, navItems, pathForNav } from '../../navigation.ts'

type SidebarProps = {
  open: boolean
  /** When true, sidebar content is removed from tab order and screen readers (mobile drawer closed). */
  inert?: boolean
  onNavigate?: () => void
}

export function Sidebar({ open, inert = false, onNavigate }: SidebarProps) {
  return (
    <aside
      id="app-sidebar"
      inert={inert ? true : undefined}
      className={`fixed inset-y-0 left-0 z-40 flex w-[min(280px,88vw)] flex-col border-r border-border bg-surface-elevated/95 px-4 py-6 shadow-xl backdrop-blur-md transition-transform duration-300 ease-out md:static md:z-0 md:w-64 md:translate-x-0 md:shadow-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Primary navigation"
    >
      <NavLink
        to={pathForNav(defaultNavId)}
        onClick={onNavigate}
        className="flex items-center gap-3 px-2 transition-opacity hover:opacity-90"
        aria-label="Northline home"
      >
        <span
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-accent/10 shadow-md shadow-accent/20 ring-1 ring-accent/15"
          aria-hidden
        >
          <img
            src="/saas-dashboard.png"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </span>
        <span>
          <span className="font-display text-lg font-semibold leading-tight text-foreground">
            Northline
          </span>
          <span className="block text-xs text-muted">Revenue workspace</span>
        </span>
      </NavLink>

      <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="App sections">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={pathForNav(item.id)}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/12 text-accent shadow-sm ring-1 ring-accent/20'
                    : 'text-muted hover:bg-border/40 hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      isActive
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-transparent bg-border/30 text-muted group-hover:border-border group-hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <section
        className="mt-auto rounded-xl border border-dashed border-border/80 bg-surface px-3 py-3 text-xs text-muted"
        aria-label="Sync status"
      >
        <p className="font-semibold text-foreground">Next sync</p>
        <p className="mt-1">Mock data refreshes on filter change.</p>
      </section>
    </aside>
  )
}
