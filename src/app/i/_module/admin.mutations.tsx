import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import { IUserStatusUpdate } from './_interfaces/user.interface';

export default function useAdminMutations() {
  const axiosHandler = useAxios();

  const updateAdminAccountInformationMutation = useMutation({
    mutationFn: async (values: Partial<IAccountInformationForm>) => {
      const response = await axiosHandler.patch('/admin', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['user'] })
    }
  })

  const updateUserStatusMutation = useMutation({
    mutationFn: async (values: IUserStatusUpdate) => {
      const payload = { status: values.status, reason: values.reason };
      if (!values.reason) delete payload.reason;
      const response = await axiosHandler.patch(`/admin/user/${values.id}`, payload)
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['user', context.id] })
      queryClient.refetchQueries({ queryKey: ['users'] })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: async (value: string) => {
      const response = await axiosHandler.delete(`/admin/user/${value}`)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['users'] })
    }
  })

  return {
    updateAdminAccountInformationMutation,
    updateUserStatusMutation,
    deleteUserMutation
  }
}
