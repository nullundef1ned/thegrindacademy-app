import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { IAccountInformationForm } from '@/app/_module/app.interface';

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

  return {
    updateAdminAccountInformationMutation
  }
}
