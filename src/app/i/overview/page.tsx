'use client';

import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard';
import { Button } from '@/components/ui/button'
import { adminRoutes } from '../_module/admin.routes';
import GraphCard, { ChartTypeEnum } from '@/components/GraphCard';
import UserGrowthOverTimeGraph from './_components/UserGrowthOverTimeGraph';
import RevenueTrendGraph from './_components/RevenueTrendGraph';
import { useFetchDashboardReport } from '../_module/_apis/useFetchReports';

export default function OverviewPage() {

  const { data: dashboardReport } = useFetchDashboardReport();

  const overviewStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Users',
      value: dashboardReport?.totalUsers.count || 0,
      icon: 'ri:user-fill',
      percentage: dashboardReport?.totalUsers.percentageChange || 0,
    },
    {
      title: 'Total Enrollments',
      value: dashboardReport?.totalEnrollments.count || 0,
      icon: 'ri:git-close-pull-request-line',
      percentage: dashboardReport?.totalEnrollments.percentageChange || 0,
    },
    {
      type: 'currency',
      title: 'Total Revenue',
      value: dashboardReport?.totalRevenue.count || 0,
      icon: 'ri:wallet-2-fill',
      percentage: dashboardReport?.totalRevenue.percentageChange || 0,
    },
    {
      title: 'Active Subscriptions',
      value: dashboardReport?.activeSubscriptions.count || 0,
      icon: 'ri:money-dollar-box-fill',
    },
  ]

  return (
    <div className='space-y-6 responsive-section'>
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="flex flex-col gap-1">
          <p className='text-2xl font-medium'>Dashboard</p>
          <p className='text-sm text-accent'>Monitor platform performance, track key metrics, and manage user activity seamlessly</p>
        </div>
        <Button href={`${adminRoutes.courses}/new`} size="sm">Create Course</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <div className='md:col-span-5 h-full'>
          <UserGrowthOverTimeGraph />
        </div>
        <div className='md:col-span-4 h-full'>
          <RevenueTrendGraph />
        </div>
      </div>
    </div>
  )
}
