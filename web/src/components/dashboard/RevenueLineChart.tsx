import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartTheme } from '../../lib/chartTheme.ts'
import type { TimePoint } from '../../types/analytics.ts'

type RevenueLineChartProps = {
  data: TimePoint[]
  theme: ChartTheme
}

export function RevenueLineChart({ data, theme }: RevenueLineChartProps) {
  const chartData = data.map((d) => ({ name: d.label, revenue: d.value }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={theme.grid} strokeDasharray="4 8" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: theme.axis, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: theme.axis, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${Math.round(v / 1000)}k`}
        />
        <Tooltip
          cursor={{ stroke: theme.line, strokeOpacity: 0.15 }}
          contentStyle={{
            background: theme.tooltipBg,
            border: `1px solid ${theme.grid}`,
            borderRadius: 12,
            color: theme.tooltipFg,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
          formatter={(val) => [
            `$${Number(val ?? 0).toLocaleString()}`,
            'Revenue',
          ]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={theme.line}
          strokeWidth={3}
          dot={{ r: 3, strokeWidth: 2, fill: theme.tooltipBg, stroke: theme.line }}
          activeDot={{ r: 5 }}
          animationDuration={600}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
