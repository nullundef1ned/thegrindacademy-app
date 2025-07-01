import { IUser } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import { useFetchSubscriptionPlans } from '@/app/i/website-content/subscription-plans/_apis/useFetchSubscriptionPlans';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IUserSubscriptionPlanCreate, IUserSubscriptionPlanUpdate } from '@/interfaces/user';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useFormik } from 'formik';

interface ISubscriptionModalProps {
  user: IUser;
}

export default function SubscriptionModal({ user }: ISubscriptionModalProps) {
  const { createUserSubscriptionPlanMutation, updateUserSubscriptionPlanMutation } = useAdminMutations();

  const { hideModal } = useModal();
  const { data: subscriptionPlans } = useFetchSubscriptionPlans();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<IUserSubscriptionPlanCreate>({
    initialValues: {
      subscriptionPlanId: '',
      userId: user.id,
      startDate: new Date().toISOString().split('T')[0],
    },
    onSubmit: (values) => {
      createUserSubscriptionPlanMutation.mutate(values, {
        onSuccess: () => {
          hideModal();
          notificationUtil.success('Subscription plan set successfully');
        }
      });
    }
  });

  const isFormValid = values.subscriptionPlanId && values.startDate;

  return (
    <Modal title='Setup Subscription Plan'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <p className='text-sm text-accent'>Select a new subscription plan for this user</p>
        <Select
          name='subscriptionPlanId'
          required
          value={values.subscriptionPlanId}
          onValueChange={(value) => setFieldValue('subscriptionPlanId', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Subscription Plan' />
          </SelectTrigger>
          <SelectContent>
            {subscriptionPlans?.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name='startDate'
          title='Start Date'
          type='date'
          min={new Date().toISOString().split('T')[0]}
          value={values.startDate}
          onChange={handleChange}
        />
        <Button type='submit' className='w-full' loading={createUserSubscriptionPlanMutation.isPending} disabled={!isFormValid}>Setup Subscription Plan</Button>
      </form>
    </Modal>
  )
}
