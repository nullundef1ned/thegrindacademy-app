import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchAffiliateRefferalVsVisitCountQuery } from '@/hooks/api/affiliate/useAffiliateReports';
import { ChartConfig } from '@/components/ui/chart';

export default function RevenueVsVisitCountGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.TWELVE_MONTHS);

  const { data, isPending, isFetching, isError, refetch } = useFetchAffiliateRefferalVsVisitCountQuery(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    referral: {
      label: "Referral",
      color: "#004DE8",
    },
    visit: {
      label: "Visit",
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
      title='Revenue vs Visit Count'
      errorMessage='Revenue vs Visit Count insights will show up here'
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
