'use client';

import ReferralCodeCard from '../(overview)/_components/ReferralCodeCard'
import StatisticsCard, { StatisticsCardProps } from '@/components/StatisticsCard'
import { IPayout } from '../_module/student.interface';
import { TableHeader } from '@/components/table/table.interface';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import Table from '@/components/table';
import Card from '@/components/Card';
import StudentQueries from '../_module/student.queries';
import useURL from '@/hooks/useURL';

export default function ReferralsPage() {
  const { searchParams } = useURL();
  const searchValue = searchParams.get('search') || '';

  const { useFetchPayoutsQuery, useFetchReferralStatisticsQuery } = StudentQueries();

  const { data: payouts, isPending: isPayoutsLoading } = useFetchPayoutsQuery({ search: searchValue });
  const { data, isPending: isReferralStatisticsLoading } = useFetchReferralStatisticsQuery();

  const referralStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Referrals',
      value: data?.totalReferredUsers ?? 0,
      icon: 'ri:p2p-fill',
    },
    {
      title: 'Total Payouts',
      value: data?.totalPayoutsProcessed ?? 0,
      icon: 'ri:send-plane-fill',
    },
    {
      title: 'Total Earnings',
      value: data?.totalPayoutsAmount ?? 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency',
    }
  ]

  const tableHeaders: TableHeader<IPayout>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    // @ts-expect-error: nested object
    { key: 'userReferral.referee.info.firstName+userReferral.referee.info.lastName', value: 'Name' },
    { key: 'amount', value: 'Amount', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className='space-y-2 lg:w-2/5'>
          <p className='text-xl font-medium'>Earn Rewards by Referring Friends</p>
          <p className='text-accent text-xs'>Share your unique referral code to earn <b className='text-white'>50% of all their subscription payments</b> everytime they subscribe <b className='text-white'>as long as you remain a member</b></p>
        </div>
        <div className='w-full lg:w-auto'>
          <ReferralCodeCard />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {referralStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} loading={isReferralStatisticsLoading} />
        ))}
      </div>
      <div className='w-full space-y-3'>
        <p className='text-xl font-medium'>Payout History</p>
        <Card>
          <Table<IPayout> headers={tableHeaders} loading={isPayoutsLoading} data={payouts} emptyStateMessage='No payouts yet' />
        </Card>
      </div>
    </div>
  )
}
