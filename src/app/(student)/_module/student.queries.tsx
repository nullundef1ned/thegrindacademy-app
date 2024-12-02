import { useAppStore } from '@/app/_module/app.store';
import { useQuery } from '@tanstack/react-query';
import { IBankDetails, IReferral } from './student.interface';
import useStudentHooks from './student.hooks';

export default function StudentQueries() {
  const user = useAppStore((state) => state.user);

  const { fetchReferral, fetchBankDetails } = useStudentHooks();

  const useFetchReferralQuery = () => useQuery({
    queryKey: [user?.id, 'referral'],
    queryFn: async (): Promise<IReferral> => fetchReferral(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const useFetchBankDetailsQuery = () => useQuery({
    queryKey: [user?.id, 'bank-details'],
    queryFn: async (): Promise<IBankDetails> => fetchBankDetails(),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  return { useFetchReferralQuery, useFetchBankDetailsQuery }
}
