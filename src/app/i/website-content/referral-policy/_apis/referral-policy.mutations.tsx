import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IReferralPolicy, IReferralPolicyForm } from '@/interfaces/meta-information';

export default function useReferralPolicyMutations() {
  const axiosHandler = useAxios();

  const createOrUpdateReferralPolicyMutation = useMutation({
    mutationFn: async (payload: IReferralPolicyForm): Promise<IReferralPolicy> => {
      const response = await axiosHandler.post(`/admin/website-content/referral-policy`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['referral-policy'] })
    }
  })

  return {
    createOrUpdateReferralPolicyMutation,
  }
}