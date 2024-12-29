import useAxios from '@/hooks/useAxios';
import { IBankDetailCreationResponse, IBankDetailForm, IContactSupportForm, ISubscriptionForm, ISubscriptionRenewalResponse } from './student.interface';
import { useMutation } from '@tanstack/react-query';
import useAppHooks from '@/app/_module/app.hooks';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import { EnrolledCourseStatusType } from '@/app/_module/app.type';
import { ICompletionCertificate } from './_interfaces/course.interface';
import { queryClient } from '@/providers/tanstack-query.provder';

export default function useStudentMutations() {
  const axiosHandler = useAxios();

  const { resolveAccountNumber } = useAppHooks();

  const setupBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm): Promise<IBankDetailCreationResponse> => {
      const response = await axiosHandler.post('/student/bank-detail', values)
      return response.data
    }
  })

  const updateBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm) => {
      const response = await axiosHandler.put('/student/bank-detail', values)
      return response.data
    },
  })

  const resolveAccountNumberMutation = useMutation({
    mutationFn: async (values: { accountNumber: string, bankCode: string }) => {
      const response = await resolveAccountNumber(values.accountNumber, values.bankCode)
      return response
    },
  })

  const updateStudentAccountInformationMutation = useMutation({
    mutationFn: async (values: IAccountInformationForm) => {
      const response = await axiosHandler.patch('/student', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['user'] })
    }
  })

  const enrollCourseMutation = useMutation({
    mutationFn: async (values: { courseSlug: string }) => {
      const response = await axiosHandler.post(`/student/course/${values.courseSlug}/enroll`)
      return response.data
    },
  })

  const contactSupportMutation = useMutation({
    mutationFn: async (values: IContactSupportForm) => {
      const response = await axiosHandler.post('/student/support/contact', values)
      return response.data
    },
  })

  const createOrUpdateSubscriptionMutation = useMutation({
    mutationFn: async (values: ISubscriptionForm): Promise<ISubscriptionRenewalResponse> => {
      const response = await axiosHandler.post('/student/subscription', values)
      return response.data
    },
  })

  const updateLessonStatusMutation = useMutation({
    mutationFn: async (values: { courseSlug: string, lessonId: string, status: EnrolledCourseStatusType }) => {
      const response = await axiosHandler.patch(`/student/course/mine/${values.courseSlug}/lesson/${values.lessonId}`, { status: values.status })
      return response.data
    },
  })

  const downloadCertificateMutation = useMutation({
    mutationFn: async (values: { courseId: string }): Promise<ICompletionCertificate> => {
      const response = await axiosHandler.get(`/student/course/${values.courseId}/certificate`)
      return response.data
    },
  })

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosHandler.patch('/student/subscription/cancel')
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['subscription'] })
    }
  })

  const deleteStudentMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosHandler.delete('/student')
      return response.data
    },
  })

  return {
    setupBankDetailsMutation, updateBankDetailsMutation, resolveAccountNumberMutation, updateStudentAccountInformationMutation,
    enrollCourseMutation, downloadCertificateMutation, cancelSubscriptionMutation, deleteStudentMutation, contactSupportMutation,
    createOrUpdateSubscriptionMutation,
    updateLessonStatusMutation,
  }
}
