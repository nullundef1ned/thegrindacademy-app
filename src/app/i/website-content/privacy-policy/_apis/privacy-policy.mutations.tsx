import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IPrivacyPolicy, IPrivacyPolicyForm } from '@/interfaces/meta-information';

export default function usePrivacyPolicyMutations() {
  const axiosHandler = useAxios();

  const createOrUpdatePrivacyPolicyMutation = useMutation({
    mutationFn: async (payload: IPrivacyPolicyForm): Promise<IPrivacyPolicy> => {
      const response = await axiosHandler.post(`/admin/website-content/privacy-policy`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['privacy-policy'] })
    }
  })

  return {
    createOrUpdatePrivacyPolicyMutation,
  }
}