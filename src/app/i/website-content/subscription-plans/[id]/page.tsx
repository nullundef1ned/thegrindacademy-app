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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import pluralize from 'pluralize';
import { useFetchPlanFeatures } from '../_apis/useSubscriptions';
import AddFeatureForm from './_components/AddFeatureForm';
// import IconifyIcon from '@/components/IconifyIcon';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

export default function SubscriptionPlanDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const { showModal } = useModal();
  const { setTitle } = useTitle();
  const { data: features } = useFetchPlanFeatures();
  const { data, isPending } = useFetchSubscriptionPlan(id);
  const { updateSubscriptionPlanMutation, createSubscriptionPlanMutation } = useSubscriptionPlanMutations();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<ISubscriptionPlanForm>({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
      price: data?.price || 0,
      upSellPrice: data?.upSellPrice || 0,
      frequency: data?.frequency || 'month',
      duration: data?.duration || 1,
      isDeal: data?.isDeal || false,
      isDisabled: data?.isDisabled || false,
      features: data?.features.map(({ featureId }) => ({ featureId })) || [],
    },
    onSubmit: (values) => {
      if (values.features.length === 0) return notificationUtil.error('Please select at least one feature');

      if (id === 'new') {
        createSubscriptionPlanMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success('Subscription plan created successfully');
            router.push(adminRoutes.websiteContent.subscriptionPlans);
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

  const loading = id === 'new' ? createSubscriptionPlanMutation.isPending : updateSubscriptionPlanMutation.isPending;
  const isFormValid = values.name && values.price && values.frequency && values.duration

  setTitle(`${id === 'new' ? 'Add New' : data?.name || 'Subscription Plan not found'} | Subscription Plans`);

  const toggleFeature = (featureId: string) => {
    if (values.features.some(feature => feature.featureId === featureId)) {
      setFieldValue('features', values.features.filter(feature => feature.featureId !== featureId));
    } else {
      setFieldValue('features', [...values.features, { featureId }]);
    }
  }

  const toggleDisabled = () => {
    updateSubscriptionPlanMutation.mutate({ ...values, id, isDisabled: !values.isDisabled }, {
      onSuccess: () => {
        notificationUtil.success(`Subscription plan ${values.isDisabled ? 'disabled' : 'enabled'} successfully`);
      }
    });
  }

  // const deleteFeature = (featureId: string) => {
  //   deletePlanFeatureMutation.mutate(featureId);
  // }

  // const openDeleteModal = (data: ISubscriptionPlan) => showModal(<ConfirmSubscriptionPlanDeletionModal subscriptionPlan={data} />);

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
          <div className="flex items-center gap-2">
            <Switch id='isDisabled' checked={values.isDisabled} onCheckedChange={toggleDisabled} />
            <label htmlFor='isDisabled' className='text-sm cursor-pointer'>{!values.isDisabled ? 'Disable' : 'Enable'}</label>
            {/* {data &&
            <Button size='sm' variant='destructive' loading={deleteSubscriptionPlanMutation.isPending} onClick={() => openDeleteModal(data)}>Delete</Button>
          } */}
          </div>
        }
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='name'
          title='Name'
          required
          value={values.name}
          onChange={handleChange}
          placeholder='Name'
        />
        <Input
          name='price'
          title='Price'
          type='number'
          required
          value={values.price}
          onChange={handleChange}
          placeholder='Price'
        />
        <Input
          name='upSellPrice'
          title='Up Sell Price'
          type='number'
          value={values.upSellPrice}
          onChange={handleChange}
          placeholder='Up Sell Price'
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Features</p>
            <p className="text-xs text-accent">Select features to add to this subscription plan</p>
          </div>
          <AddFeatureForm />
          <div className="grid md:grid-cols-2 gap-4">
            {features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 justify-between border border-[#B0CAFF1A] bg-[#00246B33] py-2.5 px-3 rounded">
                <label htmlFor={feature.id} className="flex items-center gap-4 w-full cursor-pointer">
                  <Checkbox
                    id={feature.id}
                    checked={values.features.some(f => f.featureId === feature.id)}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                  <label htmlFor={feature.id} className="text-sm cursor-pointer">{feature.content}</label>
                </label>
                {/* <div className="cursor-pointer" onClick={() => deleteFeature(feature.id)}>
                  <IconifyIcon icon='ri:delete-bin-7-fill' className='text-red-500' />
                </div> */}
              </div>
            ))}
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
          {id === 'new' ? 'Create' : 'Update'}
        </Button>
      </form>
    </div>
  )
}
