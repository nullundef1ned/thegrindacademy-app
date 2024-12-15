import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IMetaInformation } from "@/interfaces/meta-information";

export function useFetchMetaInformation() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['meta-information'],
    queryFn: async (): Promise<IMetaInformation> => {
      const response = await axiosHandler.get('/admin/website-content/meta')
      return response.data;
    },
  })

  return query;
}