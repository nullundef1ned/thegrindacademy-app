import { IPayout, IReferral } from "@/app/(student)/_module/student.interface";
import { useFetchUser } from "@/app/_module/_apis/useFetchUser";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import { IReferralStatistics } from "@/app/affiliate/_module/affiliate.interface";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAffiliateReferralQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'referral'],
    queryFn: async (): Promise<IReferral> => {
      const response = await axiosHandler.get('/affiliate/referral/code')
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return query;
}

export const useFetchReferralStatisticsQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'referral', 'statistics'],
    queryFn: async (): Promise<IReferralStatistics> => {
      const response = await axiosHandler.get('/affiliate/referral/dashboard')
      return response.data;
    },
  })

  return query;
}

export const useFetchPayoutsQuery = (params: IPaginationParams) => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'referral', 'payouts'],
    queryFn: async (): Promise<IPagination<IPayout>> => {
      const response = await axiosHandler.get('/affiliate/referral/payout', { params })
      return response.data;
    },
  })

  return query;
}