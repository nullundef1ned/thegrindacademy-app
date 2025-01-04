'use client';

import StatisticsCard, { StatisticsCardProps } from '@/components/StatisticsCard';
import { IUser } from "@/app/_module/app.interface";
import Card from "@/components/Card";
import Table from "@/components/table";
import { TableHeaderTypeEnum } from "@/components/table/table.enum";
import { TableHeader } from "@/components/table/table.interface";
import { useRouter } from "next/navigation";
import useURL from "@/hooks/useURL";
import { adminRoutes } from "../_module/admin.routes";
import { useFetchAdminAffiliateStatistics } from '../_module/_apis/useAdminReports';
import { useFetchAffiliates } from '../_module/_apis/useAdminAffiliates';
import { IAffiliate } from '../_module/_interfaces/affiliate.interface';

export default function AffiliatesPage() {
  const router = useRouter();
  const { searchParams } = useURL();

  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { data, isPending } = useFetchAffiliates({ search: searchValue, page, limit });
  const { data: affiliateStatisticsData, isPending: isAffiliateStatisticsPending } = useFetchAdminAffiliateStatistics();

  const affiliateStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Affiliates',
      value: affiliateStatisticsData?.totalAffiliates || 0,
      icon: 'ri:user-fill',
    },
    {
      title: 'Active Affiliates',
      value: affiliateStatisticsData?.activeAffiliates || 0,
      icon: 'ri:ancient-pavilion-line',
    },
    {
      title: 'Total Payout',
      value: affiliateStatisticsData?.totalPayout || 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency',
    },
  ]

  const tableHeaders: TableHeader<IAffiliate>[] = [
    // @ts-expect-error this is a nested object
    { key: 'info.firstName+info.lastName', value: 'Name' },
    { key: 'email', value: 'Email', type: TableHeaderTypeEnum.EMAIL },
    // @ts-expect-error this is a nested object
    { key: 'info.telegramUserName', value: 'Telegram Username' },
    { key: 'referrals', value: 'Referrals', type: TableHeaderTypeEnum.NUMBER },
    { key: 'views', value: 'Views', type: TableHeaderTypeEnum.NUMBER },
    { key: 'payout', value: 'Payout', type: TableHeaderTypeEnum.CURRENCY },
    { key: 'status', value: 'Status', type: TableHeaderTypeEnum.STATUS },
  ]

  const goToUser = (user: IUser) => {
    router.push(`${adminRoutes.affiliates}/${user.id}`);
  }

  return (
    <div className='w-full responsive-section space-y-6'>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {affiliateStatistics.map((statistic, index) => (
          <StatisticsCard key={index} {...statistic} loading={isAffiliateStatisticsPending} />
        ))}
      </div>
      <Card>
        <Table<IAffiliate>
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
