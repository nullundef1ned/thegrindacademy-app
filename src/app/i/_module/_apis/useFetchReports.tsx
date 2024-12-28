import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { TimeFrameEnum } from "@/app/_module/app.enum";
import { ICourseReport, IDashboardReport, IFinanceReport, IGraphData, IPieChartDataResponse, ISubscriptionReport, IUserDashboardReport } from "../_interfaces/reports.interface";
import { IPayout } from "@/app/(student)/_module/student.interface";
import { IPagination } from "@/app/_module/app.interface";

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

export function useFetchSubscriptionGrowth(timeFrame: TimeFrameEnum) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['subscription-growth', timeFrame],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/report/subscription/growth', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export function useFetchSubscriptionPlanPopularity(timeFrame: TimeFrameEnum) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['subscription-plan-popularity', timeFrame],
    queryFn: async (): Promise<IPieChartDataResponse[]> => {
      const response = await axiosHandler.get('/admin/report/subscription/plan-popularity', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export function useFetchCourseEnrollmentsAndCompletion(timeFrame: TimeFrameEnum) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course-enrollments-and-completion', timeFrame],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/admin/report/course/enrollment-and-completion-rate', { params: { timeFrame } })
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
    queryFn: async (): Promise<IPieChartDataResponse[]> => {
      const response = await axiosHandler.get('/admin/report/user/active-vs-inactive')
      return response.data;
    },
  })

  return query;
}

export function useFetchCourseReport() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course-report'],
    queryFn: async (): Promise<ICourseReport> => {
      const response = await axiosHandler.get('/admin/report/course')
      return response.data;
    },
  })

  return query;
}

export function useFetchSubscriptionReport() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['subscription-report'],
    queryFn: async (): Promise<ISubscriptionReport> => {
      const response = await axiosHandler.get('/admin/report/subscription')
      return response.data;
    },
  })

  return query;
}

export function useFetchUserReport() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user-report'],
    queryFn: async (): Promise<IUserDashboardReport> => {
      const response = await axiosHandler.get('/admin/report/user')
      return response.data;
    },
  })

  return query;
}

export function useFetchFinanceReport() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['finance-report'],
    queryFn: async (): Promise<IFinanceReport> => {
      const response = await axiosHandler.get('/admin/report/revenue')
      return response.data;
    },
  })

  return query;
}

export function useFetchPayoutHistory() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['payout-history'],
    queryFn: async (): Promise<IPagination<IPayout>> => {
      const response = await axiosHandler.get('/admin/report/revenue/payout')
      return response.data;
    },
  })

  return query;
}