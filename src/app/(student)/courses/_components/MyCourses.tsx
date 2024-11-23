'use client';

import { Button } from "@/components/ui/button";
import fakerUtil from "@/utils/faker.util";
import clsx from "clsx";
import { useState } from "react";
import { IStudentActiveCourse } from "../../_module/student.interface";
import Card from "@/components/Card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationNext, PaginationEllipsis, PaginationLink, PaginationPrevious, PaginationItem, PaginationContent } from "@/components/ui/pagination";
import SearchInput from "./SearchInput";

export default function MyCourses() {
  const filters = [
    { value: 'all', label: 'All Courses' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ]

  const courses: IStudentActiveCourse[] = fakerUtil.activeCourses;

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  return (
    <div className='w-full space-y-6'>
      <div className="flex items-center justify-between w-full border-b border-[#B0CAFF1A] pb-6">
        <SearchInput />
        <div className="flex items-center gap-4">
          <p>Filter by:</p>
          <div className="flex items-center gap-2">
            {filters.map((filter, index) => (
              <div
                key={index}
                onClick={() => setSelectedFilter(filter.value)}
                className={clsx(selectedFilter === filter.value ? 'bg-[#00246B] text-white' : 'bg-transparent border-[#B0CAFF26] text-accent hover:bg-[#00246B] hover:text-white', "flex items-center gap-1 px-3 py-1.5 rounded border cursor-pointer transition-all")}>
                <p className="text-sm">{filter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col gap-4">
            <div className="relative overflow-hidden w-full h-52">
              <Image src={course.thumbnail} alt={course.name} fill className='absolute object-cover' />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">{course.name}</p>
              <p className="text-sm text-accent">{course.description}</p>
              <div className="flex items-center justify-between gap-2">
                <Progress value={course.progress} />
                <p className="text-sm text-accent">{course.progress}%</p>
              </div>
            </div>
            <Button href={`/courses/${course.id}`} size='sm' variant='outline' className="bg-transparent">
              {course.progress === 0 && 'Start Course'}
              {course.progress > 0 && course.progress < 100 && 'Continue Course'}
              {course.progress === 100 && 'Completed'}
            </Button>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
