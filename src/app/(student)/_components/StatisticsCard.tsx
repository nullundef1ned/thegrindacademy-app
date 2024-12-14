'use client';

import clsx from 'clsx';
import Card from '@/components/Card'
import IconifyIcon from '@/components/IconifyIcon';
import useCurrency from '@/hooks/useCurrency';
import helperUtil from '@/utils/helper.util';
import Skeleton from 'react-loading-skeleton';

export type StatisticsCardType = 'number' | 'percentage' | 'currency';

export interface StatisticsCardProps {
  title: string;
  value: number;
  icon: string;
  loading?: boolean;
  className?: string;
  type?: StatisticsCardType;
}

export default function StatisticsCard({ title, value, icon, type = 'number', loading, className }: StatisticsCardProps) {

  const { formatCurrency } = useCurrency()

  const valueFormatted = {
    number: helperUtil.convertToNumber(value),
    percentage: `${value}%`,
    currency: formatCurrency(value)
  }[type]

  return (
    <Card className={clsx('space-y-2 flex flex-col justify-between', className)}>
      <div className="flex justify-between gap-4">
        <p className='text-accent text-sm'>{title}</p>
        <IconifyIcon icon={icon} className='text-primary-100' size={16} />
      </div>
      {loading ?
        <Skeleton height={28} width={80} baseColor="#12182B" highlightColor="#0C1227" /> :
        <p className='text-primary-50 text-2xl font-bold'>{valueFormatted}</p>
      }
    </Card>
  )
}
