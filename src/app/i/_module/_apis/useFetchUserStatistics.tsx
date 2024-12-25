import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IUserReport } from "../_interfaces/reports.interface";

export function useFetchUserStatistics() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user-statistics'],
    queryFn: async (): Promise<IUserReport> => {
      const response = await axiosHandler.get('/admin/user/dashboard')
      return response.data;
    },
  })

  return query;
}