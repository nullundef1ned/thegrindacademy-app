import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IMetaInformation, IMetaInformationForm } from '@/interfaces/meta-information';

export default function useMetaInformationMutations() {
  const axiosHandler = useAxios();

  const createOrUpdateMetaInformationMutation = useMutation({
    mutationFn: async (payload: IMetaInformationForm): Promise<IMetaInformation> => {
      const response = await axiosHandler.post(`/admin/website-content/meta`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['meta-information'] })
    }
  })

  return {
    createOrUpdateMetaInformationMutation,
  }
}