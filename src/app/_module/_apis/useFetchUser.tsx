import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../app.interface";
import usePathFinder from "@/hooks/usePathFinder";

export function useFetchUser() {
  const axiosHandler = useAxios();
  const { isAdmin, isAffiliate } = usePathFinder();

  const role = isAdmin ? 'admin' : isAffiliate ? 'affiliate' : 'student';

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get(`/${role}/auth`)
      return response.data
    }
  })

  return query;
}