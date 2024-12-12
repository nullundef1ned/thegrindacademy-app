'use client';

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import SearchInput from "./SearchInput";
import useURL from "@/hooks/useURL";
import { IStudentEnrolledCourse } from "../../_module/student.interface";
import StudentQueries from "../../_module/student.queries";
import { EnrolledCourseStatusType } from "@/app/_module/app.type";
import Paginator from "./Paginator";
import LoadingIcons from "react-loading-icons";
import IconifyIcon from "@/components/IconifyIcon";


export default function MyCourses() {
  const filters: { value: EnrolledCourseStatusType | '', label: string }[] = [
    { value: '', label: 'All Courses' },
    { value: 'pending', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ]
  const { searchParams, updateParams } = useURL();

  const page = searchParams.get('page') || 1;
  const search = searchParams.get('search') || '';

  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const { useFetchEnrolledCoursesQuery } = StudentQueries();
  const { data, isPending, isError, refetch } = useFetchEnrolledCoursesQuery({ page: Number(page), limit: 9, search, status: selectedFilter as EnrolledCourseStatusType });

  const enrolledCourses = data?.result || [];

  const selectTab = (tab: string) => {
    updateParams({ key: 'tab', value: tab });
  }

  if (isPending) {
    return <div className="w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4">
      <LoadingIcons.TailSpin className="size-10" />
    </div>
  }

  if (isError) {
    return (
      <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4 gap-4'>
        <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
        <div className='space-y-1 flex flex-col items-center gap-2 max-w-sm'>
          <p className='text-center text-lg font-medium'>An error occurred while fetching courses</p>
          <Button size='sm' onClick={() => refetch()}>Try again</Button>
        </div>
      </div>
    )
  }

  if (enrolledCourses.length === 0 && !isPending && !search) {
    return (
      <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4'>
        <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
        <div className='space-y-4 max-w-sm flex flex-col items-center'>
          <div className='space-y-1'>
            <p className='text-center text-lg font-medium'>No courses available yet</p>
            <p className='text-center text-accent'>It looks like you haven&apos;t enrolled in any courses yet.</p>
          </div>
          <Button onClick={() => selectTab('browse-courses')} size='sm'>Browse Courses</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full space-y-6'>
      <div className="flex items-center flex-wrap gap-4 justify-between w-full border-b border-[#B0CAFF1A] pb-6">
        <SearchInput />
        <div className="flex items-center gap-4 overflow-hidden">
          <p className="text-sm whitespace-nowrap">Filter by:</p>
          <div className="flex items-center gap-2 overflow-x-auto">
            {filters.map((filter, index) => (
              <div
                key={index}
                onClick={() => setSelectedFilter(filter.value)}
                className={clsx(selectedFilter === filter.value ? 'bg-[#00246B] text-white' : 'bg-transparent border-[#B0CAFF26] text-accent hover:bg-[#00246B] hover:text-white', "flex items-center gap-1 px-3 py-1.5 rounded border cursor-pointer transition-all whitespace-nowrap")}>
                <p className="text-sm">{filter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {search && enrolledCourses.length === 0 && (
        <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4'>
          <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
          <div className='space-y-1 max-w-sm'>
            <p className='text-center text-lg font-medium'>No courses found for &quot;{search}&quot;</p>
            <p className='text-center text-accent'>Please try a different search term.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden w-full h-52">
                <Image src={course.course.media.thumbnailUrl} alt={course.course.name} fill className='absolute object-cover' />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">{course.course.name}</p>
                <p className="text-sm text-accent">{course.course.shortDescription}</p>
                <div className="flex items-center justify-between gap-2">
                  <Progress value={course.completionPercentage} />
                  <p className="text-sm text-accent">{course.completionPercentage}%</p>
                </div>
              </div>
            </div>
            <Button href={`/courses/${course.course.slug}`} size='sm' variant={course.completionPercentage === 100 ? 'default' : 'outline'} className="bg-transparent">
              {course.completionPercentage === 0 && 'Start Course'}
              {course.completionPercentage > 0 && course.completionPercentage < 100 && 'Continue Course'}
              {course.completionPercentage === 100 && 'Completed'}
              {course.completionPercentage === 100 && <IconifyIcon icon="mdi:check" className="size-4" />}
            </Button>
          </Card>
        ))}
      </div>

      <Paginator<IStudentEnrolledCourse> pagination={data} />
    </div>
  )
}
