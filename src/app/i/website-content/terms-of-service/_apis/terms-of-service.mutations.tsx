import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { ITermsOfService, ITermsOfServiceForm } from '@/interfaces/meta-information';

export default function useTermsOfServiceMutations() {
  const axiosHandler = useAxios();

  const createOrUpdateTermsOfServiceMutation = useMutation({
    mutationFn: async (payload: ITermsOfServiceForm): Promise<ITermsOfService> => {
      const response = await axiosHandler.post(`/admin/website-content/terms-and-conditions`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['terms-of-service'] })
    }
  })

  return {
    createOrUpdateTermsOfServiceMutation,
  }
}