import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Users,
} from 'lucide-react'

export type NavId =
  | 'overview'
  | 'analytics'
  | 'customers'
  | 'billing'
  | 'support'
  | 'settings'

export type NavItem = {
  id: NavId
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'support', label: 'Support', icon: LifeBuoy },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export const defaultNavId: NavId = 'analytics'

export function pathForNav(id: NavId): string {
  return `/${id}`
}

function isNavId(value: string): value is NavId {
  return navItems.some((item) => item.id === value)
}

/** First path segment after `/`, or default when missing / unknown. */
export function navIdFromPathname(pathname: string): NavId {
  const trimmed = pathname.trim()
  const withoutLeading = trimmed.replace(/^\/+/, '')
  const segment = withoutLeading.split('/')[0] ?? ''
  if (!segment) return defaultNavId
  return isNavId(segment) ? segment : defaultNavId
}
