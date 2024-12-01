'use client';

import fakerUtil from "@/utils/faker.util";
import CourseHeader from "./_components/CourseHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Card from "@/components/Card";
// import { useState } from "react";
import CourseLessonCard from "./_components/CourseLessonCard";
import { ICourse, ICourseEnrollment } from "../../_module/student.interface";
import Image from "next/image";
import Link from "next/link";
import CourseMaterial from "./_components/CourseMaterial";
import CourseMainContent from "./_components/CourseMainContent";
import useURL from "@/hooks/useURL";
import { useState } from "react";

export default function CoursePage() {
  const [course, setCourse] = useState<ICourse>(fakerUtil.courses[0]);

  const { clearParams } = useURL();

  // const [enrollment, setEnrollment] = useState<ICourseEnrollment | null>(fakerUtil.enrollment);

  const enrollment: ICourseEnrollment | null = fakerUtil.enrollment;


  const watchIntroVideo = () => clearParams();

  const toggleLessonCompletion = (lessonId: string) => {
    const lessonIndex = course.lessons.findIndex(lesson => lesson.id === lessonId);
    if (lessonIndex === -1) return;
    const updatedLessons = [...course.lessons];
    updatedLessons[lessonIndex] = { ...updatedLessons[lessonIndex], completed: !updatedLessons[lessonIndex].completed };
    setCourse(prev => ({ ...prev, lessons: updatedLessons }));
  }

  if (!course) {
    return (
      <div className="w-full h-[calc(100vh-140px)] grid place-items-center place-content-center px-4">
        <Image src="/images/course-empty-state.svg" alt="Course not found" width={200} height={200} />
        <div className="space-y-2 max-w-md w-full">
          <p className="text-base text-center">Course not found</p>
          <p className="text-sm text-accent text-center">The course you are trying to access does not exist or may have been removed. Please return to your
            <Link href="/courses" className="text-primary-100 hover:underline"> courses </Link> or <Link href="/support" className="text-primary-100 hover:underline">contact support</Link> for further assistance</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <CourseHeader course={course} enrollment={enrollment} />
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <CourseMainContent course={course} />
        </div>
        <div className="relative col-span-2 space-y-8">
          <div className="sticky top-40 space-y-8">
            <Accordion defaultValue="overview" type="single" collapsible className="space-y-4">
              <AccordionItem value="overview">
                <AccordionTrigger>Overview</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-accent">{course.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Materials</AccordionTrigger>
                <AccordionContent className="space-y-2.5">
                  {course.materials.map((material, index) => (
                    <CourseMaterial key={index} material={material} />
                  ))}
                  {course.materials.length === 0 && (
                    <p className="text-sm text-accent">No materials available for this course.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Card className="space-y-4 !bg-transparent">
              <p className="text-sm font-semibold">Course Outline</p>
              <div onClick={watchIntroVideo} className="flex items-center justify-center gap-2 bg-[#00246B] py-2 px-4 rounded cursor-pointer">
                <p className="text-xs text-center">Intro video</p>
              </div>
              <hr className="border-b-[#B0CAFF1A]" />
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <CourseLessonCard key={index} index={index} lesson={lesson} toggleLessonCompletion={toggleLessonCompletion} courseEnrolled={!!enrollment} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}