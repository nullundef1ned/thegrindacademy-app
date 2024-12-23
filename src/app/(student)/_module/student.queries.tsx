import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { IBankDetails, IDashboardData, IPayout, IReferral, IReferralStatistics, ISubscriptionResponse } from './student.interface';
import useStudentHooks from './student.hooks';
import useAxios from '@/hooks/useAxios';
import { IPagination, ICoursePaginationParams, IUser, IPaginationParams } from '@/app/_module/app.interface';
import { ICourse, ICourseDetail, IEnrolledCourse, IEnrolledCourseDetail } from './_interfaces/course.interface';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import { IFAQ } from '@/interfaces/faq';

export default function StudentQueries() {
  const { data: user } = useFetchUser()

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
    queryFn: async (): Promise<IPagination<IEnrolledCourse>> => {
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
    queryFn: async (): Promise<IEnrolledCourseDetail> => {
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

  const useFetchPayoutsQuery = (params?: IPaginationParams) => useQuery({
    queryKey: [user?.id, 'payouts', params],
    queryFn: async (): Promise<IPagination<IPayout>> => {
      const response = await axiosHandler.get(`/student/referral/payout`, { params })
      return response.data;
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

  const useFetchAuthenticationQuery = () => useQuery({
    queryKey: [user?.id, 'authentication'],
    queryFn: async (): Promise<IUser> => {
      const response = await axiosHandler.get('/student/auth')
      return response.data;
    },
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 10,
  })

  const useFetchSubscriptionQuery = () => useQuery({
    queryKey: [user?.id, 'subscription'],
    queryFn: async (): Promise<ISubscriptionResponse> => {
      const response = await axiosHandler.get('/student/subscription')
      return response.data;
    },
    refetchInterval: 1000 * 60 * 10,
  })

  const useFetchFAQsQuery = () => useQuery({
    queryKey: [user?.id, 'faqs'],
    queryFn: async (): Promise<IFAQ[]> => {
      const response = await axiosHandler.get(`/student/support/faq`)
      return response.data;
    },
  })

  const useFetchReferralStatisticsQuery = () => useQuery({
    queryKey: [user?.id, 'referral-statistics'],
    queryFn: async (): Promise<IReferralStatistics> => {
      const response = await axiosHandler.get(`/student/referral/dashboard`)
      return response.data;
    },
  })

  return {
    useFetchReferralQuery, useFetchBankDetailsQuery, useFetchDashboardDataQuery,
    useFetchPayoutsQuery, useFetchReferralStatisticsQuery, useFetchFAQsQuery,
    useFetchEnrolledCoursesQuery, useFetchEnrolledCourseDetailQuery,
    useFetchCoursesQuery, useFetchCourseDetailQuery,
    useFetchAuthenticationQuery,
    useFetchSubscriptionQuery,
  }
}