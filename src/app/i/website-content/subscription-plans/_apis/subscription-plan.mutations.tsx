import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { ISubscriptionPlan } from '@/app/(student)/_module/student.interface';
import { ISubscriptionPlanForm, ISubscriptionPlanUpdateForm } from '@/interfaces/subscription';

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
      const response = await axiosHandler.patch(`/admin/website-content/subscription/plan/${id}`, rest)
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

  return {
    createSubscriptionPlanMutation,
    updateSubscriptionPlanMutation,
    deleteSubscriptionPlanMutation
  }
}