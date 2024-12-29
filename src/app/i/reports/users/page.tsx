'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import ActiveInactiveUserGraph from '../_components/ActiveInactiveUserGraph';
import { useFetchUserReport } from '../../_module/_apis/useFetchReports';
import ActiveInactiveUserTrendGraph from '../_components/ActiveInactiveUserTrendGraph';

export default function UserReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Users' },
  ]

  const { data: userReport } = useFetchUserReport();

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Users',
      value: userReport?.total.count || 0,
      icon: 'ri:user-fill',
      percentage: userReport?.total.percentageChange || 0,
    },
    {
      title: 'New Signups',
      value: userReport?.newSignups.count || 0,
      icon: 'ri:newspaper-fill',
      percentage: userReport?.newSignups.percentageChange || 0,
    },
    {
      title: 'Active Users',
      value: userReport?.active.count || 0,
      icon: 'ri:ancient-pavilion-fill',
      percentage: userReport?.active.percentageChange || 0,
    },
    {
      title: 'Inactive Users',
      value: userReport?.inactive.count || 0,
      icon: 'ri:stop-circle-fill',
      percentage: userReport?.inactive.percentageChange || 0,
    },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">User Reports</p>
          <p className="text-sm text-accent">Track user activity, engagement, and retention</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <div className='md:col-span-5 h-full'>
          <ActiveInactiveUserTrendGraph />
        </div>
        <div className='md:col-span-4 h-full'>
          <ActiveInactiveUserGraph />
        </div>
      </div>
    </div>
  )
}
