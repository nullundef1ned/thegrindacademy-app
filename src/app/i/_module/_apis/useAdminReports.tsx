import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IAdminAffiliateReport } from "../_interfaces/reports.interface";

export function useFetchAdminAffiliateStatistics() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['admin-affiliate-statistics'],
    queryFn: async (): Promise<IAdminAffiliateReport> => {
      const response = await axiosHandler.get('/admin/affiliate/dashboard')
      return response.data;
    },
  })

  return query;
}