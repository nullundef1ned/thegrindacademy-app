import React, { Fragment } from 'react'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts"

type LineChartProps = {
  chartData: unknown[];
  chartConfig: ChartConfig;
}

export default function LineChart({ chartConfig, chartData }: LineChartProps) {
  const keys = Object.keys(chartConfig);
  const dataKey = Object.entries(chartData[0] as Record<string, unknown>)
    .filter(([_, value]) => _ && typeof value !== 'number')
    .map(([key]) => key)[0];

  return (
    <ChartContainer config={chartConfig} className="min-h-96 w-full">
      <AreaChart data={chartData}>
        <CartesianGrid opacity={0.2} vertical={false} />
        <XAxis dataKey={dataKey} />
        <YAxis axisLine={false} tickLine={false} tickMargin={30} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {keys.map((key, index) => (
          <Fragment key={index}>
            <defs>
              <linearGradient id={key} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={key}
              type="linear"
              fill={`url(#${key})`}
              fillOpacity={0.4}
              stroke={`var(--color-${key})`}
              stackId="a"
            />
          </Fragment>
        ))}
      </AreaChart>
    </ChartContainer>
  )
}
