'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import SubscriptionGrowthGraph from '../_components/SubscriptionGrowthGraph';
import SubscriptionPlanPopularityGraph from '../_components/SubscriptionPlanPopularityGraph';
import { useFetchSubscriptionReport } from '../../_module/_apis/useFetchReports';

export default function SubscriptionReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Subscription' },
  ]

  const { data: subscriptionReport } = useFetchSubscriptionReport();

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Active Subscriptions',
      value: subscriptionReport?.activeSubscriptions || 0,
      icon: 'ri:checkbox-multiple-fill',
      percentage: 0,
    },
    {
      title: 'Expired Subscriptions',
      value: subscriptionReport?.expiredSubscriptions || 0,
      icon: 'ri:close-circle-fill',
      percentage: 0,
    },
    {
      title: 'New Subscriptions',
      value: subscriptionReport?.newSubscriptions || 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'percentage',
    },
    {
      title: 'Renewal Rate',
      value: subscriptionReport?.renewalRate || 0,
      icon: 'ri:refresh-fill',
      type: 'percentage',
    }
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Subscription Report</p>
          <p className="text-sm text-accent">Detailed insights on subscription</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <div className='md:col-span-5 h-full'>
          <SubscriptionGrowthGraph />
        </div>
        <div className='md:col-span-4 h-full'>
          <SubscriptionPlanPopularityGraph />
        </div>
      </div>
    </div>
  )
}
