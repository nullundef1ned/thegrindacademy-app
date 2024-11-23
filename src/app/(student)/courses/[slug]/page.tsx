'use client';

import fakerUtil from "@/utils/faker.util";
import CourseHeader from "./_components/CourseHeader";

export default function CoursePage() {
  const course = fakerUtil.courses[0];

  return (
    <div className="w-full space-y-4">
      <CourseHeader course={course} />
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <div className="w-full aspect-video bg-muted rounded-lg"></div>
        </div>
        <div className="col-span-2">
          <div className="w-full aspect-video bg-muted rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
