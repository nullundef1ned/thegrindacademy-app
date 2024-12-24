'use client';

import clsx from 'clsx';
import Card from '@/components/Card'
import IconifyIcon from '@/components/IconifyIcon';
import useCurrency from '@/hooks/useCurrency';
import helperUtil from '@/utils/helper.util';
import Skeleton from 'react-loading-skeleton';
import { Fragment } from 'react';

export type StatisticsCardType = 'number' | 'percentage' | 'currency';

export interface StatisticsCardProps {
  title: string;
  value: number;
  icon: string;
  loading?: boolean;
  className?: string;
  percentage?: number;
  type?: StatisticsCardType;
}

export default function StatisticsCard({ title, value, icon, type = 'number', loading, className, percentage }: StatisticsCardProps) {

  const { formatCurrency } = useCurrency()

  const valueFormatted = {
    number: helperUtil.convertToNumber(value),
    percentage: `${value}%`,
    currency: formatCurrency(value)
  }[type];

  const percentageValue = percentage !== undefined ? Number(percentage) : 0;

  const generatePercentageDirection = () => {
    if (percentageValue && percentageValue > 0) {
      return 'positive'
    } else if (percentageValue && percentageValue < 0) {
      return 'negative'
    }
    return 'neutral'
  }

  const percentageDirection = generatePercentageDirection();

  const percentageColor = {
    positive: '#0B3D23',
    negative: '#50051E',
    neutral: '#0B1225',
  }[percentageDirection]

  const percentageIcon = {
    positive: 'ri:arrow-up-line',
    negative: 'ri:arrow-down-line',
    neutral: 'pajamas:dash',
  }[percentageDirection]

  return (
    <Card className={clsx('space-y-4 flex flex-col justify-between', className)}>
      <div className="flex justify-between gap-4">
        <p className='text-accent text-sm'>{title}</p>
        <IconifyIcon icon={icon} className='text-primary-100' size={16} />
      </div>
      <div className="flex items-end justify-between">
        {loading ?
          <Skeleton height={28} width={80} baseColor="#12182B" highlightColor="#0C1227" /> :
          <p className='text-primary-50 text-2xl font-bold'>{valueFormatted.toLocaleString()}</p>
        }
        {percentage !== undefined && (
          <Fragment>
            {loading ?
              <Skeleton height={28} width={80} baseColor="#12182B" highlightColor="#0C1227" /> :
              <div className='flex items-center gap-2'>
                <p className='text-xs text-accent'>Since last week</p>
                <div style={{ backgroundColor: percentageColor }}
                  className={clsx("flex items-center gap-1 border h-6 rounded-full px-2 py-0", `border-${percentageColor}`)}>
                  <IconifyIcon icon={percentageIcon} className={clsx('text-xs opacity-80')} />
                  <p className={clsx('text-xs opacity-80 font-medium')}>{Math.abs(percentageValue)}%</p>
                </div>
              </div>
            }
          </Fragment>
        )}
      </div>
    </Card>
  )
}
