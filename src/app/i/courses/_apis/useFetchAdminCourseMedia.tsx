import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ICourseMedia } from "@/app/(student)/_module/_interfaces/course.interface";

export function useFetchAdminCourseMedia(courseId: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course', courseId, 'media'],
    queryFn: async (): Promise<ICourseMedia> => {
      const response = await axiosHandler.get(`/admin/course/${courseId}/media`)
      return response.data;
    },
  })

  return query;
}