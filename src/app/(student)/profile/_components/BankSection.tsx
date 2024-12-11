import React, { Fragment, useState } from 'react'
import ProfileSection from './ProfileSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import ReferralCodeCard from '../../(overview)/_components/ReferralCodeCard';
import { useStudentStore } from '../../_module/student.store';
import { useFormik } from 'formik';
import { IBankDetailForm } from '../../_module/student.interface';
import useStudentMutations from '../../_module/student.mutations';
import { useQuery } from '@tanstack/react-query';
import useAppHooks from '@/app/_module/app.hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import notificationUtil from '@/utils/notification.util';
import StudentQueries from '../../_module/student.queries';

export default function SecuritySection() {
  const bankDetails = useStudentStore(state => state.bankDetails);
  const referralCode = useStudentStore(state => state.referral?.code);
  const setBankDetails = useStudentStore(state => state.setBankDetails);
  const setReferral = useStudentStore(state => state.setReferral);

  const [accountHolderName, setAccountHolderName] = useState<string>(bankDetails?.accountName || '');

  const { getBanks } = useAppHooks();
  const { useFetchReferralQuery, useFetchBankDetailsQuery } = StudentQueries();

  useFetchReferralQuery();
  useFetchBankDetailsQuery();

  const { data, isLoading: isLoadingBanks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  const { setupBankDetailsMutation, updateBankDetailsMutation, resolveAccountNumberMutation } = useStudentMutations();

  const banks = data || [];
  const isLoading = setupBankDetailsMutation.isPending || updateBankDetailsMutation.isPending;

  const { values, handleSubmit, setFieldValue } = useFormik<IBankDetailForm>({
    initialValues: {
      bankCode: bankDetails?.bankCode || '',
      bankName: bankDetails?.bankName || '',
      accountNumber: bankDetails?.accountNumber || ''
    },
    onSubmit: (values) => {
      if (bankDetails) {
        updateBankDetailsMutation.mutate(values)
      } else {
        setupBankDetailsMutation.mutate(values, {
          onSuccess: ((data) => {
            setReferral(data.referralCode);
            setBankDetails(data.bankDetail);
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
          <ReferralCodeCard />
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
