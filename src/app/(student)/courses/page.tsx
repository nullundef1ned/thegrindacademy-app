'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import MyCourses from './_components/MyCourses'
import CourseBrowser from './_components/CourseBrowser'

export default function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState<string>('my-courses');

  return (
    <div className='w-full'>
      <Tabs onValueChange={setSelectedTab} value={selectedTab} className="w-full flex flex-col items-center space-y-4">
        <TabsList className='mx-auto w-max'>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="browse-courses">Browse Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="my-courses" className='w-full'>
          <MyCourses selectTab={setSelectedTab} />
        </TabsContent>
        <TabsContent value="browse-courses" className='w-full'>
          <CourseBrowser />
        </TabsContent>
      </Tabs>
    </div>
  )
}
