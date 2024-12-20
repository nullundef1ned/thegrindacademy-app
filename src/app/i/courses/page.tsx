'use client';

import Card from "@/components/Card";
import Table from "@/components/table";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { TableHeader } from "@/components/table/table.interface";
import { useRouter } from "next/navigation";
import { useFetchAdminCourses } from "./_apis/useFetchAdminCourses";
import useURL from "@/hooks/useURL";
import { adminRoutes } from "../_module/admin.routes";
import { Button } from "@/components/ui/button";
import { IAdminCourse } from "@/interfaces/course";
import { CourseStatusType } from "@/app/_module/app.type";

export default function CoursesPage() {
  const router = useRouter();

  const tableHeaders: TableHeader<IAdminCourse>[] = [
    { key: 'name', value: 'Name' },
    { key: 'shortDescription', value: 'Short Description' },
    { key: 'isFeatured', value: 'Featured', type: TableHeaderTypeEnum.FEATURED },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
    { key: 'updatedAt', value: 'Last Modified', type: TableHeaderTypeEnum.DATE },
    { key: 'createdAt', value: 'Date Created', type: TableHeaderTypeEnum.DATE },
  ]

  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const status = searchParams.get('status') as CourseStatusType;
  const isFeatured = searchParams.get('isFeatured') === 'true';

  const { data, isPending } = useFetchAdminCourses({ search: searchValue, page, limit, status, isFeatured });

  const goToCourse = (course: IAdminCourse) => {
    router.push(`${adminRoutes.courses}/${course.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className='text-2xl font-medium'>Courses</p>
          <p className='text-sm text-accent'>Manage courses, including adding new ones, editing existing ones, and updating their status</p>
        </div>
        <Button size='sm' href={`${adminRoutes.courses}/new`}>Create Course</Button>
      </div>
      <Card>
        <Table<IAdminCourse>
          data={data}
          searchable
          headers={tableHeaders}
          skeletonCount={4}
          onRowClick={goToCourse}
          emptyStateMessage={`No courses found`}
          loading={isPending}
        />
      </Card>

    </div>
  )
}
