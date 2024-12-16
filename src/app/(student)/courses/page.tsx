'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyCourses from './_components/MyCourses'
import CourseBrowser from './_components/CourseBrowser'
import useURL from '@/hooks/useURL';

export default function CoursesPage() {
  const { searchParams, replaceParams } = useURL();

  const tab = searchParams.get('tab') || 'my-courses';

  const selectTab = (tab: string) => {
    replaceParams({ key: 'tab', value: tab });
  }

  return (
    <div className='w-full responsive-section'>
      <Tabs onValueChange={selectTab} value={tab} className="w-full flex flex-col items-center space-y-4">
        <TabsList className='mx-auto w-max'>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="browse-courses">Browse Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="my-courses" className='w-full'>
          <MyCourses />
        </TabsContent>
        <TabsContent value="browse-courses" className='w-full'>
          <CourseBrowser />
        </TabsContent>
      </Tabs>
    </div>
  )
}
