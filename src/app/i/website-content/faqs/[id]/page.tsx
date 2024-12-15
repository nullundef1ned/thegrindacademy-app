'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import React from 'react'
import { useFetchFAQ } from '../_apis/useFetchFAQ';
import { useFormik } from 'formik';
import { FAQType, IFAQ, IFAQForm } from '@/interfaces/faq';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFAQMutations from '../_apis/faq.mutations';
import notificationUtil from '@/utils/notification.util';
import helperUtil from '@/utils/helper.util';
import { useModal } from '@/providers/modal.provider';
import Link from 'next/link';
import LoadingIcons from 'react-loading-icons';
import ConfirmFAQDeletionModal from '../_modals/ConfirmFAQDeletionModal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTitle } from '@/providers/title.provider';

export default function DynamicContentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { showModal } = useModal();
  const { setTitle } = useTitle();
  const { data, isPending } = useFetchFAQ(id);
  const { updateFAQMutation, deleteFAQMutation } = useFAQMutations();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<IFAQForm>({
    enableReinitialize: true,
    initialValues: {
      question: data?.question || '',
      answer: data?.answer || '',
      type: data?.type || FAQType.STUDENT
    },
    onSubmit: (values) => {
      updateFAQMutation.mutate({ ...values, id }, {
        onSuccess: () => {
          notificationUtil.success('FAQ updated successfully');
        }
      });
    },
  });

  if (isPending && id !== 'new') return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  if (!data && id !== 'new') return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center place-content-center gap-4">
      <p className="text-sm text-accent">FAQ not found</p>
      <Link href={adminRoutes.websiteContent.faqs} className="text-sm underline">Go back to FAQs</Link>
    </div>
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'FAQs', link: adminRoutes.websiteContent.faqs },
    { name: data?.question || 'FAQ not found' },
  ]

  const loading = updateFAQMutation.isPending;
  const isFormValid = values.question && values.answer;

  setTitle(`${data?.question || 'FAQ not found'} | FAQs`);

  const openDeleteModal = (data: IFAQ) => showModal(<ConfirmFAQDeletionModal faq={data} />);

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>FAQ Details</p>
          {data?.updatedAt &&
            <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
          }
        </div>
        {data &&
          <Button size='sm' variant='destructive' loading={deleteFAQMutation.isPending} onClick={() => openDeleteModal(data)}>Delete</Button>
        }
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='question'
          required
          value={values.question}
          onChange={handleChange}
          placeholder='Question'
        />
        <Textarea
          name='content'
          required
          value={values.answer}
          onChange={handleChange}
          placeholder='Answer'
        />
        <div className='space-y-2'>
          <p className='text-sm text-accent'>Select the type of FAQ</p>
          <RadioGroup defaultValue={FAQType.GENERAL} name='type' value={values.type} onValueChange={(value) => setFieldValue('type', value)} className='grid grid-cols-2 gap-2'>
            <label htmlFor={FAQType.GENERAL} className='flex items-center gap-2 bg-[#00246B33] p-3 rounded border border-[#B0CAFF1A] cursor-pointer'>
              <RadioGroupItem value={FAQType.GENERAL} id={FAQType.GENERAL} />
              <p className='text-sm'>General</p>
            </label>
            <label htmlFor={FAQType.STUDENT} className='flex items-center gap-2 bg-[#00246B33] p-3 rounded border border-[#B0CAFF1A] cursor-pointer'>
              <RadioGroupItem value={FAQType.STUDENT} id={FAQType.STUDENT} />
              <p className='text-sm'>Student</p>
            </label>
          </RadioGroup>
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
