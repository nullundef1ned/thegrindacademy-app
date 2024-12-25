import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IDynamicContent } from "@/interfaces/dynamic-content";

export function useFetchDynamicContentSection(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['dynamic-content-section', id],
    queryFn: async (): Promise<IDynamicContent | null> => {
      if (id === 'new') return null;
      const response = await axiosHandler.get(`/admin/website-content/dynamic-content/${id}`)
      return response.data;
    },
  })

  return query;
}