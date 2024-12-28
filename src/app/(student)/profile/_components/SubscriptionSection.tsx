import React from 'react'
import ProfileSection from '../../../../components/ProfileSection';
import IconifyIcon from '@/components/IconifyIcon';
import helperUtil from '@/utils/helper.util';
import { Button } from '@/components/ui/button';
import useStudentMutations from '../../_module/student.mutations';
import StudentQueries from '../../_module/student.queries';
import Link from 'next/link';
import { studentRoutes } from '../../_module/student.routes';

export default function SubscriptionSection() {
  const { cancelSubscriptionMutation } = useStudentMutations();

  const { useFetchSubscriptionQuery } = StudentQueries();
  const { data: subscription } = useFetchSubscriptionQuery();

  const activeSubscription = subscription?.active;
  const upcomingSubscription = subscription?.upcoming;

  const isPlanRenewing = upcomingSubscription;

  return (
    <ProfileSection title='Subscription' description='Manage your subscription'>
      <div className='flex gap-6'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-primary-100'>
            <IconifyIcon icon='ri:file-list-2-fill' />
            <p className='text-sm'>Plan</p>
          </div>
          {activeSubscription ? (
            <p className='text-base'>{activeSubscription.subscriptionPlan.name} Plan</p>
          ) : (
            <p className='text-accent text-base'>No active subscription</p>
          )}
        </div>
        {activeSubscription && (
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-primary-100'>
              <IconifyIcon icon='ri:calendar-event-fill' />
              <p className='text-sm'>
                {isPlanRenewing ? 'Renewal Date' : 'Expiration Date'}
              </p>
            </div>
            {isPlanRenewing ? (
              <p className='text-accent'>Next renewal date: <span className='font-semibold text-white'>{helperUtil.formatDate(upcomingSubscription?.startDate ?? '')}</span></p>
            ) : (
              <div className='flex items-center gap-2'>
                <p className='text-accent'>Expires in <span className='font-semibold text-white'>{helperUtil.getTimeTo(activeSubscription?.endDate ?? '')}</span></p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        {{
          'active': (
            <Button href='/subscription' size='sm'>
              Change Subscription
            </Button>
          ),
          'inactive': (
            <Button href='/subscription' variant='outline' size='sm'>
              Renew Subscription
            </Button>
          ),
          'undefined': (
            <Button href='/subscription' size='sm'>
              Subscribe now
            </Button>
          )
        }[activeSubscription?.status || 'undefined']}

        {activeSubscription?.autoRenewal &&
          <Button
            loading={cancelSubscriptionMutation.isPending}
            onClick={() => cancelSubscriptionMutation.mutate()}
            variant='destructive' size='sm'>
            Cancel Subscription
          </Button>
        }
      </div>
      <Link href={studentRoutes.billingHistory} className='text-sm text-primary-100 block'>View Billing History</Link>
    </ProfileSection>
  )
}
