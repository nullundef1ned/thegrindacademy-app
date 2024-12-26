import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchSubscriptionGrowth } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function SubscriptionGrowthGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.TWELVE_MONTHS);

  const { data, isPending, isFetching, isError, refetch } = useFetchSubscriptionGrowth(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    y: {
      label: "Subscriptions",
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
      title='Subscription Growth'
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

