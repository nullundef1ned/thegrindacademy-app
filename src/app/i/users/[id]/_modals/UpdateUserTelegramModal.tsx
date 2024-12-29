import { IUser } from '@/app/_module/app.interface';
import { IUserTelegramUpdate } from '@/app/i/_module/_interfaces/user.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useFormik } from 'formik';

interface IUpdateUserTelegramModalProps {
  user: IUser;
}

export default function UpdateUserTelegramModal({ user }: IUpdateUserTelegramModalProps) {
  const { hideModal } = useModal();
  const { updateUserTelegramMutation } = useAdminMutations();

  const { values, handleChange, handleSubmit } = useFormik<IUserTelegramUpdate>({
    initialValues: {
      id: user.id,
      telegramUserName: user.info.telegramUserName || '',
    },
    onSubmit: (values) => {
      updateUserTelegramMutation.mutate(values, {
        onSuccess: () => {
          hideModal()
          notificationUtil.success('Telegram username updated successfully')
        }
      })
    }
  })

  const isPending = updateUserTelegramMutation.isPending;

  return (
    <Modal title='Update Telegram Username'>
      <p className='text-sm text-accent'>Update the telegram username for this user</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Input type='text' required
            placeholder='Telegram Username' onChange={handleChange} pattern='^@[a-zA-Z0-9_]+$'
            name='telegramUserName' value={values.telegramUserName}
          />
          <p className='text-xs text-accent'>Enter telegram username beginning with the @</p>
        </div>
        <Button loading={isPending} disabled={isPending} type='submit'>Update</Button>
      </form>
    </Modal>
  )
}
