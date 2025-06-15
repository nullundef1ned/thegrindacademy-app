import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchSubscriptionPlanPopularity } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function SubscriptionPlanPopularityGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.SEVEN_DAYS);

  const { data, isPending, isFetching, isError, refetch } = useFetchSubscriptionPlanPopularity(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    count: {
      label: "Subscriptions",
    }
  } satisfies ChartConfig

  const chart = {
    type: ChartTypeEnum.PIE,
    config: chartConfig,
    data: chartData
  }

  return (
    <GraphCard
      title='Subscription Plan Popularity'
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

