import useAxios from '@/hooks/useAxios';
import { IBankDetailCreationResponse, IBankDetailForm, IStudentAccountInformationForm } from './student.interface';
import { useMutation } from '@tanstack/react-query';
import useAppHooks from '@/app/_module/app.hooks';
import { IUser } from '@/app/_module/app.interface';
import { useAppStore } from '@/app/_module/app.store';

export default function useStudentMutations() {
  const axiosHandler = useAxios();
  const setUser = useAppStore(state => state.setUser);

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

  const updateStudentAccountInformationMutation = useMutation({
    mutationFn: async (values: IStudentAccountInformationForm) => {
      const response = await axiosHandler.patch('/student', values)
      return response.data
    },
    onSuccess: (data: IUser) => {
      setUser(data)
    }
  })

  return { setupBankDetailsMutation, updateBankDetailsMutation, resolveAccountNumberMutation, updateStudentAccountInformationMutation }
}
