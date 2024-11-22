import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import MyCourses from './_components/MyCourses'
import CourseBrowser from './_components/CourseBrowser'

export default function CoursesPage() {
  return (
    <div className='w-full'>
      <Tabs defaultValue="my-courses" className="w-full flex flex-col items-center space-y-4">
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
