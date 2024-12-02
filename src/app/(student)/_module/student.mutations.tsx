import useAxios from '@/hooks/useAxios';
import { IBankDetailCreationResponse, IBankDetailForm } from './student.interface';
import { useMutation } from '@tanstack/react-query';
import useAppHooks from '@/app/_module/app.hooks';

export default function useStudentMutations() {
  const axiosHandler = useAxios();

  const { resolveAccountNumber } = useAppHooks();

  const setupBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm): Promise<IBankDetailCreationResponse> => {
      const response = await axiosHandler.post('/student/bank-detail', values)
      return response.data
    }
  })

  const updateBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm) => {
      const response = await axiosHandler.put('/student/bank-detail', values)
      return response.data
    },
  })

  const resolveAccountNumberMutation = useMutation({
    mutationFn: async (values: { accountNumber: string, bankCode: string }) => {
      const response = await resolveAccountNumber(values.accountNumber, values.bankCode)
      return response
    },
  })

  return { setupBankDetailsMutation, updateBankDetailsMutation, resolveAccountNumberMutation }
}
