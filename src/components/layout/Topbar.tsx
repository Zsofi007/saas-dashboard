import { Menu, Moon, Search, Sun } from 'lucide-react'
import { useId } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.tsx'
import { navIdFromPathname, navItems } from '../../navigation.ts'

type TopbarProps = {
  onMenuClick: () => void
  menuOpen: boolean
}

export function Topbar({ onMenuClick, menuOpen }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const searchDesktopId = useId()
  const searchMobileId = useId()
  const darkMode = theme === 'dark'
  const activeNav = navIdFromPathname(location.pathname)
  const activeLabel = navItems.find((n) => n.id === activeNav)?.label ?? 'App'

  return (
    <header className="sticky top-0 z-30 flex min-w-0 max-w-full items-center gap-3 border-b border-border/80 bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground transition hover:-translate-y-0.5 hover:shadow-md md:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="app-sidebar"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <div className="hidden min-w-[8rem] shrink-0 md:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          View
        </p>
        <p className="font-display text-sm font-semibold text-foreground">{activeLabel}</p>
      </div>

      <div className="relative hidden min-w-0 flex-1 sm:block lg:max-w-md">
        <label htmlFor={searchDesktopId} className="sr-only">
          Search workspace
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id={searchDesktopId}
          type="search"
          name="q"
          placeholder="Search metrics, customers, invoices…"
          autoComplete="off"
          className="w-full rounded-xl border border-border bg-surface-elevated py-2.5 pl-10 pr-3 text-sm text-foreground shadow-inner outline-none ring-accent/40 transition placeholder:text-muted/80 focus:border-accent focus:ring-2"
        />
      </div>

      <div className="relative min-w-0 flex-1 sm:hidden">
        <label htmlFor={searchMobileId} className="sr-only">
          Search workspace
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id={searchMobileId}
          type="search"
          name="q"
          placeholder="Search…"
          autoComplete="off"
          className="w-full rounded-xl border border-border bg-surface-elevated py-2.5 pl-10 pr-3 text-sm text-foreground shadow-inner outline-none ring-accent/40 transition placeholder:text-muted/80 focus:border-accent focus:ring-2"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
        </button>

        <button
          type="button"
          className="group flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-2 py-1.5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          aria-label="Account menu for Zsofia Kato"
          aria-haspopup="menu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-emerald-600 text-sm font-semibold text-white shadow-inner" aria-hidden>
            ZK
          </span>
          <span className="hidden text-xs leading-tight sm:block">
            <span className="block font-semibold text-foreground">Zsofia Kato</span>
            <span className="text-muted">Owner</span>
          </span>
        </button>
      </div>
    </header>
  )
}
