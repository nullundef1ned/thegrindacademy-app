import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import useSubscriptionPlanMutations from '../_apis/subscription-plan.mutations';
import { ISubscriptionPlan } from '@/app/(student)/_module/student.interface';

interface IConfirmSubscriptionPlanDeletionModalProps {
  subscriptionPlan: ISubscriptionPlan;
}

export default function ConfirmSubscriptionPlanDeletionModal({ subscriptionPlan }: IConfirmSubscriptionPlanDeletionModalProps) {
  const { deleteSubscriptionPlanMutation } = useSubscriptionPlanMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteSubscriptionPlan = () => deleteSubscriptionPlanMutation.mutate(subscriptionPlan.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Subscription plan deleted successfully');
      router.push(adminRoutes.websiteContent.subscriptionPlans);
    }
  })

  return (
    <Modal title='Delete Subscription Plan?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this subscription plan? This action cannot be undone</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteSubscriptionPlanMutation.isPending} onClick={handleDeleteSubscriptionPlan} type='submit' variant='destructive' size="sm">Delete Subscription Plan</Button>
      </div>
    </Modal>
  )
}