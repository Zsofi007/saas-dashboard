import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery.ts'
import { SkipLink } from './SkipLink.tsx'
import { Sidebar } from './Sidebar.tsx'
import { Topbar } from './Topbar.tsx'

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const sidebarInert = !isDesktop && !mobileNavOpen

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])
  const openMobileNav = useCallback(() => setMobileNavOpen(true), [])

  useEffect(() => {
    let cancelled = false
    const id = requestAnimationFrame(() => {
      if (!cancelled) setMobileNavOpen(false)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(id)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMobileNavOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileNavOpen])

  return (
    <div className="flex min-h-dvh min-w-0 overflow-x-hidden bg-surface text-foreground">
      <SkipLink />

      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 cursor-default border-0 bg-black/40 p-0 backdrop-blur-sm transition-opacity md:hidden"
          aria-label="Close navigation menu"
          onClick={closeMobileNav}
        />
      ) : null}

      <Sidebar
        open={mobileNavOpen}
        inert={sidebarInert}
        onNavigate={closeMobileNav}
      />

      <div className="flex min-h-dvh min-w-0 w-full max-w-full flex-1 flex-col md:ml-0">
        <Topbar
          onMenuClick={openMobileNav}
          menuOpen={mobileNavOpen}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4 py-6 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-6 lg:px-10"
        >
          <div className="mx-auto min-w-0 max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
