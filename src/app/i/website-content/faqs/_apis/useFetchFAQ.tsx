import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IFAQ } from "@/interfaces/faq";

export function useFetchFAQ(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['faq', id],
    queryFn: async (): Promise<IFAQ | null> => {
      if (id === 'new') return null;
      const response = await axiosHandler.get(`/admin/website-content/faq/${id}`)
      return response.data;
    },
  })

  return query;
}