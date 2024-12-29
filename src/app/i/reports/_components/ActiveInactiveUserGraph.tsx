import GraphCard from '@/components/GraphCard'
import { ChartTypeEnum } from '@/components/GraphCard'
import { useFetchActiveInactiveUsers } from '../../_module/_apis/useFetchReports';
import { ChartConfig } from '@/components/ui/chart';

export default function ActiveInactiveUserGraph() {
  const { data, isPending, isFetching, isError, refetch } = useFetchActiveInactiveUsers();

  const chartData = data || [];

  const chartConfig = {
    count: {
      label: "Users",
    }
  } satisfies ChartConfig

  const chart = {
    type: ChartTypeEnum.PIE,
    config: chartConfig,
    data: chartData
  }

  if (!Array.isArray(chartData) || chartData?.some(item => !item.count)) {
    chart.data = [{ name: 'No data', percentage: 0, count: 0 }];
  }

  return (
    <GraphCard
      title='Active vs Inactive Users'
      errorMessage='Active vs Inactive Users data will show up here'
      chart={chart}
      isError={isError}
      refetch={refetch}
      loading={isPending}
      isFetching={isFetching}
    />
  )
}
