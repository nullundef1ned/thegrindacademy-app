import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useAxios from '@/hooks/useAxios';
import { IPagination, ICoursePaginationParams, IUser } from '@/app/_module/app.interface';
import { ICourse, ICourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';

export default function AdminQueries() {
  const { data: user } = useFetchUser();

  const axiosHandler = useAxios();

  // const useFetchDashboardDataQuery = () => useQuery({
  //   queryKey: [user?.id, 'dashboard-data'],
  //   queryFn: async (): Promise<IDashboardData> => {
  //     const response = await axiosHandler.get(`/student/dashboard`)
  //     const dashboardData = response.data;
  //     return dashboardData;
  //   },
  //   refetchOnWindowFocus: false,
  //   refetchInterval: false,
  // })

  const useFetchCoursesQuery = (params?: ICoursePaginationParams) => useQuery({
    queryKey: [user?.id, 'courses', params?.status, params],
    queryFn: async (): Promise<IPagination<ICourse>> => {
      const response = await axiosHandler.get(`/admin/course`, { params })
      const enrolledCourses = response.data;
      return enrolledCourses;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchCourseDetailQuery = (courseSlug: string) => useQuery({
    queryKey: [user?.id, 'course', courseSlug],
    queryFn: async (): Promise<ICourseDetail> => {
      const response = await axiosHandler.get(`/admin/course/${courseSlug}`)
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchAuthenticationQuery = () => useQuery({
    queryKey: [user?.id, 'admin', 'authentication'],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get('/admin/auth')
      return response.data;
    },
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 10,
  })

  const useFetchSubscriptionQuery = () => useQuery({
    queryKey: [user?.id, 'subscription'],
    queryFn: async (): Promise<unknown> => {
      const response = await axiosHandler.get('/student/subscription')
      return response.data;
    },
    refetchInterval: 1000 * 60 * 10,
  })

  return {
    // useFetchDashboardDataQuery,
    useFetchCoursesQuery, useFetchCourseDetailQuery,
    useFetchAuthenticationQuery,
    useFetchSubscriptionQuery,
  }
}