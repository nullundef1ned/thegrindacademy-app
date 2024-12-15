import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { IDynamicContent } from "@/interfaces/dynamic-content";

export function useFetchDynamicContent(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['dynamic-content', paginationParams],
    queryFn: async (): Promise<IPagination<IDynamicContent>> => {
      const response = await axiosHandler.get('/admin/website-content/dynamic-content', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}