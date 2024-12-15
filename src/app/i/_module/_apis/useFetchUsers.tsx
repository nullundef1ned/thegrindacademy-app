import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams, IUser } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";

export function useFetchUsers(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['users', paginationParams],
    queryFn: async (): Promise<IPagination<IUser>> => {
      const response = await axiosHandler.get('/admin/user', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}