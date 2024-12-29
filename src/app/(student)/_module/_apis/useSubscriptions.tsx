import { useQuery } from "@tanstack/react-query";
import { ISubscriptionRenewalResponse } from "../student.interface";
import useAxios from "@/hooks/useAxios";

export const useFetchSubscriptionByReferenceQuery = (reference: string) => {
  const axiosHandler = useAxios();

  return useQuery({
    queryKey: ['subscription-by-reference', reference],
    queryFn: async (): Promise<ISubscriptionRenewalResponse> => {
      const response = await axiosHandler.get(`/website-content/subscription/status/${reference}`)
      return response.data;
    },
  })
}