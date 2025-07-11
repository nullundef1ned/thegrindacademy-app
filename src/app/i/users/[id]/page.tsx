'use client';

import { Button } from "@/components/ui/button";
import { useFetchUserCourses, useFetchUserDetails, useFetchUserSubscriptionPlans } from "../../_module/_apis/useFetchUser";
import Avatar from "@/components/Avatar";
import IconifyIcon from "@/components/IconifyIcon";
import helperUtil from "@/utils/helper.util";
import Status from "@/components/table/Status";
import Link from "next/link";
import Card from "@/components/Card";
import { IEnrolledCourse } from "@/app/(student)/_module/_interfaces/course.interface";
import { useRouter } from "next/navigation";
import Table from "@/components/table";
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
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import UpdateUserTelegramModal from "./_modals/UpdateUserTelegramModal";
import SubscriptionModal from "./_modals/SubscriptionModal";
import { ISubscription } from "@/app/(student)/_module/student.interface";
import { useState } from "react";
import CancelSubscriptionModal from "./_modals/CancelSubscriptionModal";

export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [activeTab, setActiveTab] = useState<'courses' | 'subscriptions'>('courses');

  const router = useRouter();
  const { setTitle } = useTitle();
  const { showModal } = useModal();
  const { data, isPending } = useFetchUserDetails(id);
  const { updateUserStatusMutation } = useAdminMutations();

  const { data: subscriptions } = useFetchUserSubscriptionPlans(id);
  const { data: courses, isPending: coursesPending } = useFetchUserCourses(id);

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

  const user = data.user;
  const subscription = data.subscription;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Users', link: adminRoutes.users },
    { name: `${user.info.firstName} ${user.info.lastName}` },
  ]

  const tableHeaders: TableHeader<IEnrolledCourse>[] = [
    // @ts-expect-error nested object
    { key: 'course.name', value: 'Course Name' },
    { key: 'completionPercentage', value: 'Progress', type: TableHeaderTypeEnum.PROGRESS },
  ]

  const subscriptionTableHeaders: TableHeader<ISubscription>[] = [
    // @ts-expect-error nested object
    { key: 'subscriptionPlan.name', value: 'Plan Name' },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
    { key: 'autoRenewal', value: 'Auto Renewal', type: TableHeaderTypeEnum.BOOLEAN },
    { key: 'startDate', value: 'Start Date', type: TableHeaderTypeEnum.DATE_TIME },
    { key: 'endDate', value: 'End Date', type: TableHeaderTypeEnum.DATE_TIME },
  ]

  const goToCourse = (course: IEnrolledCourse) => {
    router.push(`/i/courses/${course.course.id}`);
  }

  setTitle(`${user.info.firstName} ${user.info.lastName} | Users`);

  const reactivateUser = () => {
    updateUserStatusMutation.mutate({ id: user.id, status: 'active' }, {
      onSuccess: () => notificationUtil.success('User reactivated successfully')
    });
  }

  const activateUser = () => {
    updateUserStatusMutation.mutate({ id: user.id, status: 'active' }, {
      onSuccess: () => notificationUtil.success('User activated successfully')
    });
  }

  const openDeleteUserModal = () => showModal(<DeleteUserModal user={user} />);
  const openSuspendUserModal = () => showModal(<SuspendUserModal user={user} />);
  const openSubscriptionModal = () => showModal(<SubscriptionModal user={user} />);
  const openUpdateUserTelegramModal = () => showModal(<UpdateUserTelegramModal user={user} />);
  const openCancelSubscriptionModal = () => showModal(<CancelSubscriptionModal user={user} subscription={subscription} />);

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <p className="text-xl font-medium">User Information</p>
        <div className="flex items-center gap-3">
          {
            user.status === 'inactive' ? (
              <Button onClick={activateUser} loading={updateUserStatusMutation.isPending} size="sm">Activate User</Button>
            ) : (
              user.status !== 'suspended' ? <Button onClick={openSuspendUserModal} size="sm">Suspend User</Button> :
                <Button onClick={reactivateUser} loading={updateUserStatusMutation.isPending} size="sm">Reactivate User</Button>

            )
          }
          <Button onClick={openDeleteUserModal} size="sm" variant="destructive">Delete User</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-5 border-b pb-6">
        <Avatar src={user.info.avi} size={60} alt={`${user.info.firstName} ${user.info.lastName}`} type="square" />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:account-circle-fill" className="text-xl" />
            <p className="text-sm font-medium">{user.info.firstName} {user.info.lastName}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:mail-fill" className="text-xl" />
            <a href={`mailto:${user.email}`} className="text-sm font-medium">{user.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <IconifyIcon icon="ri:telegram-fill" className="text-xl" />
            <p className="text-sm font-medium">{user.info.telegramUserName}</p>
            <p onClick={openUpdateUserTelegramModal} className="text-xs text-accent cursor-pointer">Edit</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Registration Date</p>
          <p className="text-sm font-medium">{helperUtil.formatDate(user.createdAt)}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-accent">Status</p>
          <Status status={user.status} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary-100">
            <IconifyIcon icon="ri:file-list-2-fill" className="text-xl" />
            <p className="text-sm font-medium">Plan</p>
          </div>
          {subscription ?
            <p className="text-sm text-accent">{
              subscription?.subscriptionPlan ? subscription?.subscriptionPlan.name : 'Plan no longer available'
            }</p> :
            <p className="text-sm text-accent">No active subscription</p>
          }
        </div>
        {subscription && user.status === 'active' && (
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary-100">
                <IconifyIcon icon="ri:calendar-event-fill" className="text-xl" />
                {subscription?.autoRenewal ? <p className="text-sm font-medium">Renewal Date</p> :
                  <p className="text-sm font-medium">Expiration Date</p>
                }
              </div>
              <p className="text-sm text-accent">{helperUtil.formatDate(subscription?.endDate)} <span className="text-xs text-muted-foreground">(in {helperUtil.getTimeTo(subscription?.endDate)})</span></p>
            </div>
            <Button onClick={openCancelSubscriptionModal} size="sm" variant="destructive">Cancel Subscription</Button>
          </div>
        )}
        {!subscription && user.status === 'active' && (
          <Button onClick={openSubscriptionModal} size="sm">Add Plan</Button>
        )
        }
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className={`text-sm text-accent cursor-pointer hover:text-primary-50 ${activeTab === 'courses' ? 'text-primary-100' : ''}`} onClick={() => setActiveTab('courses')}>Enrolled Courses</p>
          <p className={`text-sm text-accent cursor-pointer hover:text-primary-50 ${activeTab === 'subscriptions' ? 'text-primary-100' : ''}`} onClick={() => setActiveTab('subscriptions')}>Subscription History</p>
        </div>
        {activeTab === 'courses' && (
          <Card>
            <Table<IEnrolledCourse>
              data={courses}
              skeletonCount={4}
              searchable={false}
              headers={tableHeaders}
              onRowClick={goToCourse}
              loading={coursesPending}
              emptyStateMessage={`No courses found`}
            />
          </Card>
        )}
        {activeTab === 'subscriptions' && (
          <Card>
            <Table<ISubscription>
              data={subscriptions}
              skeletonCount={4}
              searchable={false}
              headers={subscriptionTableHeaders}
            />
          </Card>
        )}
      </div>
    </div>
  )
}

