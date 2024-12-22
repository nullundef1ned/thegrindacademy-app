import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ICourseDetail } from "@/app/(student)/_module/_interfaces/course.interface";

export function useFetchAdminCourse(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course', id],
    queryFn: async (): Promise<ICourseDetail> => {
      const response = await axiosHandler.get(`/admin/course/${id}`)
      return response.data;
    },
  })

  return query;
}