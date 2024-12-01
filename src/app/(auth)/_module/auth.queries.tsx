import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export default function useAuthQueries() {
  const axiosHandler = useAxios();

  const verifyTokenQuery = (token: string) => useQuery({
    queryKey: ['verify-token'],
    queryFn: () => axiosHandler.get(`/student/account-setup?token=${token}`),
  })

  const verifyResetPasswordTokenQuery = (token: string) => useQuery({
    queryKey: ['verify-reset-password-token'],
    queryFn: () => axiosHandler.get(`/student/auth/password/reset?token=${token}`),
  })

  return { verifyTokenQuery, verifyResetPasswordTokenQuery }
}
