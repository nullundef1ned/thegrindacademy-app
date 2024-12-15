import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ITestimonial } from "@/interfaces/testimonial";

export function useFetchTestimonials() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['testimonials'],
    queryFn: async (): Promise<ITestimonial[]> => {
      const response = await axiosHandler.get('/admin/website-content/testimonial')
      return response.data;
    },
  })

  return query;
}