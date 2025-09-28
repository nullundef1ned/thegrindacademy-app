'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import React from 'react'
import { useFetchStudentInterview } from '../_apis/useFetchStudentInterview';
import { useFormik } from 'formik';
import { IStudentInterview, IStudentInterviewForm } from '@/interfaces/student-interview';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/FileUploader';
import Image from 'next/image';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import helperUtil from '@/utils/helper.util';
import { useModal } from '@/providers/modal.provider';
import Link from 'next/link';
import LoadingIcons from 'react-loading-icons';
import { useTitle } from '@/providers/title.provider';
import useStudentInterviewMutations from '../_apis/student-interview.mutations';
import ConfirmStudentInterviewDeletionModal from './_modals/ConfirmStudentInterviewDeletionModal';

export default function DynamicContentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const { setTitle } = useTitle();
  const { showModal } = useModal();
  const { data, isPending } = useFetchStudentInterview(id);
  const { createStudentInterviewMutation, updateStudentInterviewMutation, deleteStudentInterviewMutation } = useStudentInterviewMutations();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<IStudentInterviewForm>({
    enableReinitialize: true,
    initialValues: {
      fullName: data?.fullName || '',
      description: data?.description || '',
      mediaUrl: data?.mediaUrl || '',
    },
    onSubmit: (values) => {
      if (!values.mediaUrl) return notificationUtil.error('Please upload a video');

      if (id === 'new') {
        createStudentInterviewMutation.mutate(values, {
          onSuccess: () => {
            notificationUtil.success(`Student interview created successfully`);
            router.push(adminRoutes.websiteContent.studentInterviews);
          }
        });
      } else {
        updateStudentInterviewMutation.mutate({ ...values, id }, {
          onSuccess: () => {
            notificationUtil.success('Student interview updated successfully');
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
      <p className="text-sm text-accent">Student interview not found</p>
      <Link href={adminRoutes.websiteContent.studentInterviews} className="text-sm underline">Go back to student interviews</Link>
    </div>
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Student Interviews', link: adminRoutes.websiteContent.studentInterviews },
    { name: id === 'new' ? 'Add New Interview' : data?.fullName || 'Interview not found' },
  ]

  setTitle(`${id === 'new' ? 'Add New Interview' : data?.fullName || 'Interview not found'} | Student Interviews`);

  const loading = createStudentInterviewMutation.isPending || updateStudentInterviewMutation.isPending;
  const isFormValid = values.fullName && values.description && values.mediaUrl;

  const openDeleteModal = (data: IStudentInterview) => showModal(<ConfirmStudentInterviewDeletionModal studentInterview={data} />);

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>{id === 'new' ? 'Add New Interview' : data?.fullName || 'Untitled Interview'}</p>
          {data?.updatedAt &&
            <div className='flex items-center gap-2'>
              <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
            </div>
          }
        </div>
        {data &&
          <Button size='sm' variant='destructive' loading={deleteStudentInterviewMutation.isPending} onClick={() => openDeleteModal(data)}>Delete</Button>
        }
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='fullName'
          required
          value={values.fullName}
          onChange={handleChange}
          placeholder='Full Name'
        />
        <Textarea
          name='description'
          required
          value={values.description}
          onChange={handleChange}
          placeholder='Description'
        />
        <FileUploader provider='do-spaces' type='website-content' fileType='video' onChange={(url) => setFieldValue('mediaUrl', url)} />
        {values.mediaUrl &&
          <div className='w-full h-40 relative group'>
            <div className='absolute inset-0 bg-black/70 h-full w-full z-10 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div onClick={() => setFieldValue('mediaUrl', '')}
                className='flex items-center gap-2 py-2 px-4 rounded-md bg-white/40 cursor-pointer'>
                <p className='text-white text-sm'>Remove Video</p>
              </div>
            </div>
            <Image src={values.mediaUrl} alt='Media' fill className='object-cover absolute' />
          </div>
        }
        <Button disabled={!isFormValid}
          loading={loading}
          type='submit' size='sm'
          className='w-full '>
          {id === 'new' ? 'Add Interview' : 'Update Interview'}
        </Button>
      </form>
    </div>
  )
}
