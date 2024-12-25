import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { ISubscriptionPlan, ISubscriptionPlanFeature } from '@/app/(student)/_module/student.interface';
import { ISubscriptionPlanFeatureForm, ISubscriptionPlanFeatureUpdateForm, ISubscriptionPlanForm, ISubscriptionPlanUpdateForm } from '@/interfaces/subscription';

export default function useSubscriptionPlanMutations() {
  const axiosHandler = useAxios();

  const createSubscriptionPlanMutation = useMutation({
    mutationFn: async (payload: ISubscriptionPlanForm): Promise<ISubscriptionPlan> => {
      const response = await axiosHandler.post(`/admin/website-content/subscription/plan`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['subscription-plans'] })
    }
  })

  const updateSubscriptionPlanMutation = useMutation({
    mutationFn: async (payload: ISubscriptionPlanUpdateForm): Promise<ISubscriptionPlan> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.put(`/admin/website-content/subscription/plan/${id}`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['subscription-plan', context.id] })
      queryClient.refetchQueries({ queryKey: ['subscription-plans'] })
    }
  })

  const deleteSubscriptionPlanMutation = useMutation({
    mutationFn: async (id: string): Promise<ISubscriptionPlan> => {
      const response = await axiosHandler.delete(`/admin/website-content/subscription/plan/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['subscription-plans'] })
    }
  })

  const createPlanFeatureMutation = useMutation({
    mutationFn: async (payload: ISubscriptionPlanFeatureForm): Promise<ISubscriptionPlanFeature> => {
      const response = await axiosHandler.post(`/admin/website-content/subscription/feature`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['plan-features'] })
    }
  })

  const updatePlanFeatureMutation = useMutation({
    mutationFn: async (payload: ISubscriptionPlanFeatureUpdateForm): Promise<ISubscriptionPlanFeature> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.put(`/admin/website-content/subscription/feature/${id}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['plan-features'] })
    }
  })

  const deletePlanFeatureMutation = useMutation({
    mutationFn: async (id: string): Promise<ISubscriptionPlanFeature> => {
      const response = await axiosHandler.delete(`/admin/website-content/subscription/feature/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['plan-features'] })
    }
  })

  return {
    createSubscriptionPlanMutation,
    updateSubscriptionPlanMutation,
    deleteSubscriptionPlanMutation,
    createPlanFeatureMutation,
    updatePlanFeatureMutation,
    deletePlanFeatureMutation
  }
}