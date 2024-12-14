import React from 'react'
import ProfileSection from '../../../../components/ProfileSection';
import IconifyIcon from '@/components/IconifyIcon';
import { useStudentStore } from '../../_module/student.store';
import helperUtil from '@/utils/helper.util';
import { Button } from '@/components/ui/button';
import useStudentMutations from '../../_module/student.mutations';

export default function SubscriptionSection() {
  const subscription = useStudentStore(state => state.subscription);

  const { cancelSubscriptionMutation } = useStudentMutations();

  const hasPlanExpired = subscription?.renewalDate && new Date(subscription.renewalDate) < new Date();

  return (
    <ProfileSection title='Subscription' description='Manage your subscription'>
      <div className='flex gap-6'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-primary-100'>
            <IconifyIcon icon='ri:file-list-2-fill' />
            <p className='text-sm'>Plan</p>
          </div>
          {subscription ? (
            <p className='text-base'>{subscription?.name}</p>
          ) : (
            <p className='text-accent text-base'>No active subscription</p>
          )}
        </div>
        {subscription && (
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-primary-100'>
              <IconifyIcon icon='ri:calendar-event-fill' />
              <p className='text-sm'>Renewal Date</p>
            </div>
            {!hasPlanExpired ? (
              <p>Next renewal date: {helperUtil.formatDate(subscription?.renewalDate ?? '')}</p>
            ) : (
              <div className='flex items-center gap-2 text-destructive'>
                <IconifyIcon icon='ri:error-warning-fill' />
                <p>Subscription expired</p>
              </div>
            )}
          </div>
        )}
      </div>
      {{
        'active': (
          <div className='flex items-center gap-4'>
            <Button href='/subscription' size='sm'>
              Change Subscription
            </Button>
            <Button
              loading={cancelSubscriptionMutation.isPending}
              onClick={() => cancelSubscriptionMutation.mutate()}
              variant='destructive' size='sm'>
              Cancel Subscription
            </Button>
          </div>
        ),
        'inactive': (
          <Button variant='outline' size='sm'>
            Renew Subscription
          </Button>
        ),
        'undefined': (
          <Button size='sm'>
            Subscribe now
          </Button>
        )
      }[subscription?.status || 'undefined']}
    </ProfileSection>
  )
}
