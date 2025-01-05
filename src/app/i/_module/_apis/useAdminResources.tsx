import { IPagination } from "@/app/_module/app.interface";

import { IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IAffiliateResource } from "../_interfaces/affiliate.interface";

export function useFetchAdminResources(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['resources', paginationParams],
    queryFn: async (): Promise<IPagination<IAffiliateResource>> => {
      const response = await axiosHandler.get(`/admin/affiliate/community/resource`, { params: paginationParams })
      return response.data;
    },
  })

  return query;
}

export function useFetchAdminAffiliateTelegramCommunity() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['affiliate-telegram-community'],
    queryFn: async (): Promise<{ id: string, telegramChannelId: string }> => {
      const response = await axiosHandler.get(`/admin/affiliate/community`)
      return response.data;
    },
  })

  return query;
}