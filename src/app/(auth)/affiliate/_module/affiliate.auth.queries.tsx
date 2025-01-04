import { IAuthResponse } from '@/app/_module/app.interface';
import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export const useVerifyResetPasswordTokenQuery = (token: string) => {
  const axiosHandler = useAxios();
  const query = useQuery({
    queryKey: ['verify-affiliate-reset-password-token'],
    queryFn: async (): Promise<void> => {
      await axiosHandler.post(`/affiliate/auth/password/reset?token=${token}`)
    },
  })

  return query;
}

export const useVerifyAffiliateAccountQuery = (token: string) => {
  const axiosHandler = useAxios();
  const query = useQuery({
    queryKey: ['verify-affiliate-account-token'],
    queryFn: async (): Promise<IAuthResponse> => {
      const response = await axiosHandler.post(`/affiliate/account-verification?token=${token}`)
      return response.data
    },
  })

  return query;
}