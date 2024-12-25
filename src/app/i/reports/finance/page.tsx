'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import RevenueTrendGraph from '../../overview/_components/RevenueTrendGraph';

export default function FinanceReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Revenue & Finance' },
  ]

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Revenue',
      value: 0,
      icon: 'ri:wallet-2-fill',
      percentage: 0,
      type: 'currency',
    },
    {
      title: 'Processed Payouts',
      value: 0,
      icon: 'ri:swap-box-fill',
      percentage: 0,
      type: 'currency',
    },
    {
      title: 'Active Users',
      value: 0,
      icon: 'ri:pause-circle-fill',
      percentage: 0,
    },
    {
      title: 'Average Revenue Per User',
      value: 0,
      icon: 'ri:account-circle-fill',
      type: 'currency',
    },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <div className='md:col-span-5 h-full'>
          <RevenueTrendGraph />
        </div>
        <div className='md:col-span-4 h-full'>
        </div>
      </div>
    </div>
  )
}
