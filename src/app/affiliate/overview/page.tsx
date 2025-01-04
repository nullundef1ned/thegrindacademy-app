'use client';

import StatisticsCard, { StatisticsCardProps } from '@/components/StatisticsCard'
import IconifyIcon from '@/components/IconifyIcon';
import Card from '@/components/Card';
import Link from 'next/link';
import AffiliateBankDetailsCard from '../_components/AffiliateBankDetailsCard';
import PayoutTrendGraph from './_components/PayoutTrendGraph';
import RevenueVsVisitCountGraph from './_components/RevenueVsVisitCountGraph';
import { useFetchAffiliateDashboardReportQuery } from '@/hooks/api/affiliate/useAffiliateReports';
import { useModal } from '@/providers/modal.provider';
import MailMarketingModal from './_components/MailMarketingModal';

export default function OverviewPage() {
  const { data: dashboardReport, isPending } = useFetchAffiliateDashboardReportQuery();
  const { showModal } = useModal();

  const overviewStatistics: StatisticsCardProps[] = [
    {
      title: 'Total Payout',
      value: dashboardReport?.totalPayout || 0,
      icon: 'ri:money-dollar-circle-fill',
      type: 'currency',
    },
    {
      title: 'Total Referrals',
      value: dashboardReport?.totalReferrals || 0,
      icon: 'ri:checkbox-circle-fill',
    },
    {
      title: 'Total Views',
      value: dashboardReport?.totalViews || 0,
      icon: 'ri:eye-fill',
    }
  ]

  const handleOpenMailMarketingModal = () => showModal(<MailMarketingModal />)

  return (
    <div className='space-y-6 responsive-section'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {overviewStatistics.map((item, index) => (
          <StatisticsCard
            key={index}
            className='h-full'
            loading={isPending}
            {...item}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className='col-span-1 lg:col-span-3 flex flex-col space-y-4'>
          <PayoutTrendGraph />
          <RevenueVsVisitCountGraph />
        </div>
        <div className='col-span-1 lg:col-span-2 space-y-4'>
          <p className='text-accent font-medium'>Quick Links</p>
          <Card className='flex items-center gap-3 !p-3 group'>
            <IconifyIcon icon="mdi:telegram" className="text-2xl" />
            <Link href='https://t.me/thegrindacademy' target='_blank' className="flex items-center gap-1 justify-between w-full">
              <p className='text-sm font-medium'>Telegram Affiliate Community</p>
              <IconifyIcon icon="ri:arrow-right-up-line" className="text-lg group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </Card>
          <AffiliateBankDetailsCard />
          <Card className='flex items-center gap-3 !p-3 group cursor-pointer'>
            <IconifyIcon icon="ri:mail-fill" className="text-2xl" />
            <div onClick={handleOpenMailMarketingModal} className="flex items-center gap-1 justify-between w-full">
              <p className='text-sm font-medium'>Send Mail Campaign</p>
              {/* <IconifyIcon icon="ri:arrow-right-up-line" className="text-lg group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" /> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
