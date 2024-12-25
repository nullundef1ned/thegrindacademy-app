import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { ISubscriptionPlanFeature } from "@/app/(student)/_module/student.interface";

export function useFetchPlanFeatures() {
  const axiosHandler = useAxios();

  const query = useQuery({
    queryKey: ['plan-features'],
    queryFn: async (): Promise<ISubscriptionPlanFeature[]> => {
      const response = await axiosHandler.get('/admin/website-content/subscription/feature')
      return response.data;
    },
  })

  return query;
}