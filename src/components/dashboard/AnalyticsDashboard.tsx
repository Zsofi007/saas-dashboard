import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import analyticsMock from '../../data/analytics.json' with { type: 'json' }
import { useTheme } from '../../context/ThemeContext.tsx'
import { getChartTheme } from '../../lib/chartTheme.ts'
import { formatCompact, formatCurrency, formatPercent } from '../../lib/format.ts'
import type { AnalyticsMock, Period } from '../../types/analytics.ts'
import { useSimulatedChartLoad } from '../../hooks/useSimulatedChartLoad.ts'
import { Card } from '../ui/Card.tsx'
import { CopyToClipboardButton } from '../ui/CopyToClipboardButton.tsx'
import { ChartSkeleton } from '../ui/Skeleton.tsx'
import { MetricCard } from './MetricCard.tsx'
import { PeriodFilter } from './PeriodFilter.tsx'
import { RevenueLineChart } from './RevenueLineChart.tsx'
import { TrafficPieChart } from './TrafficPieChart.tsx'
import { UserGrowthBarChart } from './UserGrowthBarChart.tsx'

const data = analyticsMock as AnalyticsMock

export function AnalyticsDashboard() {
  const [period, setPeriod] = useState<Period>('7d')
  const location = useLocation()
  const { theme } = useTheme()
  const chartsLoading = useSimulatedChartLoad(period)
  const chartTheme = useMemo(() => getChartTheme(theme), [theme])

  const bundle = data[period]
  const pageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}${location.search}`
      : ''

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            Overview
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Analytics
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Monitor revenue momentum, acquisition, and channel mix. Switch ranges
            to compare cadence across weeks and quarters.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          {pageUrl ? (
            <CopyToClipboardButton
              text={pageUrl}
              idleLabel="Copy link"
              ariaLabel="Copy page link to clipboard"
            />
          ) : null}
          <PeriodFilter value={period} onChange={setPeriod} />
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Key metrics">
        <MetricCard
          label="Revenue"
          value={formatCurrency(bundle.metrics.revenue)}
          hint="Net billed in selected window"
        />
        <MetricCard
          label="Active users"
          value={formatCompact(bundle.metrics.users)}
          hint="Unique signed-in users"
        />
        <MetricCard
          label="Conversion rate"
          value={formatPercent(bundle.metrics.conversionRate)}
          hint="Trial → paid, last touch"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3" aria-label="Charts">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Revenue over time
              </h2>
              <p className="text-sm text-muted">Daily / weekly rollups by range</p>
            </div>
          </div>
          <figure className="mt-4 h-[280px] w-full">
            <figcaption className="sr-only">
              Line chart of billed revenue for each interval in the selected range.
            </figcaption>
            {chartsLoading ? (
              <ChartSkeleton />
            ) : (
              <RevenueLineChart data={bundle.revenueOverTime} theme={chartTheme} />
            )}
          </figure>
        </Card>

        <Card>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Traffic sources
            </h2>
            <p className="text-sm text-muted">Share of sessions</p>
          </div>
          <figure className="mt-2 h-[280px] w-full">
            <figcaption className="sr-only">
              Pie chart showing the percentage share of sessions by marketing channel.
            </figcaption>
            {chartsLoading ? (
              <ChartSkeleton />
            ) : (
              <TrafficPieChart data={bundle.trafficSources} theme={chartTheme} />
            )}
          </figure>
        </Card>
      </section>

      <section aria-label="User growth chart">
        <Card>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              User growth
            </h2>
            <p className="text-sm text-muted">New accounts per interval</p>
          </div>
          <figure className="mt-4 h-[280px] w-full">
            <figcaption className="sr-only">
              Bar chart of newly created accounts for each interval in the selected range.
            </figcaption>
            {chartsLoading ? (
              <ChartSkeleton />
            ) : (
              <UserGrowthBarChart data={bundle.userGrowth} theme={chartTheme} />
            )}
          </figure>
        </Card>
      </section>
    </div>
  )
}
