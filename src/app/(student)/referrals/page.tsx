'use client';

import ReferralCodeCard from '../(overview)/_components/ReferralCodeCard'
import StatisticsCard, { StatisticsCardProps } from '../_components/StatisticsCard'
import fakerUtil from '@/utils/faker.util'
import { IPayout } from '../_module/student.interface';
import { TableHeader } from '@/components/table/table.interface';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import Table from '@/components/table';
import { IPagination } from '@/app/_module/app.interface';
import Card from '@/components/Card';

export default function ReferralsPage() {
  const referralStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Referrals',
      value: fakerUtil.referralStatistics.totalReferrals,
      icon: 'ri:p2p-fill',
    },
    {
      title: 'Total Payouts',
      value: fakerUtil.referralStatistics.totalPayouts,
      icon: 'ri:send-plane-fill',
    },
    {
      title: 'Total Earnings',
      value: fakerUtil.referralStatistics.totalEarnings,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency',
    }
  ]

  const tableHeaders: TableHeader<IPayout>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    { key: 'name', value: 'Name' },
    { key: 'amount', value: 'Amount', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  const tableData: IPagination<IPayout> = {
    result: [
      {
        id: '1',
        name: 'John Doe',
        amount: 100,
        status: 'pending',
        createdAt: '2021-01-01',
      },
      {
        id: '2',
        name: 'Jane Doe',
        amount: 200,
        status: 'paid',
        createdAt: '2021-01-02',
      },
      {
        id: '3',
        name: 'John Doe',
        amount: 300,
        status: 'pending',
        createdAt: '2021-01-03',
      }
    ],
    currentPage: 1,
    totalPages: 3,
    totalCount: 0,
    previousPage: null,
    nextPage: null,
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className='space-y-2 lg:w-2/5'>
          <p className='text-xl font-medium'>Earn Rewards by Referring Friends</p>
          <p className='text-accent text-xs'>Share your unique referral code to earn <b className='text-white'>50% of all their subscription payments</b> everytime they subscribe <b className='text-white'>as long as you remain a member</b></p>
        </div>
        <ReferralCodeCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {referralStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <div className='w-full space-y-3'>
        <p className='text-xl font-medium'>Payout History</p>
        <Card>
          <Table<IPayout> headers={tableHeaders} data={tableData} emptyStateMessage='No payout history yet' />
        </Card>
      </div>
    </div>
  )
}
