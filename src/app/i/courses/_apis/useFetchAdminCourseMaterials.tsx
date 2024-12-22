import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ICourseMaterial } from "@/app/(student)/_module/_interfaces/course.interface";
import { IPagination } from "@/app/_module/app.interface";

export function useFetchAdminCourseMaterials(courseId: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course', courseId, 'materials'],
    queryFn: async (): Promise<IPagination<ICourseMaterial>> => {
      const response = await axiosHandler.get(`/admin/course/${courseId}/material`)
      return response.data;
    },
  })

  return query;
}