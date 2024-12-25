import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IInfluencer } from "@/interfaces/influencer";

export function useFetchInfluencer() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['influencer'],
    queryFn: async (): Promise<IInfluencer> => {
      const response = await axiosHandler.get('/admin/website-content/influencer')
      return response.data;
    },
  })

  return query;
}