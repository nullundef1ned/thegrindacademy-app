import { IUser } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';

interface IDeleteUserModalProps {
  user: IUser;
}

export default function DeleteUserModal({ user }: IDeleteUserModalProps) {
  const { deleteUserMutation } = useAdminMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteUser = () => deleteUserMutation.mutate(user.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('User deleted successfully');
      router.push(adminRoutes.users);
    }
  })

  return (
    <Modal title='Delete User?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this user? This action cannot be undone, and all associated data will be removed</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteUserMutation.isPending} onClick={handleDeleteUser} type='submit' variant='destructive' size="sm">Delete User</Button>
      </div>
    </Modal>
  )
}