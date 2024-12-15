import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IPrivacyPolicy } from "@/interfaces/meta-information";

export function useFetchPrivacyPolicy() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['privacy-policy'],
    queryFn: async (): Promise<IPrivacyPolicy> => {
      const response = await axiosHandler.get('/admin/website-content/privacy-policy')
      return response.data;
    },
  })

  return query;
}