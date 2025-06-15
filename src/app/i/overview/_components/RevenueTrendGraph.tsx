import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchRevenueTrend } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function RevenueTrendGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.SEVEN_DAYS);

  const { data, isPending, isFetching, isError, refetch } = useFetchRevenueTrend(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    y: {
      label: "Revenue ₦",
      color: "#004DE8",
    }
  } satisfies ChartConfig

  const chart = {
    type: ChartTypeEnum.BAR,
    config: chartConfig,
    data: chartData
  }

  return (
    <GraphCard
      title='Revenue Trend'
      errorMessage='Revenue insights will show up here'
      chart={chart}
      isError={isError}
      activePeriod={timeFrame}
      setActivePeriod={setTimeFrame}
      refetch={refetch}
      loading={isPending}
      isFetching={isFetching}
    />
  )
}
