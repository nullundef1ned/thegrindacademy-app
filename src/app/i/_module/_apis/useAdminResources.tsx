import { IPagination } from "@/app/_module/app.interface";

import { IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IResource } from "../_interfaces/resource.interface";

export function useFetchAdminResources(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['resources', paginationParams],
    queryFn: async (): Promise<IPagination<IResource>> => {
      const response = await axiosHandler.get(`/admin/resource`, { params: paginationParams })
      return response.data;
    },
  })

  return query;
}