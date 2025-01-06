import { useFetchUser } from "@/app/_module/_apis/useFetchUser";
import useAxios from "@/hooks/useAxios";
import { IFAQ } from "@/interfaces/faq";
import { useQuery } from "@tanstack/react-query";

export const useFetchAffiliateFAQsQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'support', 'faq'],
    queryFn: async (): Promise<IFAQ[]> => {
      const response = await axiosHandler.get('/affiliate/support/faq')
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return query;
}