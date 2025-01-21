import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { IAffiliate } from "../_interfaces/affiliate.interface";
import { IUserReferral } from "@/app/(student)/_module/student.interface";

export function useFetchAffiliates(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliates', paginationParams],
    queryFn: async (): Promise<IPagination<IAffiliate>> => {
      const response = await axiosHandler.get('/admin/affiliate', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}

export function useFetchAffiliateDetails(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate', id],
    queryFn: async (): Promise<IAffiliate> => {
      const response = await axiosHandler.get(`/admin/affiliate/${id}`)
      return response.data;
    },
  })

  return query;
}

export function useFetchAffiliateReferrals(id: string, paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate', id, 'referrals', paginationParams],
    queryFn: async (): Promise<IPagination<IUserReferral>> => {
      const response = await axiosHandler.get(`/admin/affiliate/${id}/referral`, { params: paginationParams })
      return response.data;
    },
  })

  return query;
}