import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";

export function useFetchUserDetails(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get(`/admin/user/${id}`)
      return response.data;
    },
  })

  return query;
}