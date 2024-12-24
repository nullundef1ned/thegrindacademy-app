'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import CourseEnrollmentsAndCompletionGraph from '../_components/CourseEnrollmentsAndCompletionGraph';

export default function CoursesReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Courses' },
  ]

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Courses',
      value: 0,
      icon: 'ri:book-2-fill',
      percentage: 0,
    },
    {
      title: 'Enrollments This Month',
      value: 0,
      icon: 'ri:check-double-fill',
      percentage: 0,
    },
    {
      title: 'Most Popular Course',
      value: 'English',
      icon: 'ri:heart-3-fill',
      type: 'string',
    }
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Course Reports</p>
          <p className="text-sm text-accent">Detailed insights on enrollment, engagement, and completion</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {statistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <div className='md:col-span-5 h-full'>
          <CourseEnrollmentsAndCompletionGraph />
        </div>
      </div>
    </div>
  )
}
