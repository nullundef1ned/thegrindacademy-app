import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import { IAccountInformationForm } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useFormik } from 'formik';
import React from 'react'

export default function AccountInformationModal() {
  const { data: user } = useFetchUser();

  const { hideModal } = useModal();
  const { updateAdminAccountInformationMutation } = useAdminMutations();

  const { values, handleSubmit, setFieldValue } = useFormik<IAccountInformationForm>({
    initialValues: {
      info: {
        firstName: user?.info.firstName || '',
        lastName: user?.info.lastName || '',
        telegramUserName: user?.info.telegramUserName || '',
        phoneNumber: user?.info.phoneNumber || '',
        avi: user?.info.avi || '',
      }
    },
    onSubmit: (values) => {
      updateAdminAccountInformationMutation.mutate(values, {
        onSuccess: () => {
          hideModal()
          notificationUtil.success('Account information updated successfully')
        }
      })
    }
  })

  const isPending = updateAdminAccountInformationMutation.isPending;

  return (
    <Modal title='Update Account Information'>
      <p className='text-sm text-accent'>Update your account information to ensure that your data is accurate and up to date.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input type='text' required placeholder='First Name' name='firstName' value={values.info.firstName} onChange={(e) => setFieldValue('info.firstName', e.target.value)} />
          <Input type='text' required placeholder='Last Name' name='lastName' value={values.info.lastName} onChange={(e) => setFieldValue('info.lastName', e.target.value)} />
        </div>
        {/* <Input type='text' placeholder='Phone Number' name='phoneNumber' value={values.info.phoneNumber} onChange={(e) => setFieldValue('info.phoneNumber', e.target.value)} /> */}
        <div className='flex flex-col gap-2'>
          <Input type='text' required placeholder='Telegram Username' pattern='^@[a-zA-Z0-9_]+$' name='telegramUsername' value={values.info.telegramUserName} onChange={(e) => setFieldValue('info.telegramUserName', e.target.value)} />
          <p className='text-xs text-accent'>Enter your telegram username beginning with the @</p>
        </div>
        <Button loading={isPending} disabled={isPending} type='submit'>Update Account Information</Button>
      </form>
    </Modal>
  )
}
