import useStudentMutations from '@/app/(student)/_module/student.mutations';
import { URLKeyEnum } from '@/app/_module/app.enum';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import useURL from '@/hooks/useURL';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';

export default function DeleteAccountModal() {
  const { deleteStudentMutation } = useStudentMutations();

  const { updateParams } = useURL();
  const { hideModal } = useModal();

  const handleDeleteAccount = () => deleteStudentMutation.mutate(undefined, {
    onSuccess: () => {
      hideModal();
      updateParams([{ key: URLKeyEnum.LOGOUT, value: 'true' }], '/login');
      notificationUtil.success('Account deleted successfully');
    }
  })

  return (
    <Modal title='Delete Your Account?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete your account? This action cannot be undone, and all associated data will be removed</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteStudentMutation.isPending} onClick={handleDeleteAccount} type='submit' variant='destructive' size="sm">Delete Account</Button>
      </div>
    </Modal>
  )
}