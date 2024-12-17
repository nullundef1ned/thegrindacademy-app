import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { IAdminCoursePaginationParams, IPagination } from "@/app/_module/app.interface";
import { IAdminCourse } from "@/interfaces/course";

export function useFetchAdminCourses(paginationParams?: IAdminCoursePaginationParams) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['courses', paginationParams],
    queryFn: async (): Promise<IPagination<IAdminCourse>> => {
      const response = await axiosHandler.get(`/admin/course`, { params: paginationParams })
      return response.data;
    },
  })

  return query;
}