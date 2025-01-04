import React, { Fragment, useState } from 'react'
import ProfileSection from '../../../../components/ProfileSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import useAppHooks from '@/app/_module/app.hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import notificationUtil from '@/utils/notification.util';
import useAffiliateMutations from '@/hooks/api/affiliate/useAffiliateMutations';
import { IBankDetailForm } from '@/app/(student)/_module/student.interface';
import { useFetchAffiliateReferralQuery } from '@/hooks/api/affiliate/useAffiliateReferral';
import { useFetchAffiliateBankDetailsQuery } from '@/hooks/api/affiliate/useAffiliateBank';
import AffiliateReferralCodeCard from '../../_components/AffiliateReferralCodeCard';

export default function SecuritySection() {
  const { getBanks } = useAppHooks();
  const { setupAffiliateBankDetailsMutation, updateAffiliateBankDetailsMutation, resolveAccountNumberMutation } = useAffiliateMutations()

  const { data: referralCode } = useFetchAffiliateReferralQuery();
  const { data: bankDetails } = useFetchAffiliateBankDetailsQuery();

  const [accountHolderName, setAccountHolderName] = useState<string>(bankDetails?.accountName || '');

  const { data, isLoading: isLoadingBanks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  const banks = data || [];
  const isLoading = setupAffiliateBankDetailsMutation.isPending || updateAffiliateBankDetailsMutation.isPending;

  const { values, handleSubmit, setFieldValue } = useFormik<IBankDetailForm>({
    enableReinitialize: true,
    initialValues: {
      bankCode: bankDetails?.bankCode || '',
      bankName: bankDetails?.bankName || '',
      accountNumber: bankDetails?.accountNumber || ''
    },
    onSubmit: (values) => {
      if (bankDetails) {
        updateAffiliateBankDetailsMutation.mutate(values)
      } else {
        setupAffiliateBankDetailsMutation.mutate(values, {
          onSuccess: (() => {
            notificationUtil.success("Bank details setup successfully, your referral code is now available")
          })
        })
      }
    }
  })

  const updateAccountNumber = (accountNumber: string) => {
    setFieldValue('accountNumber', accountNumber)
    if (accountNumber.length === 10) {
      resolveAccountNumberMutation.mutate({ accountNumber, bankCode: values.bankCode }, {
        onSuccess: (data) => {
          setAccountHolderName(data.account_name)
        },
        onError: () => {
          setAccountHolderName('Error resolving account number')
        }
      })
    }
  }

  return (
    <ProfileSection id='bank-information' title='Bank Information' description='Update your bank information'>
      <div className='flex flex-col gap-10 w-full'>
        {referralCode && <Fragment>
          <AffiliateReferralCodeCard />
          <hr className='border-b border-[#B0CAFF1A]' />
        </Fragment>}
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
          <Select
            defaultValue={values.bankName}
            onValueChange={(value) => {
              const bank = banks.find(bank => bank.name === value);
              setFieldValue('bankCode', bank?.code);
              setFieldValue('bankName', bank?.name);
            }}>
            <SelectTrigger loading={isLoadingBanks}>
              <SelectValue placeholder='Select Bank' />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank, index) =>
                <SelectItem key={index} value={bank.name}>{bank.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input type='text' placeholder='Bank Account Number' name='accountNumber' value={values.accountNumber} onChange={(e) => updateAccountNumber(e.target.value)} />
          <Input disabled className="col-span-2" type='text' placeholder='Account Holder Name' value={resolveAccountNumberMutation.isPending ? 'Resolving...' : accountHolderName} />
          <Button loading={isLoading} disabled={resolveAccountNumberMutation.isPending || resolveAccountNumberMutation.isError || values.accountNumber.length !== 10} className='w-full col-span-2' variant='outline'>
            {bankDetails ? 'Update Bank Information' : 'Add Bank Information'}
          </Button>
        </form>
      </div>
    </ProfileSection>
  )
}
