'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { adminRoutes } from "../../_module/admin.routes";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import Table from "@/components/table";
import useURL from "@/hooks/useURL";
import { TableHeader } from "@/components/table/table.interface";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { useRouter } from "next/navigation";
import { IStudentInterview } from "@/interfaces/student-interview";
import { useFetchStudentInterviews } from "./_apis/useFetchStudentInterviews";

export default function StudentInterviewsPage() {

  const router = useRouter();
  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Student Interviews' },
  ]

  const tableHeaders: TableHeader<IStudentInterview>[] = [
    { key: 'fullName', value: 'Name' },
    { key: 'description', value: 'Description' },
    { key: 'updatedAt', value: 'Last Updated', type: TableHeaderTypeEnum.DATE },
  ]

  const { data, isPending } = useFetchStudentInterviews({ search: searchValue, page, limit });

  const goToInterview = (studentInterview: IStudentInterview) => {
    router.push(`${adminRoutes.websiteContent.studentInterviews}/${studentInterview.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg font-medium">Student Interviews</p>
          <p className="text-sm text-accent">Manage student interviews to keep your website fresh and up to date</p>
        </div>
        <Button href={`${adminRoutes.websiteContent.studentInterviews}/new`} size="sm">Add New Interview</Button>
      </div>
      <Card>
        <Table<IStudentInterview>
          data={data}
          searchable
          skeletonCount={4}
          loading={isPending}
          headers={tableHeaders}
          onRowClick={goToInterview}
          emptyStateMessage={'No student interviews found'}
        />
      </Card>
    </div>
  )
}
