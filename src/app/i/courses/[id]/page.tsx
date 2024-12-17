'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ICourse } from "@/app/(student)/_module/_interfaces/course.interface";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/modal.provider";
import { adminRoutes } from "../../_module/admin.routes";
import LoadingIcons from "react-loading-icons";
import { useTitle } from "@/providers/title.provider";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { useFetchAdminCourse } from "../_apis/useFetchAdminCourse";
import DeleteCourseModal from "./_modals/DeleteCourseModal";
import CourseInformationSection from "./_components/CourseInformationSection";

export default function AdminCourseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
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
      <p className="text-sm text-accent">User not found</p>
      <Link href={adminRoutes.users} className="text-sm underline">Go back to users</Link>
    </div>
  )

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Courses', link: adminRoutes.courses },
    { name: data.name },
  ]

  const goToCourse = (course: ICourse) => {
    router.push(`/courses/${course.slug}`);
  }

  setTitle(`${data.name} | Course | The Grind Academy`);


  const openDeleteCourseModal = () => showModal(<DeleteCourseModal course={data} />);

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p className="text-xl font-medium">{data.name}</p>
        <div className="flex items-center gap-3">
          <Button onClick={openDeleteCourseModal} size="sm" variant="destructive">Delete Course</Button>
        </div>
      </div>
      <CourseInformationSection />
    </div>
  )
}

