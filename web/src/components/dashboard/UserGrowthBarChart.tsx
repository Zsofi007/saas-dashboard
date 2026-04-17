import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartTheme } from '../../lib/chartTheme.ts'
import type { TimePoint } from '../../types/analytics.ts'

type UserGrowthBarChartProps = {
  data: TimePoint[]
  theme: ChartTheme
}

export function UserGrowthBarChart({ data, theme }: UserGrowthBarChartProps) {
  const chartData = data.map((d) => ({ name: d.label, users: d.value }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
        />
        <Tooltip
          cursor={{ fill: theme.bar, fillOpacity: 0.08 }}
          contentStyle={{
            background: theme.tooltipBg,
            border: `1px solid ${theme.grid}`,
            borderRadius: 12,
            color: theme.tooltipFg,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
          formatter={(val) => [Number(val ?? 0).toLocaleString(), 'New users']}
        />
        <Bar
          dataKey="users"
          fill={theme.bar}
          radius={[10, 10, 4, 4]}
          maxBarSize={48}
          animationDuration={600}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
