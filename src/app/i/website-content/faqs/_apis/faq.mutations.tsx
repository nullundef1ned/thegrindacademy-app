import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IFAQ, IFAQForm, IFAQUpdateForm } from '@/interfaces/faq';

export default function useFAQMutations() {
  const axiosHandler = useAxios();

  const createFAQMutation = useMutation({
    mutationFn: async (payload: IFAQForm): Promise<IFAQ> => {
      const response = await axiosHandler.post(`/admin/website-content/faq`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['faqs'] })
    }
  })

  const updateFAQMutation = useMutation({
    mutationFn: async (payload: IFAQUpdateForm): Promise<IFAQ> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/website-content/faq/${id}`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['faq', context.id] })
      queryClient.refetchQueries({ queryKey: ['faqs'] })
    }
  })

  const deleteFAQMutation = useMutation({
    mutationFn: async (id: string): Promise<IFAQ> => {
      const response = await axiosHandler.delete(`/admin/website-content/faq/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['faqs'] })
    }
  })

  return {
    createFAQMutation,
    updateFAQMutation,
    deleteFAQMutation
  }
}