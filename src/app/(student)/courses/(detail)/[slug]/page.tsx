'use client';

import CourseHeader from "../_components/CourseHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Card from "@/components/Card";
import CourseLessonCard from "../_components/CourseLessonCard";
import Image from "next/image";
import Link from "next/link";
import CourseMaterial from "../_components/CourseMaterial";
import CourseMainContent from "../_components/CourseMainContent";
import useURL from "@/hooks/useURL";
import StudentQueries from "../../../_module/student.queries";
import LoadingIcons from "react-loading-icons";
import { Button } from "@/components/ui/button";
import { ICourseMaterial, IEnrolledCourseLesson } from "@/app/(student)/_module/_interfaces/course.interface";
import IconifyIcon from "@/components/IconifyIcon";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { clearParams } = useURL();

  const { useFetchEnrolledCourseDetailQuery, useFetchCourseTelegramInviteQuery, useFetchAuthenticationQuery } = StudentQueries();

  const { data: user } = useFetchAuthenticationQuery();
  const { data: telegramInvite } = useFetchCourseTelegramInviteQuery(params.slug);
  const { data, isPending, isError, refetch } = useFetchEnrolledCourseDetailQuery(params.slug);

  const course = data || null;

  if (isPending) {
    return <div className="w-full h-[calc(100vh-140px)] grid place-items-center place-content-center px-4">
      <LoadingIcons.TailSpin className="size-10" />
    </div>
  }

  if (!course) {
    return (
      <div className="w-full h-[calc(100vh-140px)] grid place-items-center place-content-center px-4">
        <Image src="/images/course-empty-state.svg" alt="Course not found" width={200} height={200} />
        <div className="space-y-2 max-w-md w-full">
          <p className="text-base text-center">Course not found</p>
          <p className="text-sm text-accent text-center">The course has been removed or you are not enrolled in it. Please return to your
            <Link href="/courses" className="text-primary-100 hover:underline"> courses </Link> or <Link href="/support" className="text-primary-100 hover:underline">contact support</Link> for further assistance</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return <div className="w-full h-[calc(100vh-140px)] grid place-items-center place-content-center px-4 gap-4">
      <Image src="/images/course-empty-state.svg" alt="Course not found" width={200} height={200} />
      <div className="space-y-2 flex flex-col items-center max-w-md w-full">
        <p className="text-base text-center">Something went wrong</p>
        <p className="text-sm text-accent">Failed to fetch course details</p>
        <Button size="sm" onClick={() => refetch()}>Try again</Button>
      </div>
    </div>
  }

  const lessons = course?.lessons || [];

  const watchIntroVideo = () => clearParams();

  return (
    <div className="w-full space-y-6">
      <CourseHeader course={course} />
      <div className="grid lg:grid-cols-6 gap-6 responsive-section">
        <div className="lg:col-span-4">
          <CourseMainContent course={course} />
        </div>
        <div className="relative lg:col-span-2 space-y-8">
          <div className="sticky top-40 gap-8 grid w-full">
            <Accordion defaultValue="overview" type="single" collapsible className="space-y-4 order-last lg:order-first">
              <AccordionItem value="overview">
                <AccordionTrigger>Overview</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-accent">{course.course.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Materials</AccordionTrigger>
                <AccordionContent className="space-y-2.5">
                  {course.course.materials.map((material: ICourseMaterial, index: number) => (
                    <CourseMaterial key={index} material={material} />
                  ))}
                  {course.course.materials.length === 0 && (
                    <p className="text-sm text-accent">No materials available for this course.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {telegramInvite && user?.info.telegramUserName &&
              <Button onClick={() => window.open(telegramInvite, '_blank')} className="w-full order-first lg:order-2">
                <IconifyIcon icon="ri:telegram-fill" className="flex items-center" size={16} />
                Join Telegram Community
              </Button>
            }
            <Card className="space-y-4 !bg-transparent order-2 lg:order-last">
              <p className="text-sm font-semibold">Course Outline</p>
              <div onClick={watchIntroVideo} className="flex items-center justify-center gap-2 bg-[#00246B] py-2 px-4 rounded cursor-pointer">
                <p className="text-xs text-center">Intro video</p>
              </div>
              <hr className="border-b-[#B0CAFF1A]" />
              <div className="space-y-4">
                {lessons.map((lesson: IEnrolledCourseLesson, index: number) => (
                  <CourseLessonCard key={index} index={index} course={course} lesson={lesson} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}