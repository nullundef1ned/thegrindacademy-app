import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ITestimonial } from "@/interfaces/testimonial";

export function useFetchTestimonial(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['testimonial', id],
    queryFn: async (): Promise<ITestimonial | null> => {
      const response = await axiosHandler.get(`/admin/website-content/testimonial/${id}`)
      return response.data;
    },
  })

  return query;
}