import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAccountInformationForm, IPagination } from '@/app/_module/app.interface';
import { IUserStatusUpdate, IUserTelegramUpdate } from './_interfaces/user.interface';
import { AffiliateResourceType, IAffiliateResourceForm, IAffiliateTelegramCommunityUpdate, ISendTelegramMessage } from './_interfaces/affiliate.interface';
import helperUtil from '@/utils/helper.util';
import notificationUtil from '@/utils/notification.util';
import { IUserForm, IUserSubscriptionPlanCreate, IUserSubscriptionPlanUpdate } from '@/interfaces/user';
import { ISubscription } from '@/app/(student)/_module/student.interface';

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

  const registerUserMutation = useMutation({
    mutationFn: async (values: IUserForm) => {
      const response = await axiosHandler.post('/admin/user/register', values)
      return response.data
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['users'] })
    }
  })

  const fetchUserSubscriptionPlansMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosHandler.get<IPagination<ISubscription>>(`/admin/user/${userId}/subscription`)
      return response.data
    }
  })

  const createUserSubscriptionPlanMutation = useMutation({
    mutationFn: async (values: IUserSubscriptionPlanCreate) => {
      const { userId, startDate, ...payload } = values;
      // Append the current time to the provided startDate
      const date = new Date(startDate!);
      const now = new Date();
      date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      const adjustedStartDate = date.toISOString();
      const response = await axiosHandler.post(`/admin/user/${userId}/subscription`, { ...payload, startDate: adjustedStartDate });
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['user', context.userId] })
      queryClient.refetchQueries({ queryKey: ['users'] })
    }
  })

  const updateUserSubscriptionPlanMutation = useMutation({
    mutationFn: async (values: IUserSubscriptionPlanUpdate) => {
      const { userId, subscriptionId, ...payload } = values;
      if (payload.status === 'active' && values.startDate) {
        const date = new Date(values.startDate);
        const now = new Date();
        date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        const adjustedStartDate = date.toISOString();
        payload.startDate = adjustedStartDate;
      }
      const response = await axiosHandler.patch(`/admin/user/${userId}/subscription/${subscriptionId}`, payload)
      return response.data
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['user', context.userId] })
      queryClient.refetchQueries({ queryKey: ['users'] })
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

  const exportUsersMutation = useMutation({
    mutationFn: async (): Promise<string> => {
      return (await axiosHandler.get('/admin/report/user/export/csv')) as string
    },
    onSuccess: (data) => {
      notificationUtil.success('Users exported successfully')
      const url = URL.createObjectURL(new Blob([data]))
      helperUtil.downloadFile(url, 'The Grind Academy Users.csv')
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
    registerUserMutation,
    fetchUserSubscriptionPlansMutation,
    createUserSubscriptionPlanMutation,
    updateUserSubscriptionPlanMutation,
    updateUserTelegramMutation,
    updateUserStatusMutation,
    deleteUserMutation,
    updateAffiliateTelegramMutation,
    updateAffiliateStatusMutation,
    deleteAffiliateMutation,
    deleteAffiliateResourceMutation,
    exportUsersMutation
  }
}
