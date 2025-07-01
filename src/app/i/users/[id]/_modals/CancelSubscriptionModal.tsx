import { ISubscription } from '@/app/(student)/_module/student.interface';
import { IUser } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import { queryClient } from '@/providers/tanstack-query.provder';
import notificationUtil from '@/utils/notification.util';

interface IDeleteUserModalProps {
  user: IUser;
  subscription: ISubscription;
}

export default function CancelSubscriptionModal({ user, subscription }: IDeleteUserModalProps) {
  const { updateUserSubscriptionPlanMutation } = useAdminMutations();

  const { hideModal } = useModal();

  const handleDeleteSubscription = () => updateUserSubscriptionPlanMutation.mutate({
    userId: user.id,
    subscriptionId: subscription.id,
    status: 'expired',
  }, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Subscription cancelled successfully');
      queryClient.refetchQueries({ queryKey: ['user', user.id] })
    }
  })

  return (
    <Modal title='Cancel Subscription?'>
      <p className='text-sm text-accent'>Are you sure you want to cancel this subscription?</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={updateUserSubscriptionPlanMutation.isPending} onClick={handleDeleteSubscription} type='submit' variant='destructive' size="sm">Cancel Subscription</Button>
      </div>
    </Modal>
  )
}