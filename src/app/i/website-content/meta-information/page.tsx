'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import Image from 'next/image';
import notificationUtil from '@/utils/notification.util';
import helperUtil from '@/utils/helper.util';
import LoadingIcons from 'react-loading-icons';
import { useFetchMetaInformation } from './_apis/useFetchMetaInformation';
import useMetaInformationMutations from './_apis/meta-information.mutations';
import { IMetaInformationForm } from '@/interfaces/meta-information';
import Video from '@/components/Video';

export default function MetaInformationPage() {
  const { data, isPending } = useFetchMetaInformation();
  const { createOrUpdateMetaInformationMutation } = useMetaInformationMutations();

  const socialMediaTypes = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'snapchat', 'telegram', 'discord'];

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<IMetaInformationForm>({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || '',
      description: data?.description || '',
      keywords: data?.keywords || '',
      imageUrl: data?.imageUrl || '',
      landingPageThumbnailUrl: data?.landingPageThumbnailUrl || '',
      landingPageVideoUrl: data?.landingPageVideoUrl || '',
      supportEmail: data?.supportEmail || '',
      socialMediaLinks: data?.socialMediaLinks || [],
    },
    onSubmit: (values) => {

      createOrUpdateMetaInformationMutation.mutate(values, {
        onSuccess: () => {
          notificationUtil.success('Meta information updated successfully');
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
    { name: 'Meta Information' },
  ]

  const updateSocialMediaLink = (type: string, url: string) => {
    const updatedLinks = [...values.socialMediaLinks];
    const index = updatedLinks.findIndex(link => link.type === type);
    if (index !== -1) {
      if (url) {
        updatedLinks[index] = { type, url };
      } else {
        updatedLinks.splice(index, 1);
      }
    } else if (url) {
      updatedLinks.push({ type, url });
    }
    setFieldValue('socialMediaLinks', updatedLinks);
  }

  const loading = createOrUpdateMetaInformationMutation.isPending;
  const isFormValid = values.title && values.description && values.keywords && values.imageUrl && values.supportEmail;

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>Website Meta Information</p>
          {data?.updatedAt &&
            <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="flex flex-col gap-1">
          <Input
            title='Website Title'
            name='title'
            required
            value={values.title}
            onChange={handleChange}
            placeholder='Website Title'
          />
          {!values.title && <p className='text-xs text-destructive'>Required</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Textarea
            title='Website Description'
            name='description'
            required
            value={values.description}
            onChange={handleChange}
            placeholder='Website Description'
          />
          {!values.description && <p className='text-xs text-destructive'>Required</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <Input
            title='Keywords'
            name='keywords'
            required
            value={values.keywords}
            onChange={handleChange}
            placeholder='Keywords'
          />
          <p className='text-xs text-accent'>
            <span className='text-destructive'>{values.keywords && 'Required | '}</span>
            Separate keywords with commas</p>
        </div>
        <Input
          title='Support Email'
          name='supportEmail'
          type='email'
          value={values.supportEmail}
          onChange={handleChange}
          placeholder='Support Email'
        />
        <div className='flex flex-col gap-2'>
          <p className='font-medium text-accent'>Landing Page Details</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-accent'>Thumbnail</p>
              <FileUploader provider='do-spaces' type='others' fileType='image' onChange={(url) => setFieldValue('landingPageThumbnailUrl', url)} />
              {values.landingPageThumbnailUrl &&
                <div className='w-full h-40 relative group'>
                  <Image src={values.landingPageThumbnailUrl} alt='Media' fill className='object-cover absolute' />
                </div>
              }
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm text-accent'>Video</p>
              <FileUploader provider='do-spaces' type='others' fileType='video' onChange={(url) => setFieldValue('landingPageVideoUrl', url)} />
              {values.landingPageVideoUrl &&
                <Video src={values.landingPageVideoUrl} />
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm text-accent'>SEO Image {!values.imageUrl && <span className='text-destructive'> - Required</span>}</p>
          <FileUploader provider='do-spaces' type='others' fileType='image' onChange={(url) => setFieldValue('imageUrl', url)} />
          {values.imageUrl &&
            <div className='w-full h-40 relative group'>
              <div className='absolute inset-0 bg-black/70 h-full w-full z-10 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div onClick={() => setFieldValue('imageUrl', '')}
                  className='flex items-center gap-2 py-2 px-4 rounded-md bg-white/40 cursor-pointer'>
                  <p className='text-white text-sm'>Remove Image</p>
                </div>
              </div>
              <Image src={values.imageUrl} alt='Media' fill className='object-cover absolute' />
            </div>
          }
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-sm text-accent'>Social Media Links</p>
          <div className="grid md:grid-cols-2 gap-2">
            {socialMediaTypes.map((type, index) => (
              <Input
                key={index}
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                name={type}
                type='url'
                icon={`ri:${type}-fill`}
                value={values.socialMediaLinks.find(link => link.type === type)?.url || ''}
                onChange={(e) => updateSocialMediaLink(type, e.target.value)}
                placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </div>
        </div>
        <Button disabled={!isFormValid}
          loading={loading}
          type='submit' size='sm'
          className='w-full '>
          Update
        </Button>
      </form>
    </div>
  )
}
