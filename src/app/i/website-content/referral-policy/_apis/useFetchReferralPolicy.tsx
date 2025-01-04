import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IReferralPolicy } from "@/interfaces/meta-information";

export function useFetchReferralPolicy() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['referral-policy'],
    queryFn: async (): Promise<IReferralPolicy> => {
      const response = await axiosHandler.get('/admin/website-content/referral-policy')
      return response.data;
    },
  })

  return query;
}