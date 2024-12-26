import React, { Fragment } from 'react'
import { clsx } from 'clsx'
import useCurrency from '@/hooks/useCurrency'

import { type ChartConfig } from "@/components/ui/chart"
import Skeleton from 'react-loading-skeleton'
import LoadingIcons from 'react-loading-icons'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'
import StackedBarChart from './charts/StackedBarChart'
import { Button } from './ui/button'
import IconifyIcon from './IconifyIcon'
import DashboardCard from './DashboardCard'
import Image from 'next/image'


export enum TimeFrameEnum {
  SEVEN_DAYS = '7-days',
  THIRTY_DAYS = '30-days',
  TWELVE_MONTHS = '12-months',
}

export enum ChartTypeEnum {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  STACKED_BAR = 'stackedBar',
}

export type ChartType = ChartTypeEnum;

type GraphCardProps = {
  title: string;
  amount?: string | number;
  percentage?: number;
  loading?: boolean;
  isError: boolean;
  refetch: () => void;
  isFetching: boolean;
  type?: 'currency' | 'number';
  chart: {
    type: ChartType;
    data: unknown[];
    config: ChartConfig;
  },
  className?: string;
  footer?: {
    text: string;
    link: string;
  }
  errorMessage?: string;
  activePeriod?: TimeFrameEnum;
  setActivePeriod?: (period: TimeFrameEnum) => void;
}

export default function GraphCard({ title, amount, percentage, chart, loading, isError, errorMessage, refetch, isFetching, type = 'number', className, footer, activePeriod, setActivePeriod }: GraphCardProps) {
  const periods = Object.values(TimeFrameEnum);

  const { formatCurrency } = useCurrency();

  const total = type == 'currency' ? formatCurrency(amount || 0) : amount?.toLocaleString();

  const backgroundFills = ['#004DE8', '#3377FF', '#B0CAFF', '#00246B', '#1A62FF', '#6699FF', '#D4E3FF', '#001A4D', '#0033B3', '#80A9FF']

  const pieChartData = chart.data.map((data: any, index: number) => ({ ...data, fill: data.fill || backgroundFills[index % backgroundFills.length] }))

  const percentageData = {
    icon: percentage ? percentage > 0 ? 'ic:outline-trending-up' : (percentage == 0 ? 'jam:minus' : 'ic:outline-trending-down') : '',
    color: percentage ? percentage > 0 ? 'text-green-500' : (percentage == 0 ? 'text-grey-600' : 'text-red-200') : '',
  }

  const selectPeriod = (period: TimeFrameEnum) => {
    setActivePeriod?.(period)
  }

  return (
    <DashboardCard className={className} footer={footer}>
      <div className='flex flex-col-reverse 2xl:flex-row 2xl:items-center flex-wrap gap-4 justify-between'>
        <div className='space-y-4 w-max'>
          <p className='text-primary-50 font-medium'>{title}</p>
          {(total == undefined && percentage == undefined) ? null :
            <div>
              {total == undefined ? null :
                <Fragment>
                  {loading ?
                    <Skeleton baseColor='#201F1F' className='mb-2' highlightColor='#3B3939' count={1} height={24} width={136} /> :
                    <p className='heading-2 semibold'>{total}</p>
                  }
                </Fragment>
              }
              {percentage == undefined ? null :
                <Fragment>
                  {loading ?
                    <Skeleton baseColor='#201F1F' className='mt-1' highlightColor='#3B3939' count={1} height={20} width={230} /> :
                    <div className={clsx('flex items-center space-x-1', percentageData.color)}>
                      <IconifyIcon icon={percentageData.icon} width={20} height={20} />
                      <p className='body-1 semibold'>{Number(percentage.toFixed(2)).toLocaleString()}%</p>
                      <p className='body-1 text-black-50'>in the last {activePeriod?.replace('-', ' ')}</p>
                    </div>
                  }
                </Fragment>
              }
            </div>
          }
        </div>
        {activePeriod == undefined ? null :
          <div className='flex-shrink-0 w-max border-black-400 border-opacity-45 border divide-x divide-black-400 divide-opacity-45 flex items-center rounded-md h-max'>
            {periods.reverse().map((period, index) => (
              <div key={index}
                onClick={() => selectPeriod(period)}
                className={clsx('py-2 px-4 cursor-pointer hover:bg-[#00246B]/20', activePeriod == period && ' bg-[#00246B]/70')}>
                <p className='text-sm'>{period.replace('-', ' ')}</p>
              </div>
            ))}
          </div>
        }
      </div>
      {chart &&
        <Fragment>
          {isError ?
            <div className='h-80 grid place-items-center place-content-center space-y-3'>
              <p className='text-sm text-black-50 text-center'>An error occurred fetching data</p>
              <Button size='sm' onClick={() => { refetch() }} loading={isFetching}>Retry</Button>
            </div> :
            <div className='min-h-80 flex-shrink-0 space-y-3 w-full'>
              {loading ?
                <div className='h-80 grid place-items-center w-full'>
                  <LoadingIcons.TailSpin />
                </div> :
                <Fragment>
                  {chart.data.length == 0 ?
                    <div className='h-full grid place-items-center place-content-center gap-2 w-full'>
                      <Image src="/images/empty-state.svg" alt="No data" width={100} height={100} />
                      <p className='text-sm text-black-50 text-center'>{errorMessage || 'No data available'}</p>
                    </div> :
                    <Fragment>
                      {{
                        'bar': <BarChart chartConfig={chart.config} chartData={chart.data} />,
                        'line': <LineChart chartConfig={chart.config} chartData={chart.data} />,
                        'pie': <PieChart chartConfig={chart.config} chartData={pieChartData} />,
                        'stackedBar': <StackedBarChart chartConfig={chart.config} chartData={chart.data} />
                      }[chart.type]}
                      <Fragment>
                        {chart.type == ChartTypeEnum.PIE &&
                          <div className='grid grid-cols-3 gap-3 grid-rows-3 w-full overflow-x-auto'>
                            {pieChartData.map((data: any, index: number) => (
                              <div key={index} className='flex flex-col items-center gap-2 justify-between'>
                                <div className="flex items-center gap-1.5">
                                  <div className='size-2 rounded-full flex-shrink-0' style={{ backgroundColor: data.fill }} />
                                  <p className='text-sm text-primary-100 font-medium'>{data.percentage}%</p>
                                </div>
                                <p className='text-sm text-accent'>{data.name}</p>
                              </div>
                            ))}
                          </div>
                        }
                      </Fragment>
                    </Fragment>
                  }
                </Fragment>
              }
            </div>
          }
        </Fragment>
      }
    </DashboardCard>
  )
}
