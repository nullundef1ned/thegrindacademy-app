'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import React from 'react'
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import Image from 'next/image';
import notificationUtil from '@/utils/notification.util';
import helperUtil from '@/utils/helper.util';
import LoadingIcons from 'react-loading-icons';
import { useFetchInfluencer } from './_apis/useFetchInfluencer';
import useInfluencerMutations from './_apis/influencer.mutations';
import { IInfluencerForm } from '@/interfaces/influencer';

export default function InfluencerPage() {

  const { data, isPending } = useFetchInfluencer();
  const { createOrUpdateInfluencerMutation } = useInfluencerMutations();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<IInfluencerForm>({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || '',
      content: data?.content || '',
      mediaUrl: data?.mediaUrl || '',
      thumbnailUrl: data?.thumbnailUrl || '',
      buttonText: data?.buttonText || '',
      buttonUrl: data?.buttonUrl || '',
      isPublished: data?.isPublished || false,
    },
    onSubmit: (values) => {
      if (!values.thumbnailUrl) return notificationUtil.error('Please upload a thumbnail');
      if (!values.mediaUrl) return notificationUtil.error('Please upload a video');

      createOrUpdateInfluencerMutation.mutate(values, {
        onSuccess: () => {
          notificationUtil.success('Influencer updated successfully');
        }
      });
    },
  });

  if (isPending) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Influencer', link: adminRoutes.websiteContent.influencer },
    { name: data?.title || values.title || 'Untitled Influencer' },
  ]

  const loading = createOrUpdateInfluencerMutation.isPending;
  const isFormValid = values.title && values.content && values.mediaUrl && values.thumbnailUrl;

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>Influencer Details</p>
          {data?.updatedAt &&
            <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='title'
          required
          value={values.title}
          onChange={handleChange}
          placeholder='Influencer Name'
        />
        <Textarea
          name='content'
          required
          value={values.content}
          onChange={handleChange}
          placeholder='Campaign Content'
        />
        <div className="grid grid-cols-2 gap-4">
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-accent'>Thumbnail</p>
            <FileUploader provider='do-spaces' type='others' fileType='image' onChange={(url) => setFieldValue('thumbnailUrl', url)} />
            {values.thumbnailUrl &&
              <div className='w-full h-40 relative group'>
                <div className='absolute inset-0 bg-black/70 h-full w-full z-10 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div onClick={() => setFieldValue('thumbnailUrl', '')}
                    className='flex items-center gap-2 py-2 px-4 rounded-md bg-white/40 cursor-pointer'>
                    <p className='text-white text-sm'>Remove Image</p>
                  </div>
                </div>
                <Image src={values.thumbnailUrl} alt='Media' fill className='object-cover absolute' />
              </div>
            }
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-accent'>Media</p>
            <FileUploader provider='do-spaces' type='others' fileType='any' onChange={(url) => setFieldValue('mediaUrl', url)} />
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
          </div>
        </div>
        <Input
          name='buttonText'
          value={values.buttonText}
          onChange={handleChange}
          placeholder='Button Text'
        />
        <Input
          name='buttonUrl'
          type='url'
          required={!!values.buttonText}
          value={values.buttonUrl}
          onChange={handleChange}
          placeholder='Button URL'
        />

        <div className='grid grid-cols-3 gap-4'>
          <Button disabled={!isFormValid}
            loading={loading}
            type='submit' size='sm' variant='outline'
            className='w-full'
            onClick={() => setFieldValue('isPublished', !values.isPublished)}>
            {data?.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Button disabled={!isFormValid}
            loading={loading}
            type='submit' size='sm'
            className='w-full col-span-2'>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
