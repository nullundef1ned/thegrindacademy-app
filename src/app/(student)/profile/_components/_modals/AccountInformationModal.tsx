import useStudentMutations from '@/app/(student)/_module/student.mutations';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import { IAccountInformationForm } from '@/app/_module/app.interface';
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
  const { updateStudentAccountInformationMutation } = useStudentMutations();

  const { values, handleSubmit, setFieldValue } = useFormik<IAccountInformationForm>({
    initialValues: {
      info: {
        firstName: user?.info.firstName || '',
        lastName: user?.info.lastName || '',
        phoneNumber: user?.info.phoneNumber || '',
        telegramUserName: user?.info.telegramUserName || '',
        avi: user?.info.avi || '',
      }
    },
    onSubmit: (values) => {
      updateStudentAccountInformationMutation.mutate(values, {
        onSuccess: () => {
          hideModal()
          notificationUtil.success('Account information updated successfully')
        }
      })
    }
  })

  const isPending = updateStudentAccountInformationMutation.isPending;

  return (
    <Modal title='Update Account Information'>
      <p className='text-sm text-accent'>Update your account information to ensure that your data is accurate and up to date.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input type='text' required placeholder='First Name' name='firstName' value={values.info.firstName} onChange={(e) => setFieldValue('info.firstName', e.target.value)} />
          <Input type='text' required placeholder='Last Name' name='lastName' value={values.info.lastName} onChange={(e) => setFieldValue('info.lastName', e.target.value)} />
        </div>
        <Input disabled={!!user?.info.telegramUserName} type='text' required placeholder='Telegram Username' pattern='^@[a-zA-Z0-9_]+$' name='telegramUserName' value={user?.info.telegramUserName} />
        <Button loading={isPending} disabled={isPending} type='submit'>Update Account Information</Button>
      </form>
    </Modal>
  )
}
