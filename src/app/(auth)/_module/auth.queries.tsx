import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export default function AuthQueries() {
  const axiosHandler = useAxios();

  const useVerifyAccountSetupTokenQuery = (token: string) => useQuery({
    queryKey: ['verify-account-setup-token'],
    queryFn: () => axiosHandler.get(`/student/account-setup?token=${token}`),
  })

  const useVerifyResetPasswordTokenQuery = (token: string) => useQuery({
    queryKey: ['verify-reset-password-token'],
    queryFn: () => axiosHandler.get(`/student/auth/password/reset?token=${token}`),
  })

  return { useVerifyAccountSetupTokenQuery, useVerifyResetPasswordTokenQuery }
}
