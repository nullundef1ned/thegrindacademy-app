import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchUserGrowthOverTime } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function UserGrowthOverTimeGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.SEVEN_DAYS);

  const { data, isPending, isFetching, isError, refetch } = useFetchUserGrowthOverTime(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    y: {
      label: "Users",
      color: "#004DE8",
    }
  } satisfies ChartConfig

  const chart = {
    type: ChartTypeEnum.LINE,
    config: chartConfig,
    data: chartData
  }

  return (
    <GraphCard
      title='User Growth Over Time'
      errorMessage='User growth insights will show up here'
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
