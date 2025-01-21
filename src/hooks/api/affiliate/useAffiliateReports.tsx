import { IAffiliateDashboardReport, IAffiliateRefferalVsVisitCountGraphData, IGraphData } from "@/app/i/_module/_interfaces/reports.interface";
import { TimeFrameEnum } from "@/components/GraphCard";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAffiliateDashboardReportQuery = () => {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate-dashboard-report'],
    queryFn: async (): Promise<IAffiliateDashboardReport> => {
      const response = await axiosHandler.get('/affiliate/dashboard')
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export const useFetchAffiliatePayoutTrendQuery = (timeFrame: TimeFrameEnum) => {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate-payout-trend', timeFrame],
    queryFn: async (): Promise<IGraphData[]> => {
      const response = await axiosHandler.get('/affiliate/dashboard/referral-payout-trend', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}

export const useFetchAffiliateRefferalVsVisitCountQuery = (timeFrame: TimeFrameEnum) => {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate-refferal-vs-visit-count', timeFrame],
    queryFn: async (): Promise<IAffiliateRefferalVsVisitCountGraphData[]> => {
      const response = await axiosHandler.get('/affiliate/dashboard/referral-vs-visit-count', { params: { timeFrame } })
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  return query;
}