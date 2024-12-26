'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import RevenueTrendGraph from '../../overview/_components/RevenueTrendGraph';
import Card from '@/components/Card';
import Table from '@/components/table';
import { TableHeader } from '@/components/table/table.interface';
import { IPayout } from '@/app/(student)/_module/student.interface';
import { IPagination } from '@/app/_module/app.interface';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import { useFetchFinanceReport } from '../../_module/_apis/useFetchReports';

export default function FinanceReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Revenue & Finance' },
  ]

  const { data: financeReport } = useFetchFinanceReport();

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Revenue',
      value: financeReport?.totalRevenue || 0,
      icon: 'ri:wallet-2-fill',
      percentage: 0,
      type: 'currency',
    },
    {
      title: 'Processed Payouts',
      value: financeReport?.processedPayouts || 0,
      icon: 'ri:swap-box-fill',
      percentage: 0,
      type: 'currency',
    },
    {
      title: 'Pending Payouts',
      value: financeReport?.pendingPayouts || 0,
      icon: 'ri:pause-circle-fill',
      percentage: 0,
    },
    {
      title: 'Average Revenue Per User',
      value: financeReport?.averageRevenuePerUser || 0,
      icon: 'ri:account-circle-fill',
      type: 'currency',
    },
  ]

  const tableHeaders: TableHeader<IPayout>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    { key: 'userId', value: 'User' },
    { key: 'amount', value: 'Amount', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  const sampleData: IPagination<IPayout> = {
    result: [
      {
        id: '1', userId: '1', amount: '100', status: 'pending', createdAt: '2024-01-01', userReferralId: '1', reference: '1', paidAt: '2024-01-01', updatedAt: '2024-01-01', deletedAt: null,
        userReferral: {
          id: '1', userId: '1', refereeId: '1',
          createdAt: '2024-01-01', updatedAt: '2024-01-01', deletedAt: null,
          referee: { id: '1', email: 'john.doe@example.com', info: { id: '1', userId: '1', createdAt: '2024-01-01', updatedAt: '2024-01-01', firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', telegramUserName: 'john.doe', avi: 'https://via.placeholder.com/150' }, createdAt: '2024-01-01', updatedAt: '2024-01-01', deletedAt: null, role: 'student', status: 'active', lastLogin: '2024-01-01' }
        }
      },
    ],
    previousPage: null,
    nextPage: null,
    totalPages: 1,
    currentPage: 1,
    totalCount: 1,
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Financial Reports</p>
          <p className="text-sm text-accent">Track revenue, payouts, and user activity</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <RevenueTrendGraph />
      <Card className='space-y-4'>
        <p className="font-medium">Payout History</p>
        <Table
          searchable={false}
          headers={tableHeaders}
          data={sampleData}
        />
      </Card>
    </div>
  )
}
