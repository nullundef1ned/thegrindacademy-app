import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ITermsOfService } from "@/interfaces/meta-information";

export function useFetchTermsOfService() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['terms-of-service'],
    queryFn: async (): Promise<ITermsOfService> => {
      const response = await axiosHandler.get('/admin/website-content/terms-and-conditions')
      return response.data;
    },
  })

  return query;
}