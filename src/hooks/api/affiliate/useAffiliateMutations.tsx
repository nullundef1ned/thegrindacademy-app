import { PasswordForm } from '@/app/(auth)/_module/auth.interface';
import { IBankDetailCreationResponse } from '@/app/(student)/_module/student.interface';
import { IBankDetailForm } from '@/app/(student)/_module/student.interface';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import useAppHooks from '@/app/_module/app.hooks';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import { IMailMarketingForm } from '@/app/affiliate/_module/affiliate.interface';
import useAxios from '@/hooks/useAxios';
import { queryClient } from '@/providers/tanstack-query.provder';
import { useMutation } from '@tanstack/react-query';

export default function useAffiliateMutations() {
  const axiosHandler = useAxios();
  const { data: user } = useFetchUser();
  const { resolveAccountNumber } = useAppHooks();

  const setupAffiliateBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm): Promise<IBankDetailCreationResponse> => {
      const response = await axiosHandler.post('/affiliate/bank-detail', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'referral'] })
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'bank-details'] })
    }
  })

  const updateAffiliateBankDetailsMutation = useMutation({
    mutationFn: async (values: IBankDetailForm) => {
      const response = await axiosHandler.put('/affiliate/bank-detail', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'referral'] })
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'bank-details'] })
    }
  })

  const updateAffiliateAccountInformationMutation = useMutation({
    mutationFn: async (values: IAccountInformationForm) => {
      const response = await axiosHandler.patch('/affiliate', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['user'] })
    }
  })

  const resolveAccountNumberMutation = useMutation({
    mutationFn: async (values: { accountNumber: string, bankCode: string }) => {
      const response = await resolveAccountNumber(values.accountNumber, values.bankCode)
      return response
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'bank-details'], })
    }
  })

  const updateAffiliateReferralCodeMutation = useMutation({
    mutationFn: async (payload: { code: string }) => {
      const response = await axiosHandler.patch('/affiliate/referral/code', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'referral'] })
    }
  })

  const sendMailMarketingMutation = useMutation({
    mutationFn: async (payload: IMailMarketingForm) => {
      const response = await axiosHandler.post('/affiliate/mail-marketing', payload)
      return response.data
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: async (values: PasswordForm) => {
      const response = await axiosHandler.patch('/affiliate/auth/password/change', values)
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'authentication'] })
    }
  })

  const deleteAffiliateMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosHandler.delete('/affiliate')
      return response.data
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [user?.id, 'affiliate', 'authentication'] })
    }
  })

  return {
    setupAffiliateBankDetailsMutation,
    updateAffiliateBankDetailsMutation,
    updateAffiliateAccountInformationMutation,
    resolveAccountNumberMutation,
    deleteAffiliateMutation,
    changePasswordMutation,
    updateAffiliateReferralCodeMutation,
    sendMailMarketingMutation
  }
}
