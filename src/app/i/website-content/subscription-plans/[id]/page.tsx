'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import React from 'react'
import { useFetchSubscriptionPlan } from '../_apis/useFetchSubscriptionPlan';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import notificationUtil from '@/utils/notification.util';
import helperUtil from '@/utils/helper.util';
import { useModal } from '@/providers/modal.provider';
import Link from 'next/link';
import LoadingIcons from 'react-loading-icons';
import { useTitle } from '@/providers/title.provider';
import useSubscriptionPlanMutations from '../_apis/subscription-plan.mutations';
import { ISubscriptionPlanForm } from '@/interfaces/subscription';
import { ISubscriptionPlan } from '@/app/(student)/_module/student.interface';
import ConfirmSubscriptionPlanDeletionModal from '../_modals/ConfirmSubscriptionPlanDeletionModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import pluralize from 'pluralize';

export default function SubscriptionPlanDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { showModal } = useModal();
  const { setTitle } = useTitle();
  const { data, isPending } = useFetchSubscriptionPlan(id);
  const { updateSubscriptionPlanMutation, deleteSubscriptionPlanMutation, createSubscriptionPlanMutation } = useSubscriptionPlanMutations();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<ISubscriptionPlanForm>({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      price: data?.price || '',
      frequency: data?.frequency || '',
      duration: data?.duration || 0,
      isDeal: data?.isDeal || false,
      features: data?.features.map((feature) => ({ featureId: feature.id })) || [],
    },
    onSubmit: (values) => {
      if (id === 'new') {
        createSubscriptionPlanMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success('Subscription plan created successfully');
          }
        });
      } else {
        updateSubscriptionPlanMutation.mutate({ ...values, id }, {
          onSuccess: () => {
            notificationUtil.success('Subscription plan updated successfully');
          }
        });
      }
    },
  });

  if (isPending && id !== 'new') return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  if (!data && id !== 'new') return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center place-content-center gap-4">
      <p className="text-sm text-accent">Subscription plan not found</p>
      <Link href={adminRoutes.websiteContent.subscriptionPlans} className="text-sm underline">Go back to Subscription Plans</Link>
    </div>
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Subscription Plans', link: adminRoutes.websiteContent.subscriptionPlans },
    { name: id === 'new' ? 'Add New Subscription Plan' : data?.name || 'Subscription Plan not found' },
  ]

  const loading = updateSubscriptionPlanMutation.isPending;
  const isFormValid = values.name && values.price && values.frequency && values.duration

  setTitle(`${data?.name || 'Subscription Plan not found'} | Subscription Plans`);

  const openDeleteModal = (data: ISubscriptionPlan) => showModal(<ConfirmSubscriptionPlanDeletionModal subscriptionPlan={data} />);

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>Subscription Plan</p>
          {data?.updatedAt &&
            <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
          }
        </div>
        {data &&
          <Button size='sm' variant='destructive' loading={deleteSubscriptionPlanMutation.isPending} onClick={() => openDeleteModal(data)}>Delete</Button>
        }
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='name'
          required
          value={values.name}
          onChange={handleChange}
          placeholder='Name'
        />
        <Input
          name='price'
          type='number'
          required
          value={values.price}
          onChange={handleChange}
          placeholder='Price'
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs text-accent">Every</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name='duration'
              type='number'
              required
              min={1}
              value={values.duration}
              onChange={handleChange}
              placeholder='Duration'
            />
            <Select
              name='frequency'
              required
              value={values.frequency}
              onValueChange={(value) => setFieldValue('frequency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Frequency' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='month'>{pluralize('month', values.duration)}</SelectItem>
                <SelectItem value='year'>{pluralize('year', values.duration)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id='isDeal'
              name='isDeal'
              checked={values.isDeal}
              onCheckedChange={(checked) => setFieldValue('isDeal', checked)}
            />
            <label htmlFor='isDeal' className='text-sm cursor-pointer'>Is this a deal?</label>
          </div>
          <p className="text-xs text-accent">This will indicate to your visitors that this is a deal and would recommend it over the other subscription plans.</p>
        </div>
        <Button disabled={!isFormValid}
          loading={loading}
          type='submit' size='sm'
          className='w-full col-span-2'>
          Update
        </Button>
      </form>
    </div>
  )
}
