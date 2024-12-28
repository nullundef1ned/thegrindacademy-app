'use client';

import { TableHeader } from '@/components/table/table.interface';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import Table from '@/components/table';
import Card from '@/components/Card';
import StudentQueries from '../../_module/student.queries';
import { IBillingHistory } from '../../_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon';
import Link from 'next/link';
import { appRoutes } from '@/app/_module/app.routes';

export default function BillingHistoryPage() {

  const { useFetchBillingHistoryQuery } = StudentQueries();

  const { data: billingHistory, isPending: isBillingHistoryLoading } = useFetchBillingHistoryQuery();

  const tableHeaders: TableHeader<IBillingHistory>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    // @ts-expect-error: nested object
    { key: 'userSubscription.subscriptionPlan.name', value: 'Subscription Plan' },
    // @ts-expect-error: nested object
    { key: 'userSubscription.subscriptionPlan.price', value: 'Plan Price', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'amountPaid', value: 'Amount Paid', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'paymentStatus', value: 'Status', type: TableHeaderTypeEnum.PAYMENT_STATUS },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className='w-full space-y-3'>
        <div className="flex flex-col gap-2">
          <Link href={appRoutes.profile} className='flex items-center gap-2'>
            <IconifyIcon icon='ri:arrow-left-line' />
            <p className='text-xs font-medium'>Back to Profile</p>
          </Link>
          <div className="flex items-center gap-2">
            <IconifyIcon icon='ri:history-line' className='text-primary-100' />
            <p className='text-xl font-medium'>Billing History</p>
          </div>
        </div>
        <Card>
          <Table<IBillingHistory> headers={tableHeaders} loading={isBillingHistoryLoading} data={billingHistory} emptyStateMessage='No billing history yet' />
        </Card>
      </div>
    </div>
  )
}
