import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ISubscriptionPlan } from "@/app/(student)/_module/student.interface";

export function useFetchSubscriptionPlan(id: string) {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['subscription-plan', id],
    queryFn: async (): Promise<ISubscriptionPlan | null> => {
      if (id === 'new') return null;
      const response = await axiosHandler.get(`/admin/website-content/subscription/plan/${id}`)
      return response.data;
    },
  })

  return query;
}