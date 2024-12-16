'use client';

import { Button } from "@/components/ui/button";
import { useFetchUserDetails } from "../../_module/_apis/useFetchUser";
import Avatar from "@/components/Avatar";
import IconifyIcon from "@/components/IconifyIcon";
import helperUtil from "@/utils/helper.util";
import Status from "@/components/table/Status";
import Link from "next/link";
import Card from "@/components/Card";
import { ICourse } from "@/app/(student)/_module/_interfaces/course.interface";
import { useRouter } from "next/navigation";
import Table from "@/components/table";
import { useFetchCourses } from "../../_module/_apis/useFetchCourses";
import { TableHeader } from "@/components/table/table.interface";
import { useModal } from "@/providers/modal.provider";
import SuspendUserModal from "./_modals/SuspendUserModal";
import DeleteUserModal from "./_modals/DeleteUserModal";
import { adminRoutes } from "../../_module/admin.routes";
import LoadingIcons from "react-loading-icons";
import { useTitle } from "@/providers/title.provider";
import useAdminMutations from "../../_module/admin.mutations";
import notificationUtil from "@/utils/notification.util";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";

export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const { setTitle } = useTitle();
  const { showModal } = useModal();
  const { data, isPending } = useFetchUserDetails(id);
  const { updateUserStatusMutation } = useAdminMutations();
  const { data: courses, isPending: coursesPending } = useFetchCourses();

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
    { name: 'Users', link: adminRoutes.users },
    { name: `${data.info.firstName} ${data.info.lastName}` },
  ]

  const tableHeaders: TableHeader<ICourse>[] = [
    { key: 'name', value: 'Course Name' },
    { key: 'status', value: 'Status' },
  ]

  const goToCourse = (course: ICourse) => {
    router.push(`/courses/${course.slug}`);
  }

  setTitle(`${data.info.firstName} ${data.info.lastName} | User | The Grind Academy`);

  const reactivateUser = () => {
    updateUserStatusMutation.mutate({ id: data.id, status: 'active' }, {
      onSuccess: () => notificationUtil.success('User reactivated successfully')
    });
  }

  const openDeleteUserModal = () => showModal(<DeleteUserModal user={data} />);
  const openSuspendUserModal = () => showModal(<SuspendUserModal user={data} />);

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p className="text-xl font-medium">User Information</p>
        <div className="flex items-center gap-3">
          {data.status !== 'suspended' ? <Button onClick={openSuspendUserModal} size="sm">Suspend User</Button> :
            <Button onClick={reactivateUser} loading={updateUserStatusMutation.isPending} size="sm">Reactivate User</Button>
          }
          <Button onClick={openDeleteUserModal} size="sm" variant="destructive">Delete User</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-5 border-b pb-6">
        <Avatar src={data.info.avi} size={60} alt={`${data.info.firstName} ${data.info.lastName}`} type="square" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:account-circle-fill" className="text-xl" />
            <p className="text-sm font-medium">{data.info.firstName} {data.info.lastName}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:mail-fill" className="text-xl" />
            <a href={`mailto:${data.email}`} className="text-sm font-medium">{data.email}</a>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:telegram-fill" className="text-xl" />
            <p className="text-sm font-medium">{data.info.telegramUserName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Registration Date</p>
          <p className="text-sm font-medium">{helperUtil.formatDate(data.info.createdAt)}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Status</p>
          <Status status={data.status} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary-100">
            <IconifyIcon icon="ri:file-list-2-fill" className="text-xl" />
            <p className="text-sm font-medium">Plan</p>
          </div>
          <p className="text-sm text-accent">No active subscription</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary-100">
            <IconifyIcon icon="ri:calendar-event-fill" className="text-xl" />
            <p className="text-sm font-medium">Renewal Date</p>
          </div>
          <p className="text-sm text-accent">No active subscription</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-accent">Courses Enrolled</p>
        <Card>
          <Table<ICourse>
            hideFooter
            hideLimit
            data={courses}
            skeletonCount={4}
            searchable={false}
            headers={tableHeaders}
            onRowClick={goToCourse}
            loading={coursesPending}
            emptyStateMessage={`No courses found`}
          />
        </Card>
      </div>
    </div>
  )
}

