import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ICourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import { IPagination } from "@/app/_module/app.interface";

export function useFetchAdminCourseLessons(courseId: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['course', courseId, 'lessons'],
    queryFn: async (): Promise<IPagination<ICourseLesson>> => {
      const response = await axiosHandler.get(`/admin/course/${courseId}/lesson`, { params: { limit: 100 } })
      return response.data;
    },
  })

  return query;
}