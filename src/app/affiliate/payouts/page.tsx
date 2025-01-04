'use client';

import StatisticsCard, { StatisticsCardProps } from '@/components/StatisticsCard';
import Card from "@/components/Card";
import Table from "@/components/table";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { TableHeader } from "@/components/table/table.interface";
import useURL from "@/hooks/useURL";
import { IPayout } from '@/app/(student)/_module/student.interface';
import { useFetchPayoutsQuery, useFetchReferralStatisticsQuery } from '@/hooks/api/affiliate/useAffiliateReferral';

export default function PayoutsPage() {
  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const referralStatisticsQuery = useFetchReferralStatisticsQuery();
  const { data, isPending } = useFetchPayoutsQuery({ page, limit, search: searchValue });

  const userStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Payouts',
      value: referralStatisticsQuery.data?.total || 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency'
    },
    {
      title: 'Pending Payouts',
      value: referralStatisticsQuery.data?.pending || 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency'
    },
    {
      title: 'Paid Payouts',
      value: referralStatisticsQuery.data?.paid || 0,
      icon: 'ri:alert-fill',
      type: 'currency'
    },
  ]

  const tableHeaders: TableHeader<IPayout>[] = [
    { key: 'createdAt', value: 'Date', type: TableHeaderTypeEnum.DATE },
    { key: 'amount', value: 'Amount', type: TableHeaderTypeEnum.CURRENCY },
    // @ts-expect-error this is a nested object
    { key: 'userReferral.referee.info.firstName+userReferral.referee.info.lastName', value: 'Name' },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {userStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} loading={false} />
        ))}
      </div>
      <Card>
        <Table<IPayout>
          data={data}
          searchable
          headers={tableHeaders}
          skeletonCount={4}
          emptyStateMessage={`No payouts found`}
          loading={isPending}
        />
      </Card>
    </div>
  )
}
