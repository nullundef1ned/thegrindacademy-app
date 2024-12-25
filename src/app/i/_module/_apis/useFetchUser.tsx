import { useQuery } from "@tanstack/react-query";
import { IPagination, IUser } from "@/app/_module/app.interface";
import useAxios from "@/hooks/useAxios";
import { ISubscription } from "@/app/(student)/_module/student.interface";
import { IEnrolledCourse } from "@/app/(student)/_module/_interfaces/course.interface";

interface IAdminUserResponse {
  user: IUser;
  subscription: ISubscription;
}

export function useFetchUserDetails(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<IAdminUserResponse> => {
      const response = await axiosHandler.get(`/admin/user/${id}`)
      return response.data;
    },
  })

  return query;
}

export function useFetchUserCourses(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['user', id, 'courses'],
    queryFn: async (): Promise<IPagination<IEnrolledCourse>> => {
      const response = await axiosHandler.get(`/admin/user/${id}/course`)
      return response.data;
    },
  })

  return query;
}