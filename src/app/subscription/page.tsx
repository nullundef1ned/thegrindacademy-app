'use client';

import IconifyIcon from '@/components/IconifyIcon'
import useAxios from '@/hooks/useAxios';
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx';
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import { ISubscriptionPlan } from '../(student)/_module/student.interface';
import useCurrency from '@/hooks/useCurrency';
import { Checkbox } from '@/components/ui/checkbox';
import pluralize from 'pluralize';
import LoadingIcons from 'react-loading-icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { appRoutes } from '../_module/app.routes';
import StudentQueries from '../(student)/_module/student.queries';

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [autoRenewal, setAutoRenewal] = useState(false);

  const axiosHandler = useAxios();
  const { formatCurrency } = useCurrency();
  const { useFetchAuthenticationQuery } = StudentQueries();

  const { isPending: isUserPending } = useFetchAuthenticationQuery();


  const { data, isPending, error } = useQuery<ISubscriptionPlan[]>({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      return (await axiosHandler.get('website-content/subscription/plan')).data
    },
  })
  const { mutate: createSubscription, isPending: createSubscriptionLoading, error: createSubscriptionError } = useMutation({
    mutationFn: async () => {
      return (await axiosHandler.post('student/register', data)).data
    },
    onSuccess: (data) => {
      window.open(data, '_blank');
    }
  })

  const plans = data || [];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  }

  const toggleAutoRenewal = () => {
    setAutoRenewal(!autoRenewal);
  }

  const generateFrequency = (plan: ISubscriptionPlan) => {
    return `${plan.duration == 1 ? '' : plan.duration} ${pluralize(plan.frequency, plan.duration)}`
  }

  return (
    <Suspense fallback={<div className='w-full h-full flex items-center justify-center'><LoadingIcons.TailSpin /></div>}>
      <div className='responsive-section space-y-6 p-4 lg:px-10 h-screen w-screen grid grid-cols-1 place-items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='lg:col-span-2 flex items-center justify-center'>
            <Link href={appRoutes.home} className='flex items-center gap-2 text-accent'>
              <Image src='/logos/logo.svg' alt='Logo' width={240} height={32} />
            </Link>
          </div>
          <div className='flex flex-col gap-3'>
            <Link href={appRoutes.profile} className='flex items-center gap-2 text-accent'>
              <IconifyIcon icon='ri:arrow-left-s-line' className='text-xs flex items-center' />
              <p className='uppercase text-xs'>Return to Dashboard</p>
            </Link>
            <p className='text-2xl font-gishaBold'>Choose your subscription plan</p>
            <p className='text-sm text-accent'>Get unlimited access to expert-led courses and enroll in programs that accelerate your learning journey</p>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4 lg:min-h-[40vh]'>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={clsx(selectedPlan === plan.id ? 'border-[#004DE894] bg-[#00246b5e]' : 'border-[#004DE838] bg-[#00246B29] hover:bg-[#00246b5e] hover:border-[#004DE894]', 'border cursor-pointer w-full rounded p-4 py-6 flex items-center justify-between relative transition-all duration-300')}>
                  <div className='space-y-1'>
                    <p className='text-2xl font-medium font-gishaBold'>{formatCurrency(plan.price)} <span className='lowercase text-xs font-sans text-primary-100'>every {generateFrequency(plan)}</span></p>
                  </div>
                  <div className='flex items-center gap-4'>
                    {plan.isDeal &&
                      <div className='bg-primary/80 rounded px-2 py-1 h-max'>
                        <p className='text-[10px] font-medium whitespace-nowrap'>Best Deal</p>
                      </div>
                    }
                    <Checkbox id={`${plan.name}-checkbox`} className='rounded-full' checked={selectedPlan === plan.id} />
                  </div>
                </div>
              ))}

              {((isPending || isUserPending) && plans.length === 0) &&
                <div className='w-full h-full flex items-center justify-center'>
                  <LoadingIcons.TailSpin />
                </div>
              }

              {error && <p className='text-sm text-destructive text-center'>{error.message}</p>}
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <Checkbox id='auto-renewal' checked={autoRenewal} onCheckedChange={toggleAutoRenewal} />
                <label htmlFor='auto-renewal' className='text-sm font-medium'>Enable auto-renewal for hassle-free access</label>
              </div>
              <p className='text-sm text-accent'>If enabled, you&apos;ll be asked to enter your card details during payment for automatic renewals</p>
            </div>
            <div className='flex flex-col gap-4'>
              <Button disabled={!selectedPlan}
                loading={createSubscriptionLoading} onClick={() => createSubscription()} variant='default' className='w-max mx-auto'>Subscribe to the Grind</Button>
              {createSubscriptionError && <p className='text-sm text-destructive text-center'>{createSubscriptionError.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
