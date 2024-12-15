import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { IStudentInterview } from "@/interfaces/student-interview";

export function useFetchStudentInterviews(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['student-interviews', paginationParams],
    queryFn: async (): Promise<IPagination<IStudentInterview>> => {
      const response = await axiosHandler.get('/admin/website-content/student-interview', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}