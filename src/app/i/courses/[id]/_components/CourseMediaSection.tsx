import React, { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import { ICourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import { useFormik } from 'formik';
import { IAdminCourseMediaForm } from '@/interfaces/course';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import { useFetchAdminCourseMedia } from '../../_apis/useFetchAdminCourseMedia';
import Image from 'next/image';
import Video from '@/components/Video';
import FileUploader from '@/components/FileUploader';
import IconifyIcon from '@/components/IconifyIcon';
import LoadingIcons from 'react-loading-icons';

interface ICourseInformationSectionProps {
  course: ICourseDetail;
}

export default function CourseMediaSection({ course }: ICourseInformationSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false)
    resetForm();
  };

  const { createOrUpdateCourseMediaMutation } = useAdminCourseMutations();

  const { data, isPending } = useFetchAdminCourseMedia(course?.id);

  const { handleSubmit, setFieldValue, values, resetForm } = useFormik<IAdminCourseMediaForm>({
    enableReinitialize: true,
    initialValues: {
      courseId: course?.id,
      thumbnailUrl: data?.thumbnailUrl || '',
      imageUrls: data?.imageUrls || [],
      introVideoUrl: data?.introVideoUrl || '',
    },
    onSubmit: (values) => {
      createOrUpdateCourseMediaMutation.mutate(values, {
        onSuccess: () => {
          setIsEditing(false);
        }
      });
    },
  });

  const removeImage = (url: string) => {
    setFieldValue('imageUrls', values.imageUrls.filter((imageUrl) => imageUrl !== url));
  }

  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4 justify-between">
        <p className="font-medium text-accent">Course Media</p>
        {isEditing ? (
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button loading={createOrUpdateCourseMediaMutation.isPending} size="sm" onClick={() => handleSubmit()}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={startEditing}>
            Edit
          </Button>
        )}
      </div>
      <Card className="divide-y !py-0">
        {isPending ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <LoadingIcons.TailSpin className='text-lg' />
            <p className="text-sm font-medium text-primary-50">Loading Media...</p>
          </div>
        ) : (
          <Fragment>
            {!isEditing ? (
              <Fragment>
                <div className='flex flex-col gap-3 py-4'>
                  <p className="text-sm font-semibold text-primary-50">Course Thumbnail</p>
                  <div className="relative w-full h-60">
                    <Image src={data?.thumbnailUrl || ''} alt="Course Image" fill className='object-cover absolute' />
                  </div>
                </div>
                <div className='flex flex-col gap-3 py-4'>
                  <p className="text-sm font-semibold text-primary-50">Course Intro Video</p>
                  <Video src={data?.introVideoUrl || ''} />
                </div>
                <div className='flex flex-col gap-3 py-4'>
                  <p className="text-sm font-semibold text-primary-50">Course Images</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {data?.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="relative w-full h-40">
                        <Image src={imageUrl} alt="Course Image" fill className='object-cover absolute' />
                      </div>
                    ))}
                  </div>
                </div>
              </Fragment>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-primary-50">Course Thumbnail</p>
                  <FileUploader provider='do-spaces' type='course' fileType='image' onChange={(url) => setFieldValue('thumbnailUrl', url)} />
                  <div className="relative w-full h-60">
                    <Image src={values.thumbnailUrl} alt="Course Image" fill className='object-cover absolute' />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-primary-50">Course Intro Video</p>
                  <FileUploader provider='bunny' type='course' fileType='video' onChange={(url) => setFieldValue('introVideoUrl', url)} />
                  <Video src={values.introVideoUrl} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-primary-50">Course Images</p>
                  <FileUploader provider='do-spaces' type='course' fileType='image' onChange={(url) => setFieldValue('imageUrls', [...values.imageUrls, url])} />
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {values?.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="relative w-full h-40">
                        <Image src={imageUrl} alt="Course Image" fill className='object-cover absolute' />
                        <div className="absolute top-2 right-2 cursor-pointer grid place-items-center size-6 rounded-full bg-red-700/60 hover:bg-red-700/90 transition-all duration-300" onClick={() => removeImage(imageUrl)}>
                          <IconifyIcon icon="ri:close-line" className="text-primary-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </Fragment>
        )}
      </Card>
    </div>
  )
}
