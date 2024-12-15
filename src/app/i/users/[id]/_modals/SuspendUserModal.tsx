import { IUser } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';

interface ISuspendUserModalProps {
  user: IUser;
}

export default function SuspendUserModal({ user }: ISuspendUserModalProps) {
  const { updateUserStatusMutation } = useAdminMutations();

  const { hideModal } = useModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const reason = formData.get('reason') as string;
    updateUserStatusMutation.mutate({ id: user.id, status: 'suspended', reason }, {
      onSuccess: () => {
        hideModal();
        notificationUtil.success('User suspended successfully');
      }
    });
  }

  return (
    <Modal title='Confirm User Suspension'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <p className='text-sm text-accent'>You are about to suspend this user. Suspended users will lose access to their account until reactivated.</p>
        <Textarea required name='reason' placeholder='Reason for suspension' />
        <div className='grid grid-cols-2 gap-4'>
          <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
          <Button loading={updateUserStatusMutation.isPending} type='submit' size="sm">Suspend User</Button>
        </div>
      </form>
    </Modal>
  )
}