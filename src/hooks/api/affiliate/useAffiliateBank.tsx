import { IBankDetails } from "@/app/(student)/_module/student.interface";
import { useFetchUser } from "@/app/_module/_apis/useFetchUser";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAffiliateBankDetailsQuery = () => {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();

  const query = useQuery({
    queryKey: [user?.id, 'affiliate', 'bank-details'],
    queryFn: async (): Promise<IBankDetails> => {
      const response = await axiosHandler.get('/affiliate/bank-detail')
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return query;
}