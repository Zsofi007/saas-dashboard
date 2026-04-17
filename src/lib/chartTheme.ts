import type { Theme } from '../context/ThemeContext.tsx'

export type ChartTheme = {
  grid: string
  axis: string
  line: string
  bar: string
  tooltipBg: string
  tooltipFg: string
  pie: string[]
}

const light: ChartTheme = {
  grid: '#e7e2dc',
  axis: '#6b6560',
  line: '#0b7f8c',
  bar: '#6b4f9a',
  tooltipBg: '#ffffff',
  tooltipFg: '#1c1917',
  pie: ['#0b7f8c', '#6b4f9a', '#b45309', '#0f766e', '#7c3aed'],
}

const dark: ChartTheme = {
  grid: '#3b3f4a',
  axis: '#a8a29e',
  line: '#5eead4',
  bar: '#c4b5fd',
  tooltipBg: '#1e222b',
  tooltipFg: '#f5f5f4',
  pie: ['#5eead4', '#c4b5fd', '#fdba74', '#34d399', '#a78bfa'],
}

export function getChartTheme(theme: Theme): ChartTheme {
  return theme === 'dark' ? dark : light
}
