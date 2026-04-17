import { useEffect, useState } from 'react'

/**
 * Brief loading state when switching filters so chart areas show skeletons.
 */
export function useSimulatedChartLoad(dependency: unknown, delayMs = 720) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const startId = requestAnimationFrame(() => {
      if (alive) setLoading(true)
    })
    const endId = window.setTimeout(() => {
      if (alive) setLoading(false)
    }, delayMs)
    return () => {
      alive = false
      cancelAnimationFrame(startId)
      window.clearTimeout(endId)
    }
  }, [dependency, delayMs])

  return loading
}
