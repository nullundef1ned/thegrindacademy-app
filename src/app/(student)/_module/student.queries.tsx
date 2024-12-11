import { useAppStore } from '@/app/_module/app.store';
import { useQuery } from '@tanstack/react-query';
import { IBankDetails, IDashboardData, IReferral, IStudentEnrolledCourse } from './student.interface';
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

  return { useFetchReferralQuery, useFetchBankDetailsQuery, useFetchDashboardDataQuery, useFetchEnrolledCoursesQuery }
}
