'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/components/StatisticsCard';
import RevenueTrendGraph from '../../overview/_components/RevenueTrendGraph';
import Card from '@/components/Card';
import Table from '@/components/table';
import { TableHeader } from '@/components/table/table.interface';
import { IPayout } from '@/app/(student)/_module/student.interface';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import { useFetchFinanceReport, useFetchPayoutHistory } from '../../_module/_apis/useFetchReports';

export default function FinanceReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Revenue & Finance' },
  ]

  const { data: financeReport } = useFetchFinanceReport();
  const { data: payoutHistory } = useFetchPayoutHistory();

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Revenue',
      value: financeReport?.totalRevenue.count || 0,
      icon: 'ri:wallet-2-fill',
      percentage: financeReport?.totalRevenue.percentageChange || 0,
      type: 'currency',
    },
    {
      title: 'Processed Payouts',
      value: financeReport?.processedPayouts || 0,
      icon: 'ri:swap-box-fill',
      type: 'currency',
    },
    {
      title: 'Pending Payouts',
      value: financeReport?.pendingPayouts || 0,
      icon: 'ri:pause-circle-fill',
      type: 'currency',
    },
  ]

  const tableHeaders: TableHeader<IPayout>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    // @ts-expect-error nested object
    { key: 'user.info.firstName+user.info.lastName', value: 'User' },
    { key: 'amount', value: 'Amount', type: TableHeaderTypeEnum.CURRENCY },
    // @ts-expect-error nested object
    { key: 'user.role', value: 'Account Type', type: TableHeaderTypeEnum.STATUS },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Financial Reports</p>
          <p className="text-sm text-accent">Track revenue, payouts, and user activity</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          data={payoutHistory}
        />
      </Card>
    </div>
  )
}
