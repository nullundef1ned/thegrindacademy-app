'use client';

import StatisticsCard from "@/app/(student)/_components/StatisticsCard";
import { IUser } from "@/app/_module/app.interface";
import Card from "@/components/Card";
import Table from "@/components/table";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { TableHeader } from "@/components/table/table.interface";
import { useRouter } from "next/navigation";
import { useFetchUsers } from "../_module/_apis/useFetchUsers";
import useURL from "@/hooks/useURL";
import { adminRoutes } from "../_module/admin.routes";
import { useFetchUserStatistics } from "../_module/_apis/useFetchUserStatistics";

export default function UsersPage() {
  const router = useRouter();

  const { data: userStatisticsData, isPending: isUserStatisticsPending } = useFetchUserStatistics();

  const userStatistics = [
    {
      title: 'Total Users',
      value: userStatisticsData?.total.count || 0,
      icon: 'ri:user-fill',
      percentage: userStatisticsData?.total.percentageChange || 0,
    },
    {
      title: 'Subscribed Users',
      value: userStatisticsData?.subscribed.count || 0,
      icon: 'ri:money-dollar-circle-fill',
      percentage: userStatisticsData?.subscribed.percentageChange || 0,
    },
    {
      title: 'Suspended Users',
      value: userStatisticsData?.suspended.count || 0,
      icon: 'ri:alert-fill',
    },
  ]

  const tableHeaders: TableHeader<IUser>[] = [
    // @ts-expect-error this is a nested object
    { key: 'info.firstName+info.lastName', value: 'Name' },
    { key: 'email', value: 'Email', type: TableHeaderTypeEnum.EMAIL },
    // { key: 'lastLogin', value: 'Last Login', type: TableHeaderTypeEnum.DATE_TIME,  },
    { key: 'createdAt', value: 'Registration Date', type: TableHeaderTypeEnum.DATE },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { data, isPending } = useFetchUsers({ search: searchValue, page, limit });

  const goToUser = (user: IUser) => {
    router.push(`${adminRoutes.users}/${user.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {userStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} loading={isUserStatisticsPending} />
        ))}
      </div>
      <Card>
        <Table<IUser>
          data={data}
          searchable
          headers={tableHeaders}
          skeletonCount={4}
          onRowClick={goToUser}
          emptyStateMessage={`No users found`}
          loading={isPending}
        />
      </Card>
    </div>
  )
}
