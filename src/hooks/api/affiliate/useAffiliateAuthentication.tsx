import { IUser } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useFetchUser } from "@/app/_module/_apis/useFetchUser";

export const useFetchAffiliateAuthenticationQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'authentication'],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get('/affiliate/auth')
      return response.data;
    },
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 10,
  })

  return query;
}