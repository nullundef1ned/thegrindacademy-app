'use client';

import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import Image from "next/image";
import SearchInput from "./SearchInput";
import StudentQueries from "../../_module/student.queries";
import { ICourse } from "../../_module/student.interface";
import useURL from "@/hooks/useURL";
import Paginator from "./Paginator";
import LoadingIcons from "react-loading-icons";


export default function CourseBrowser() {
  const { searchParams } = useURL();

  const page = searchParams.get('page') || 1;
  const search = searchParams.get('search') || '';

  const { useFetchCoursesQuery } = StudentQueries();

  const { data, isLoading, isError, refetch } = useFetchCoursesQuery({ page: Number(page), limit: 9, search });

  const courses = data?.result || [];

  if (isLoading) {
    return <div className="w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4">
      <LoadingIcons.TailSpin className="size-10" />
    </div>
  }

  if (isError) {
    return (
      <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4'>
        <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
        <div className='space-y-1 flex flex-col items-center gap-2 max-w-sm'>
          <p className='text-center text-lg font-medium'>An error occurred while fetching courses</p>
          <Button size='sm' onClick={() => refetch()}>Try again</Button>
        </div>
      </div>
    )
  }

  if (courses.length === 0 && !isLoading && !search) {
    return (
      <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4'>
        <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
        <div className='space-y-1 max-w-sm'>
          <p className='text-center text-lg font-medium'>No courses available at the moment</p>
          <p className='text-center text-accent'>Please check back soon as new courses are added regularly!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full space-y-6'>
      <div className="flex items-center justify-between w-full border-b border-[#B0CAFF1A] pb-6">
        <SearchInput />
      </div>

      {search && courses.length === 0 && (
        <div className='w-full h-[50dvh] grid place-items-center place-content-center space-y-4 px-4'>
          <Image src='/images/empty-state.svg' alt='No courses found' width={150} height={150} className='object-contain' />
          <div className='space-y-1 max-w-sm'>
            <p className='text-center text-lg font-medium'>No courses found for &quot;{search}&quot;</p>
            <p className='text-center text-accent'>Please try a different search term.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {courses.map((course: ICourse) => (
          <Card key={course.id} className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden w-full h-52">
                <Image src={course.media.thumbnailUrl} alt={course.name} fill className='absolute object-cover' />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium">{course.name}</p>
                <p className="text-sm text-accent">{course.shortDescription}</p>
              </div>
            </div>
            <Button href={`/courses/preview/${course.slug}`} size='sm' variant='outline' className="bg-transparent">
              Start Course
            </Button>
          </Card>
        ))}
      </div>

      <Paginator<ICourse> pagination={data} />
    </div>
  )
}
