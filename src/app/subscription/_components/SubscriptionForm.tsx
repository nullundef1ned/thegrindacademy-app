import { ISubscriptionForm, ISubscriptionPlan } from '@/app/(student)/_module/student.interface'
import useStudentMutations from '@/app/(student)/_module/student.mutations'
import StudentQueries from '@/app/(student)/_module/student.queries'
import { appRoutes } from '@/app/_module/app.routes'
import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import useCurrency from '@/hooks/useCurrency'
import { clsx } from 'clsx'
import { useFormik } from 'formik'
import Link from 'next/link'
import pluralize from 'pluralize'
import React, { Fragment } from 'react'
import LoadingIcons from 'react-loading-icons'

export default function SubscriptionForm() {
  const { formatCurrency } = useCurrency();

  const { useFetchSubscriptionQuery, useFetchSubscriptionPlansQuery, useFetchAuthenticationQuery } = StudentQueries();

  const { data: subscription } = useFetchSubscriptionQuery();
  const { isPending: isUserPending } = useFetchAuthenticationQuery();
  const { data, isPending, error } = useFetchSubscriptionPlansQuery();

  const { createOrUpdateSubscriptionMutation } = useStudentMutations();

  const { handleSubmit, setFieldValue, values } = useFormik<ISubscriptionForm>({
    initialValues: {
      subscriptionPlanId: "",
      autoRenewal: false
    },
    onSubmit: (values) => {
      createOrUpdateSubscriptionMutation.mutate(values, {
        onSuccess: (data) => {
          setTimeout(() => {
            window.location.href = data.paymentData.authorization_url
          }, 2000)
        }
      })
    }
  })

  const activeSubscriptionPlan = subscription?.active?.subscriptionPlan;

  const plans = data?.filter(plan => plan.id !== activeSubscriptionPlan?.id) || [];

  const generateFrequency = (plan: Omit<ISubscriptionPlan, 'features'>) => {
    return `${plan.duration == 1 ? '' : plan.duration} ${pluralize(plan.frequency, plan.duration)}`
  }

  if (createOrUpdateSubscriptionMutation.isSuccess) {
    return (
      <div className='lg:col-span-2 flex flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center justify-center gap-4 border p-4 max-w-md'>
          <LoadingIcons.TailSpin />
          <p className='text-xl font-semibold text-center'>Redirecting to payment page...</p>
          <p className='text-center font-light'>
            You will be redirected to make payment for your subscription shortly
          </p>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <div className='flex flex-col gap-3'>
        <Link href={appRoutes.profile} className='flex items-center gap-2 text-accent'>
          <IconifyIcon icon='ri:arrow-left-s-line' className='text-xs flex items-center' />
          <p className='uppercase text-xs'>Return to Dashboard</p>
        </Link>
        <p className='text-2xl font-gishaBold'>{activeSubscriptionPlan ? 'Change' : 'Choose'} your subscription plan</p>
        <p className='text-sm text-accent'>Get unlimited access to expert-led courses and enroll in programs that accelerate your learning journey</p>
      </div>
      <div className='flex flex-col gap-6'>
        {activeSubscriptionPlan &&
          <div className='flex flex-col gap-4'>
            <p className='text-sm text-accent'>Current Plan</p>
            <div
              className={clsx(
                'border-[#004DE894] bg-[#00246b5e]',
                'border cursor-pointer w-full rounded p-4 py-6 flex items-center justify-between relative transition-all duration-300')}>
              <div className='space-y-1'>
                <p className='text-2xl font-medium font-gishaBold'>{formatCurrency(activeSubscriptionPlan.price)} <span className='lowercase text-xs font-sans text-primary-100'>every {generateFrequency(activeSubscriptionPlan)}</span></p>
              </div>
              <div className='flex items-center gap-4'>
                {activeSubscriptionPlan.isDeal &&
                  <div className='bg-primary/80 rounded px-2 py-1 h-max'>
                    <p className='text-[10px] font-medium whitespace-nowrap'>Best Deal</p>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        <div className='flex flex-col gap-4'>
          <p className='text-sm text-accent'>Select a plan</p>
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={() => setFieldValue('subscriptionPlanId', plan.id)}
              className={clsx(values.subscriptionPlanId === plan.id ?
                'border-[#004DE894] bg-[#00246b5e]' :
                'border-[#004DE838] bg-[#00246B29] hover:bg-[#00246b5e] hover:border-[#004DE894]',
                'border cursor-pointer w-full rounded p-4 py-6 flex items-center justify-between relative transition-all duration-300')}>
              <div className='space-y-1'>
                <p className='text-2xl font-medium font-gishaBold'>{formatCurrency(plan.price)} <span className='lowercase text-xs font-sans text-primary-100'>every {generateFrequency(plan)}</span></p>
              </div>
              <div className='flex items-center gap-4'>
                {plan.isDeal &&
                  <div className='bg-primary/80 rounded px-2 py-1 h-max'>
                    <p className='text-[10px] font-medium whitespace-nowrap'>Best Deal</p>
                  </div>
                }
                <Checkbox id={`${plan.name}-checkbox`} className='rounded-full' checked={values.subscriptionPlanId === plan.id} />
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
            <Checkbox id='auto-renewal' checked={values.autoRenewal} onCheckedChange={() => setFieldValue('autoRenewal', !values.autoRenewal)} />
            <label htmlFor='auto-renewal' className='text-sm font-medium'>Enable auto-renewal for hassle-free access</label>
          </div>
          <p className='text-sm text-accent'>If enabled, you&apos;ll be asked to enter your card details during payment for automatic renewals</p>
        </div>
        <div className='flex flex-col gap-4'>
          <Button disabled={!values.subscriptionPlanId}
            loading={createOrUpdateSubscriptionMutation.isPending} onClick={() => handleSubmit()} variant='default' className='w-max mx-auto'>
            {activeSubscriptionPlan ? 'Change Plan' : 'Subscribe to the Grind'}
          </Button>
          {createOrUpdateSubscriptionMutation.error && <p className='text-sm text-destructive text-center'>{createOrUpdateSubscriptionMutation.error.message}</p>}
        </div>
      </div>
    </Fragment>
  )
}
