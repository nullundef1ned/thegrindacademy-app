import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import { IUserStatusUpdate, IUserTelegramUpdate } from './_interfaces/user.interface';
import { IResourceUpload } from './_interfaces/resource.interface';

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

  const updateUserTelegramMutation = useMutation({
    mutationFn: async (values: IUserTelegramUpdate) => {
      const { id, ...payload } = values;
      const response = await axiosHandler.patch(`/admin/user/${id}/telegram`, payload)
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['user', context.id] })
      queryClient.refetchQueries({ queryKey: ['users'] })
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

  const updateAffiliateTelegramMutation = useMutation({
    mutationFn: async (values: IUserTelegramUpdate) => {
      const { id, ...payload } = values;
      const response = await axiosHandler.patch(`/admin/affiliate/${id}/telegram`, payload)
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['affiliate', context.id] })
      queryClient.refetchQueries({ queryKey: ['affiliates'] })
    }
  })

  const uploadResourceMutation = useMutation({
    mutationFn: async (values: IResourceUpload) => {
      const response = await axiosHandler.post('/admin/resource', values)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['resources'] })
    }
  })

  const updateAffiliateStatusMutation = useMutation({
    mutationFn: async (values: IUserStatusUpdate) => {
      const payload = { status: values.status, reason: values.reason };
      if (!values.reason) delete payload.reason;
      const response = await axiosHandler.patch(`/admin/affiliate/${values.id}`, payload)
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['affiliate', context.id] })
      queryClient.refetchQueries({ queryKey: ['affiliates'] })
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

  const deleteResourceMutation = useMutation({
    mutationFn: async (value: string) => {
      const response = await axiosHandler.delete(`/admin/resource/${value}`)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['resources'] })
    }
  })

  const deleteAffiliateMutation = useMutation({
    mutationFn: async (value: string) => {
      const response = await axiosHandler.delete(`/admin/affiliate/${value}`)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['affiliates'] })
    }
  })

  return {
    updateAdminAccountInformationMutation,
    updateUserTelegramMutation,
    updateUserStatusMutation,
    uploadResourceMutation,
    deleteUserMutation,
    updateAffiliateTelegramMutation,
    updateAffiliateStatusMutation,
    deleteAffiliateMutation,
    deleteResourceMutation
  }
}