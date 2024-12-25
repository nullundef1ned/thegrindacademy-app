import { useQuery } from "@tanstack/react-query";
import { IPagination, IPaginationParams } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { ICourse } from "@/app/(student)/_module/_interfaces/course.interface";

export function useFetchCourses(paginationParams?: IPaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['courses', paginationParams],
    queryFn: async (): Promise<IPagination<ICourse>> => {
      const response = await axiosHandler.get('/admin/course', { params: paginationParams })
      return response.data;
    },
  })

  return query;
}