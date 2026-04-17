import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { ChartTheme } from '../../lib/chartTheme.ts'
import type { TrafficSlice } from '../../types/analytics.ts'

type TrafficPieChartProps = {
  data: TrafficSlice[]
  theme: ChartTheme
}

export function TrafficPieChart({ data, theme }: TrafficPieChartProps) {
  const chartData = data.map((d) => ({ name: d.name, value: d.value }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="58%"
          outerRadius="82%"
          paddingAngle={3}
          animationDuration={600}
        >
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={theme.pie[index % theme.pie.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: theme.tooltipBg,
            border: `1px solid ${theme.grid}`,
            borderRadius: 12,
            color: theme.tooltipFg,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
          formatter={(val, name) => [`${Number(val ?? 0)}%`, String(name)]}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
