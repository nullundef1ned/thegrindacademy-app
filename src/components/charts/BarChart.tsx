import React from 'react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart as Chart, CartesianGrid, XAxis, YAxis } from "recharts"

type BarChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
}

export default function BarChart({ chartConfig, chartData }: BarChartProps) {
  const keys = Object.keys(chartConfig);
  const dataKey = Object.entries(chartData[0] as Record<string, unknown>)
    .filter(([_, value]) => _ && typeof value !== 'number')
    .map(([key]) => key)[0];

  return (
    <ChartContainer config={chartConfig} className="min-h-96 w-full">
      <Chart data={chartData}>
        <CartesianGrid opacity={0.2} vertical={false} />
        <XAxis dataKey={dataKey} />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {keys.map((key, index) => (
          <Bar key={index} dataKey={key} fill={`var(--color-${key})`} radius={[4, 4, 0, 0]} />
        ))}
      </Chart>
    </ChartContainer>
  )
}
