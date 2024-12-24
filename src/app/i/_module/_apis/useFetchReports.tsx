import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { TimeFrameEnum } from "@/app/_module/app.enum";
import { IDashboardReport, IGraphData } from "../_interfaces/reports.interface";

export function useFetchUserGrowthOverTime(timeFrame: TimeFrameEnum) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user-growth-over-time', timeFrame],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/dashboard/user-growth', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export function useFetchRevenueTrend(timeFrame: TimeFrameEnum) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['revenue-trend', timeFrame],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/dashboard/revenue-trend', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export function useFetchDashboardReport() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['dashboard-report'],
    queryFn: async (): Promise<IDashboardReport> => {
      const response = await axiosHandler.get('/admin/dashboard')
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}