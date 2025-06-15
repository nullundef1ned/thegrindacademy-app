import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum, TimeFrameEnum } from '@/components/GraphCard'
import React, { useState } from 'react'
import { useFetchCourseEnrollmentsAndCompletion } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function CourseEnrollmentsAndCompletionGraph() {
  const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.SEVEN_DAYS);

  const { data, isPending, isFetching, isError, refetch } = useFetchCourseEnrollmentsAndCompletion(timeFrame);

  const chartData = data || [];

  const chartConfig = {
    enrollments: {
      label: "Enrollments",
      color: "#004DE8",
    },
    completions: {
      label: "Completion Rate",
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
      title='Course Enrollments vs Completion Rates'
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

