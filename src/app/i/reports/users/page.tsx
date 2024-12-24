'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import UserGrowthOverTimeGraph from '../../overview/_components/UserGrowthOverTimeGraph'
import ActiveInactiveUserGraph from '../_components/ActiveInactiveUserGraph';

export default function UserReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Users' },
  ]

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Users',
      value: 0,
      icon: 'ri:user-fill',
      percentage: 0,
    },
    {
      title: 'New Signups This Month',
      value: 0,
      icon: 'ri:newspaper-fill',
      percentage: 0,
    },
    {
      title: 'Active Users',
      value: 0,
      icon: 'ri:ancient-pavilion-fill',
      percentage: 0,
    },
    {
      title: 'Inactive Users',
      value: 0,
      icon: 'ri:stop-circle-fill',
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
          <UserGrowthOverTimeGraph />
        </div>
        <div className='md:col-span-4 h-full'>
          <ActiveInactiveUserGraph />
        </div>
      </div>
    </div>
  )
}
