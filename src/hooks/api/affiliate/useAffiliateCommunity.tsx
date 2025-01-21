import { useFetchUser } from "@/app/_module/_apis/useFetchUser";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import { IAffiliateResource } from "@/app/i/_module/_interfaces/affiliate.interface";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useAffiliateCommunityQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'community'],
    queryFn: async (): Promise<string> => {
      const response = await axiosHandler.get('/affiliate/community')
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return query;
}

export const useAffiliateResourcesQuery = (params: IPaginationParams) => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'resources'],
    queryFn: async (): Promise<IPagination<IAffiliateResource>> => {
      const response = await axiosHandler.get('/affiliate/community/resource', { params })
      return response.data;
    },
  })

  return query;
}