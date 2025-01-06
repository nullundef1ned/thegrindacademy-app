import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import { IUserStatusUpdate, IUserTelegramUpdate } from './_interfaces/user.interface';
import { AffiliateResourceType, IAffiliateResourceForm, IAffiliateTelegramCommunityUpdate, ISendTelegramMessage } from './_interfaces/affiliate.interface';

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

  const sendTelegramMessageMutation = useMutation({
    mutationFn: async (values: ISendTelegramMessage) => {
      const response = await axiosHandler.post(`/admin/course/telegram/broadcast`, values)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['resources'] })
    }
  })

  const createAffiliateResourceMutation = useMutation({
    mutationFn: async (values: IAffiliateResourceForm) => {
      if (values.type === AffiliateResourceType.MESSAGE) delete values.url;
      const response = await axiosHandler.post(`/admin/affiliate/community/resource`, values)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['resources'] })
    }
  })

  const deleteAffiliateResourceMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await axiosHandler.delete(`/admin/affiliate/community/resource/${resourceId}`)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['resources'] })
    }
  })

  const createOrUpdateAffiliateTelegramCommunityMutation = useMutation({
    mutationFn: async (values: IAffiliateTelegramCommunityUpdate) => {
      const response = await axiosHandler.post(`/admin/affiliate/community`, values)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['affiliate-telegram-community'] })
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
    sendTelegramMessageMutation,
    createAffiliateResourceMutation,
    createOrUpdateAffiliateTelegramCommunityMutation,
    updateAdminAccountInformationMutation,
    updateUserTelegramMutation,
    updateUserStatusMutation,
    deleteUserMutation,
    updateAffiliateTelegramMutation,
    updateAffiliateStatusMutation,
    deleteAffiliateMutation,
    deleteAffiliateResourceMutation
  }
}
