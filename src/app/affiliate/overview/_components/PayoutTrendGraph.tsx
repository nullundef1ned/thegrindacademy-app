import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { ChartConfig } from '@/components/ui/chart';
import { useFetchAffiliatePayoutTrendQuery } from '@/hooks/api/affiliate/useAffiliateReports';

export default function PayoutTrendGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.TWELVE_MONTHS);

  const { data, isPending, isFetching, isError, refetch } = useFetchAffiliatePayoutTrendQuery(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    y: {
      label: "Payout ₦",
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
      title='Payout Trend'
      errorMessage='Payout insights will show up here'
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
