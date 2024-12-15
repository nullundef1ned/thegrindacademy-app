import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { IFAQ } from "@/interfaces/faq";

export function useFetchFAQs(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['faqs', paginationParams],
    queryFn: async (): Promise<IPagination<IFAQ>> => {
      const response = await axiosHandler.get('/admin/website-content/faq', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}