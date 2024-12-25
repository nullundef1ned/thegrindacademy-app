import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ISubscriptionPlan } from "@/app/(student)/_module/student.interface";

export function useFetchSubscriptionPlans() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async (): Promise<ISubscriptionPlan[]> => {
      const response = await axiosHandler.get('/admin/website-content/subscription/plan')
      return response.data;
    },
  })

  return query;
}