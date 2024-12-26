'use client';

import Breadcrumbs from '@/components/Breadcrumbs'
import { adminRoutes } from '../../_module/admin.routes'
import { BreadcrumbItem } from '@/components/Breadcrumbs'
import StatisticsCard, { StatisticsCardProps } from '@/app/(student)/_components/StatisticsCard'
import CourseEnrollmentsAndCompletionGraph from '../_components/CourseEnrollmentsAndCompletionGraph';
import { useFetchCourseReport } from '../../_module/_apis/useFetchReports';

export default function CoursesReportsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Reports', link: adminRoutes.reports.root },
    { name: 'Courses' },
  ]

  const { data, isPending } = useFetchCourseReport();

  const statistics: StatisticsCardProps[] = [
    {
      title: 'Total Courses',
      value: data?.totalCourses || 0,
      icon: 'ri:book-2-fill',
    },
    {
      title: 'Enrollments This Month',
      value: data?.enrollmentsThisMonth || 0,
      icon: 'ri:check-double-fill',
    },
    {
      title: 'Most Popular Course',
      value: data?.mostPopularCourse || '',
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
          <StatisticsCard key={index} {...statistic} loading={isPending} />
        ))}
      </div>
      <CourseEnrollmentsAndCompletionGraph />
    </div>
  )
}
