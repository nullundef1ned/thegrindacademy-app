'use client';

import React, { useState } from 'react'
import StatisticsCard from '../_components/StatisticsCard'
import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import ReferralCodeCard from './_components/ReferralCodeCard';
import { IStudentEnrolledCourse } from '../_module/student.interface';
import Table from '@/components/table';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import { TableHeader, TableTab } from '@/components/table/table.interface';
import BankDetailsCard from './_components/BankDetailsCard';
import StudentQueries from '../_module/student.queries';
import { useRouter } from 'next/navigation';

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState<string>('pending');

  const { useFetchDashboardDataQuery, useFetchEnrolledCoursesQuery } = StudentQueries();

  const router = useRouter();
  const { data } = useFetchDashboardDataQuery();

  const { data: _activeCourses, isPending: activeCoursesPending } = useFetchEnrolledCoursesQuery({ status: 'pending', page: 1, limit: 5 });
  const { data: _completedCourses, isPending: completedCoursesPending } = useFetchEnrolledCoursesQuery({ status: 'completed', page: 1, limit: 5 });

  const tabName = {
    'pending': 'active',
    'completed': 'completed',
  }[activeTab]

  const dashboardData = data || null;
  const activeCourses = _activeCourses?.result || [];
  const completedCourses = _completedCourses?.result || [];

  const overviewStatistics = [
    {
      title: 'Completed Courses',
      value: dashboardData?.course?.count?.completed || 0,
      icon: 'ri:checkbox-circle-fill',
    },
    {
      title: 'Active Courses',
      value: dashboardData?.course?.count?.active || 0,
      icon: 'mdi:star',
    },
    {
      title: 'Enrolled Courses',
      value: dashboardData?.course?.count?.enrolled || 0,
      icon: 'ri:file-text-fill',
    }
  ]

  const activeCourse: IStudentEnrolledCourse | null = dashboardData?.course?.active || null;

  const tableHeaders: TableHeader<IStudentEnrolledCourse>[] = [
    // @ts-expect-error this is a nested object
    { key: 'course.name', value: 'Course Name' },
    { key: 'completionPercentage', value: 'Progress', type: TableHeaderTypeEnum.PROGRESS },
  ]

  const tabs: TableTab<IStudentEnrolledCourse>[] = [
    { key: 'pending', name: 'Active', headers: tableHeaders,
      data: { result: activeCourses, currentPage: 1, totalPages: 1, totalCount: 0, previousPage: null, nextPage: null }
    },
    { key: 'completed', name: 'Completed', headers: tableHeaders,
      data: { result: completedCourses, currentPage: 1, totalPages: 1, totalCount: 0, previousPage: null, nextPage: null }
    }
  ]

  const goToCourse = (course: IStudentEnrolledCourse) => {
    router.push(`/courses/${course.course.slug}`);
  }

  return (
    <div className='space-y-6 responsive-section'>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        {activeCourse &&
          <Card className='col-span-1 lg:col-span-5 grid grid-cols-6 gap-4'>
            <div className="relative overflow-hidden rounded-md w-full h-24 col-span-2">
              <Image src={activeCourse.course.media.thumbnailUrl} alt={activeCourse.course.name} fill className='absolute object-cover' />
            </div>
            <div className='flex flex-col justify-around gap-2 col-span-4'>
              <p className='font-medium'>{activeCourse.course.name}</p>
              <div className="flex items-end gap-4 justify-between">
                <div className='space-y-1.5 flex flex-col w-full'>
                  <p className='text-xs text-accent'>{activeCourse.completionPercentage}% completed</p>
                  <Progress value={Number(activeCourse.completionPercentage)} />
                </div>
                <Button href={`/courses/${activeCourse.course.slug}`} size="sm">Resume</Button>
              </div>
            </div>
          </Card>
        }
        {overviewStatistics.map((item) => (
          <StatisticsCard className='col-span-1 lg:col-span-2 h-full' key={item.title} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className='col-span-1 lg:col-span-3 space-y-4'>
          <p className='text-accent font-medium'>Continue Learning</p>
          <Card className=''>
            <Table<IStudentEnrolledCourse>
              hideFooter
              hideLimit
              tabs={tabs}
              skeletonCount={4}
              searchable={false}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onRowClick={goToCourse}
              emptyStateMessage={`No ${tabName} courses found`}
              loading={activeCoursesPending || completedCoursesPending}
            />
          </Card>
        </div>
        <div className='col-span-1 lg:col-span-2 space-y-4'>
          <p className='text-accent font-medium'>Quick Links</p>
          <ReferralCodeCard />
          <BankDetailsCard />
        </div>
      </div>
    </div>
  )
}
