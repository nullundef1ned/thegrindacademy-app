import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export const useVerifyResetPasswordTokenQuery = (token: string) => {
  const axiosHandler = useAxios();
  const query = useQuery({
    queryKey: ['verify-affiliate-reset-password-token'],
    queryFn: () => axiosHandler.get(`/student/auth/password/reset?token=${token}`),
  })

  return query;
}
