import React from 'react'
import { PieChart as Chart, Pie } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

type PieChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
  showLegend?: boolean;
}

export default function PieChart({ chartConfig, chartData, showLegend }: PieChartProps) {
  const key = Object.keys(chartConfig)[0];
  const nameKey = Object.keys(chartData[0] as Record<string, unknown>)[0];

  return (
    <ChartContainer config={chartConfig} className="min-h-56 w-full">
      <Chart data={chartData}>
        <ChartTooltip content={<ChartTooltipContent label={'099'} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />}
        <Pie data={chartData} dataKey={key} nameKey={nameKey} stroke="0" />
      </Chart>
    </ChartContainer>
  )
}