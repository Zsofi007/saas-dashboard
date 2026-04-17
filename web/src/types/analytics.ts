export type Period = '7d' | '30d' | '90d'

export type TimePoint = {
  label: string
  value: number
}

export type TrafficSlice = {
  name: string
  value: number
}

export type PeriodBundle = {
  metrics: {
    revenue: number
    users: number
    conversionRate: number
  }
  revenueOverTime: TimePoint[]
  userGrowth: TimePoint[]
  trafficSources: TrafficSlice[]
}

export type AnalyticsMock = Record<Period, PeriodBundle>
