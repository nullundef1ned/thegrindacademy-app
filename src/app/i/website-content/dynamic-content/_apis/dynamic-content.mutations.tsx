import useAxios from '@/hooks/useAxios';
import { IDynamicContent, IDynamicContentUpdateForm } from '@/interfaces/dynamic-content';
import { useMutation } from '@tanstack/react-query';
import { IDynamicContentForm } from '@/interfaces/dynamic-content';
import { queryClient } from '@/providers/tanstack-query.provder';

export default function useDynamicContentMutations() {
  const axiosHandler = useAxios();

  const createDynamicContentMutation = useMutation({
    mutationFn: async (payload: IDynamicContentForm): Promise<IDynamicContent> => {
      const response = await axiosHandler.post(`/admin/website-content/dynamic-content`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['dynamic-content'] })
    }
  })

  const updateDynamicContentMutation = useMutation({
    mutationFn: async (payload: IDynamicContentUpdateForm): Promise<IDynamicContent> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/website-content/dynamic-content/${id}`, rest)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['dynamic-content'] })
    }
  })

  const deleteDynamicContentMutation = useMutation({
    mutationFn: async (id: string): Promise<IDynamicContent> => {
      const response = await axiosHandler.delete(`/admin/website-content/dynamic-content/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['dynamic-content'] })
    }
  })

  return {
    createDynamicContentMutation,
    updateDynamicContentMutation,
    deleteDynamicContentMutation
  }
}
