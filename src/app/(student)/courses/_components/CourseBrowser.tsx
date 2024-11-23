'use client';

import { Button } from "@/components/ui/button";
import fakerUtil from "@/utils/faker.util";
import { ICourse } from "../../_module/student.interface";
import Card from "@/components/Card";
import Image from "next/image";
import { Pagination, PaginationNext, PaginationEllipsis, PaginationLink, PaginationPrevious, PaginationItem, PaginationContent } from "@/components/ui/pagination";
import SearchInput from "./SearchInput";

export default function CourseBrowser() {
  const courses: ICourse[] = fakerUtil.courses;

  return (
    <div className='w-full space-y-6'>
      <div className="flex items-center justify-between w-full border-b border-[#B0CAFF1A] pb-6">
        <SearchInput />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col gap-4">
            <div className="relative overflow-hidden w-full h-52">
              <Image src={course.thumbnail} alt={course.name} fill className='absolute object-cover' />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">{course.name}</p>
              <p className="text-sm text-accent">{course.description}</p>
            </div>
            <Button href={`/courses/${course.id}`} size='sm' variant='outline' className="bg-transparent">
              Start Course
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
