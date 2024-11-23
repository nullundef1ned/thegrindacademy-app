'use client';

import React, { useState } from 'react'
import StatisticsCard from '../_components/StatisticsCard'
import fakerUtil from '@/utils/faker.util'
import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import ReferralCodeCard from './_components/ReferralCodeCard';
import { IStudentActiveCourse } from '../_module/student.interface';
import Table from '@/components/table';
import { TableHeaderTypeEnum } from '@/components/table/table.enum';
import { TableHeader, TableTab } from '@/components/table/table.interface';

export default function OverviewPage() {
  const overviewStatistics = [
    {
      title: 'Completed Courses',
      value: fakerUtil.overviewStatistics.completedCourses,
      icon: 'ri:checkbox-circle-fill',
    },
    {
      title: 'Active Courses',
      value: fakerUtil.overviewStatistics.activeCourses,
      icon: 'mdi:star',
    },
    {
      title: 'Enrolled Courses',
      value: fakerUtil.overviewStatistics.enrolledCourses,
      icon: 'ri:file-text-fill',
    }
  ]

  const [activeTab, setActiveTab] = useState<string>('active');

  const activeCourse: IStudentActiveCourse | undefined = fakerUtil.activeCourses[0]

  const tableHeaders: TableHeader<IStudentActiveCourse>[] = [
    { key: 'name', value: 'Course Name' },
    { key: 'progress', value: 'Progress', type: TableHeaderTypeEnum.PROGRESS },
  ]

  const tabs: TableTab<IStudentActiveCourse>[] = [
    { key: 'active', name: 'Active', headers: tableHeaders, data: { result: [activeCourse], currentPage: 1, totalPages: 1, totalCount: 0, previousPage: null, nextPage: null } },
    { key: 'completed', name: 'Completed', headers: tableHeaders, data: { result: [], currentPage: 1, totalPages: 1, totalCount: 0, previousPage: null, nextPage: null } }
  ]

  return (
    <div className='space-y-6'>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        {activeCourse &&
          <Card className='col-span-1 lg:col-span-5 grid grid-cols-6 gap-4'>
            <div className="relative overflow-hidden rounded-md w-full h-24 col-span-2">
              <Image src={activeCourse.thumbnail} alt={activeCourse.name} fill className='absolute object-cover' />
            </div>
            <div className='flex flex-col justify-around gap-2 col-span-4'>
              <p className='font-medium'>{activeCourse.name}</p>
              <div className="flex items-end gap-4 justify-between">
                <div className='space-y-1.5 flex flex-col w-full'>
                  <p className='text-xs text-accent'>{activeCourse.progress}% completed</p>
                  <Progress value={activeCourse.progress} />
                </div>
                <Button size="sm">Resume</Button>
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
            <Table<IStudentActiveCourse> hideFooter hideLimit searchable={false}
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              emptyStateMessage={`No ${activeTab} courses found`}
              skeletonCount={4}
            />
          </Card>
        </div>
        <div className='col-span-1 lg:col-span-2 space-y-4'>
          <p className='text-accent font-medium'>Quick Links</p>
          <ReferralCodeCard />
        </div>
      </div>
    </div>
  )
}
