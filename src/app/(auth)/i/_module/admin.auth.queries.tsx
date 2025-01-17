import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export default function AdminAuthQueries() {
  const axiosHandler = useAxios();

  const useVerifyResetPasswordTokenQuery = (token: string) => useQuery({
    queryKey: ['verify-reset-password-token'],
    queryFn: () => axiosHandler.get(`/admin/auth/password/reset?token=${token}`),
  })

  return { useVerifyResetPasswordTokenQuery }
}
