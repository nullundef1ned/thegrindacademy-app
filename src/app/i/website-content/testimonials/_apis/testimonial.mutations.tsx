import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query.provder';
import { ITestimonial, ITestimonialForm, ITestimonialUpdateForm } from '@/interfaces/testimonial';

export default function useTestimonialMutations() {
  const axiosHandler = useAxios();

  const createTestimonialMutation = useMutation({
    mutationFn: async (payload: ITestimonialForm): Promise<ITestimonial> => {
      const response = await axiosHandler.post(`/admin/website-content/testimonial`, payload)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['testimonials'] })
    }
  })

  const updateTestimonialMutation = useMutation({
    mutationFn: async (payload: ITestimonialUpdateForm): Promise<ITestimonial> => {
      const { id, ...rest } = payload;
      const response = await axiosHandler.patch(`/admin/website-content/testimonial/${id}`, rest)
      return response.data;
    },
    onSettled: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: ['testimonial', context.id] })
      queryClient.refetchQueries({ queryKey: ['testimonials'] })
    }
  })

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string): Promise<ITestimonial> => {
      const response = await axiosHandler.delete(`/admin/website-content/testimonial/${id}`)
      return response.data;
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['testimonials'] })
    }
  })

  return {
    createTestimonialMutation,
    updateTestimonialMutation,
    deleteTestimonialMutation
  }
}