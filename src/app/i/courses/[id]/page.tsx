'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useModal } from "@/providers/modal.provider";
import { adminRoutes } from "../../_module/admin.routes";
import LoadingIcons from "react-loading-icons";
import { useTitle } from "@/providers/title.provider";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { useFetchAdminCourse } from "../_apis/useFetchAdminCourse";
import DeleteCourseModal from "./_modals/DeleteCourseModal";
import CourseInformationSection from "./_components/CourseInformationSection";
import CourseMediaSection from "./_components/CourseMediaSection";
import CourseMaterialsSection from "./_components/CourseMaterialsSection";
import CourseLessonsSection from "./_components/CourseLessonsSection";

export default function AdminCourseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { setTitle } = useTitle();
  const { showModal } = useModal();
  const { data, isPending } = useFetchAdminCourse(id);

  if (isPending) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  if (!data) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center place-content-center gap-4">
      <p className="text-sm text-accent">Course not found</p>
      <Link href={adminRoutes.courses} className="text-sm underline">Go back to courses</Link>
    </div>
  )

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Courses', link: adminRoutes.courses },
    { name: data.name },
  ]

  setTitle(`${data.name} | Course | The Grind Academy`);

  const openDeleteCourseModal = () => showModal(<DeleteCourseModal course={data} />);

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8 pb-10'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p className="text-xl font-medium">{data.name}</p>
        <div className="flex items-center gap-3">
          <Button onClick={openDeleteCourseModal} size="sm" variant="destructive">Delete Course</Button>
        </div>
      </div>
      <CourseInformationSection course={data} />
      <CourseMediaSection course={data} />
      <CourseLessonsSection course={data} />
      <CourseMaterialsSection course={data} />
    </div>
  )
}

