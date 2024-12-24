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

export function useFetchActiveInactiveUsers() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['active-inactive-users'],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/dashboard/active-inactive-users')
      return response.data;
    },
  })

  return query;
}

export function useFetchCourseEnrollmentsAndCompletion() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course-enrollments-and-completion'],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/dashboard/course-enrollments-and-completion')
      return response.data;
    },
  })

  return query;
}