import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IInfluencer, IInfluencerForm } from '@/interfaces/influencer';

export default function useInfluencerMutations() {
  const axiosHandler = useAxios();

  const createOrUpdateInfluencerMutation = useMutation({
    mutationFn: async (payload: IInfluencerForm): Promise<IInfluencer> => {
      const response = await axiosHandler.post(`/admin/website-content/influencer`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['influencer'] })
    }
  })

  const deleteInfluencerMutation = useMutation({
    mutationFn: async (): Promise<IInfluencer> => {
      const response = await axiosHandler.delete("/admin/website-content/influencer")
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['influencer'] })
    }
  })

  return {
    createOrUpdateInfluencerMutation,
    deleteInfluencerMutation
  }
}