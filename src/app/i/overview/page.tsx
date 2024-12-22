'use client';

import StatisticsCard from '@/app/(student)/_components/StatisticsCard';
import { Button } from '@/components/ui/button'

export default function OverviewPage() {

  const overviewStatistics = [
    {
      title: 'Total Users',
      value: 0,
      icon: 'ri:user-fill',
      percentage: 0,
    },
    {
      title: 'Total Enrollments',
      value: 0,
      icon: 'ri:git-close-pull-request-line',
      percentage: 0,
    },
    {
      title: 'Total Revenue',
      value: 0,
      icon: 'ri:wallet-2-fill',
      percentage: 90,
    },
    {
      title: 'Active Subscriptions',
      value: 0,
      icon: 'ri:money-dollar-box-fill',
      percentage: -20,
    },
  ]
  
  return (
    <div className='space-y-6 responsive-section'>
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="flex flex-col gap-1">
          <p className='text-2xl font-medium'>Dashboard</p>
          <p className='text-sm text-accent'>Monitor platform performance, track key metrics, and manage user activity seamlessly</p>
        </div>
        <Button>Create Course</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
    </div>
  )
}
