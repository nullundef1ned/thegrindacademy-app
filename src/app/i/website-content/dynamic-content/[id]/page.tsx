'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import React from 'react'
import { useFetchDynamicContentSection } from '../_apis/useFetchDynamicContentSection';
import { useFormik } from 'formik';
import { IDynamicContent, IDynamicContentForm } from '@/interfaces/dynamic-content';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import Image from 'next/image';
import useDynamicContentMutations from '../_apis/dynamic-content.mutations';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import helperUtil from '@/utils/helper.util';
import { useModal } from '@/providers/modal.provider';
import ConfirmDynamicContentDeletionModal from './_modals/ConfirmDynamicContentDeletionModal';
import Link from 'next/link';
import LoadingIcons from 'react-loading-icons';
import Status from '@/components/table/Status';

export default function DynamicContentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const { showModal } = useModal();
  const { data, isPending } = useFetchDynamicContentSection(id);
  const { createDynamicContentMutation, updateDynamicContentMutation, deleteDynamicContentMutation } = useDynamicContentMutations();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<IDynamicContentForm>({
    initialValues: {
      title: data?.title || '',
      content: data?.content || '',
      isPublished: data?.isPublished || false,
      mediaUrl: data?.mediaUrl || '',
    },
    onSubmit: (values) => {
      if (!values.mediaUrl) return notificationUtil.error('Please upload an image');

      if (id === 'new') {
        createDynamicContentMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success(`Dynamic content section created ${values.isPublished ? 'and published' : ''} successfully`);
            router.push(adminRoutes.websiteContent.dynamicContent);
          }
        });
      } else {
        updateDynamicContentMutation.mutate({ ...values, id }, {
          onSuccess: () => {
            notificationUtil.success('Dynamic content section updated successfully');
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
      <p className="text-sm text-accent">Content not found</p>
      <Link href={adminRoutes.websiteContent.dynamicContent} className="text-sm underline">Go back to dynamic content</Link>
    </div>
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Dynamic Content', link: adminRoutes.websiteContent.dynamicContent },
    { name: id === 'new' ? 'Add New Section' : data?.title || 'Content not found' },
  ]

  const loading = createDynamicContentMutation.isPending || updateDynamicContentMutation.isPending;
  const isFormValid = values.title && values.content && values.mediaUrl;

  const openDeleteModal = (data: IDynamicContent) => showModal(<ConfirmDynamicContentDeletionModal dynamicContent={data} />);

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>{id === 'new' ? 'Add New Section' : data?.title || 'Untitled Section'}</p>
          {data?.updatedAt &&
            <div className='flex items-center gap-2'>
              <Status status={data.isPublished ? 'published' : 'draft'} />
              <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
            </div>
          }
        </div>
        {data &&
          <Button size='sm' variant='destructive' loading={deleteDynamicContentMutation.isPending} onClick={() => openDeleteModal(data)}>Delete</Button>
        }
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='title'
          required
          value={values.title}
          onChange={handleChange}
          placeholder='Section Title'
        />
        <Textarea
          name='content'
          required
          value={values.content}
          onChange={handleChange}
          placeholder='Section Content'
        />
        <FileUploader provider='do-spaces' type='website-content' fileType='image' onChange={(url) => setFieldValue('mediaUrl', url)} />
        {values.mediaUrl &&
          <div className='w-full h-40 relative group'>
            <div className='absolute inset-0 bg-black/70 h-full w-full z-10 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div onClick={() => setFieldValue('mediaUrl', '')}
                className='flex items-center gap-2 py-2 px-4 rounded-md bg-white/40 cursor-pointer'>
                <p className='text-white text-sm'>Remove Image</p>
              </div>
            </div>
            <Image src={values.mediaUrl} alt='Media' fill className='object-cover absolute' />
          </div>
        }
        <div className='grid grid-cols-3 gap-4'>
          <Button disabled={!isFormValid}
            loading={loading && !values.isPublished}
            type='submit' size='sm' variant='outline'
            className='w-full'
            onClick={() => setFieldValue('isPublished', false)}>
            {data?.id ? 'Unpublish' : 'Save'}
          </Button>
          <Button disabled={!isFormValid}
            loading={loading && values.isPublished}
            type='submit' size='sm'
            className='w-full col-span-2'
            onClick={() => setFieldValue('isPublished', true)}>
            {data?.id ? 'Update & Publish' : 'Save & Publish'}
          </Button>
        </div>
      </form>
    </div>
  )
}
