import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchActiveInactiveUserTrend } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function ActiveInactiveUserTrendGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.SEVEN_DAYS);

  const { data, isPending, isFetching, isError, refetch } = useFetchActiveInactiveUserTrend(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    active: {
      label: "Active Users",
      color: "#004DE8",
    },
    inactive: {
      label: "Inactive Users",
      color: "#548DFF"
    }
  } satisfies ChartConfig

  const chart = {
    type: ChartTypeEnum.LINE,
    config: chartConfig,
    data: chartData
  }

  return (
    <GraphCard
      title='User Activity Trend'
      errorMessage='Active vs Inactive users insights will show up here'
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
