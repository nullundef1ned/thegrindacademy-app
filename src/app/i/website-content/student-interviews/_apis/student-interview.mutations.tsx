import useAxios from '@/hooks/useAxios';
import { IStudentInterview, IStudentInterviewUpdateForm } from '@/interfaces/student-interview';
import { IStudentInterviewForm } from '@/interfaces/student-interview';
import { queryClient } from '@/providers/tanstack-query.provder';
import { useMutation } from '@tanstack/react-query';

export default function useStudentInterviewMutations() {
  const axiosHandler = useAxios();

  const createStudentInterviewMutation = useMutation({
    mutationFn: async (payload: IStudentInterviewForm): Promise<IStudentInterview> => {
      const response = await axiosHandler.post(`/admin/website-content/student-interview`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['student-interviews'] })
    }
  })

  const updateStudentInterviewMutation = useMutation({
    mutationFn: async (payload: IStudentInterviewUpdateForm): Promise<IStudentInterview> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/website-content/student-interview/${id}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['student-interviews'] })
    }
  })

  const deleteStudentInterviewMutation = useMutation({
    mutationFn: async (id: string): Promise<IStudentInterview> => {
      const response = await axiosHandler.delete(`/admin/website-content/student-interview/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['student-interviews'] })
    }
  })

  return {
    createStudentInterviewMutation,
    updateStudentInterviewMutation,
    deleteStudentInterviewMutation
  }
}
