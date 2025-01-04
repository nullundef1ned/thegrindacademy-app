import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import useAffiliateMutations from '@/hooks/api/affiliate/useAffiliateMutations';
import { useFetchAffiliateReferralQuery } from '@/hooks/api/affiliate/useAffiliateReferral';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react'

export default function AffilicateCodeCustomizerModal() {
  const { data: referralCode } = useFetchAffiliateReferralQuery();

  const { hideModal } = useModal();
  const { updateAffiliateReferralCodeMutation } = useAffiliateMutations();

  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } = useFormik<{ code: string }>({
    initialValues: {
      code: referralCode?.code || '',
    },
    validationSchema: yup.object({
      code: yup.string().trim().matches(/^[a-zA-Z0-9]*$/, 'Only letters and numbers are allowed').min(3, 'Referral code must be at least 3 characters').required('Referral code is required'),
    }),
    onSubmit: (values) => {
      updateAffiliateReferralCodeMutation.mutate({ code: values.code }, {
        onSuccess: () => {
          hideModal()
          notificationUtil.success('Referral code updated successfully')
        }
      })
    }
  })

  const isPending = updateAffiliateReferralCodeMutation.isPending;

  return (
    <Modal title='Update Referral Code'>
      <p className='text-sm text-accent'>Create a custom referral code for your affiliate link.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input type='text' required
          placeholder='Referral Code'
          name='code'
          value={values.code}
          onChange={(e) => setFieldValue('code', e.target.value)}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <Button loading={isPending} disabled={isPending} type='submit'>Update Referral Code</Button>
      </form>
    </Modal>
  )
}
