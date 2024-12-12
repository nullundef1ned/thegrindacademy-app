import { useAppStore } from '@/app/_module/app.store';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { IBankDetails, IDashboardData, IReferral, IStudentEnrolledCourse, ICourse, IStudentEnrolledCourseDetail, ICourseDetail } from './student.interface';
import useStudentHooks from './student.hooks';
import useAxios from '@/hooks/useAxios';
import { IPagination, ICoursePaginationParams } from '@/app/_module/app.interface';

export default function StudentQueries() {
  const user = useAppStore((state) => state.user);

  const axiosHandler = useAxios();

  const { fetchReferral, fetchBankDetails } = useStudentHooks();

  const useFetchDashboardDataQuery = () => useQuery({
    queryKey: [user?.id, 'dashboard-data'],
    queryFn: async (): Promise<IDashboardData> => {
      const response = await axiosHandler.get(`/student/dashboard`)
      const dashboardData = response.data;
      return dashboardData;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchEnrolledCoursesQuery = (params: ICoursePaginationParams) => useQuery({
    queryKey: [user?.id, 'enrolled-courses', params.status, params],
    queryFn: async (): Promise<IPagination<IStudentEnrolledCourse>> => {
      const response = await axiosHandler.get(`/student/course/mine`, { params })
      const enrolledCourses = response.data;
      return enrolledCourses;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchEnrolledCourseDetailQuery = (courseSlug: string) => useQuery({
    queryKey: [user?.id, 'enrolled-course', courseSlug],
    queryFn: async (): Promise<IStudentEnrolledCourseDetail> => {
      const response = await axiosHandler.get(`/student/course/mine/${courseSlug}`)
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchCoursesQuery = (params?: ICoursePaginationParams) => useQuery({
    queryKey: [user?.id, 'courses', params?.status, params],
    queryFn: async (): Promise<IPagination<ICourse>> => {
      const response = await axiosHandler.get(`/student/course/browse`, { params })
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
      const response = await axiosHandler.get(`/student/course/browse/${courseSlug}`)
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchReferralQuery = () => useQuery({
    queryKey: [user?.id, 'referral'],
    queryFn: async (): Promise<IReferral> => fetchReferral(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchBankDetailsQuery = () => useQuery({
    queryKey: [user?.id, 'bank-details'],
    queryFn: async (): Promise<IBankDetails> => fetchBankDetails(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })


  return {
    useFetchReferralQuery, useFetchBankDetailsQuery, useFetchDashboardDataQuery,
    useFetchEnrolledCoursesQuery, useFetchEnrolledCourseDetailQuery,
    useFetchCoursesQuery, useFetchCourseDetailQuery,
  }
}
