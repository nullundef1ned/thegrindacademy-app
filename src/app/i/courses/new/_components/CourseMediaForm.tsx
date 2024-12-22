import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import { useFormik } from 'formik';
import { IAdminCourseMediaForm } from '@/interfaces/course';
import { Button } from '@/components/ui/button';
import { useCourseForm } from '../page';
import FileUploader from '@/components/FileUploader';
import * as yup from 'yup';
import Video from '@/components/Video';
import Image from 'next/image';
import IconifyIcon from '@/components/IconifyIcon';

export default function CourseMediaForm() {

  const { course: { id: courseId, media }, setCourseMedia, goToNextStep } = useCourseForm();
  const { createOrUpdateCourseMediaMutation } = useAdminCourseMutations();

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik<IAdminCourseMediaForm>({
    enableReinitialize: true,
    initialValues: {
      courseId,
      thumbnailUrl: media.thumbnailUrl,
      imageUrls: media.imageUrls,
      introVideoUrl: media.introVideoUrl,
    },
    validationSchema: yup.object({
      thumbnailUrl: yup.string().required('Thumbnail is required'),
      imageUrls: yup.array().min(1, 'At least one image is required').max(5, 'Maximum 5 images are allowed'),
      introVideoUrl: yup.string().required('Intro video is required'),
    }),
    onSubmit: (values) => {
      createOrUpdateCourseMediaMutation.mutate(values, {
        onSuccess: () => {
          setCourseMedia(values);
          goToNextStep();
        }
      });
    },
  });

  const removeImage = (imageUrl: string) => {
    setFieldValue('imageUrls', values.imageUrls.filter((url) => url !== imageUrl));
  }

  const isValid = values.thumbnailUrl && values.imageUrls.length > 0 && values.introVideoUrl;

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold text-primary-200'>Course Media</p>
        <p className='text-sm text-accent'>Provide key information about the course, including its name and description</p>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Intro Video</p>
            {errors.introVideoUrl && touched.introVideoUrl && <p className='text-xs text-red-500'>{errors.introVideoUrl}</p>}
          </div>
          <p className='text-xs text-accent'>Provide a short introductory video to give learners a preview of what to expect in your course</p>
          <FileUploader provider='bunny' type='course' fileType='video' onChange={(url) => setFieldValue('introVideoUrl', url)} />
          {values.introVideoUrl && <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Preview</p>
            <Video src={values.introVideoUrl} />
          </div>}
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Thumbnail</p>
            {errors.thumbnailUrl && touched.thumbnailUrl && <p className='text-xs text-red-500'>{errors.thumbnailUrl}</p>}
          </div>
          <p className='text-xs text-accent'>Add a thumbnail image to represent your course.</p>
          <FileUploader provider='do-spaces' type='course' fileType='image' onChange={(url) => setFieldValue('thumbnailUrl', url)} />
          {values.thumbnailUrl && <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>Preview</p>
            <div className='w-full h-60 relative overflow-hidden'>
              <Image src={values.thumbnailUrl} alt='thumbnail' fill className='object-contain absolute' />
            </div>
          </div>}
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2">
            <p className='text-sm font-semibold'>Images</p>
            {errors.imageUrls && touched.imageUrls && <p className='text-xs text-red-500'>{errors.imageUrls}</p>}
          </div>
          <p className='text-xs text-accent'>Add between 1 to 5 high-quality images to represent your course.</p>
          <FileUploader provider='do-spaces' type='course' fileType='image' onChange={(url) => setFieldValue('imageUrls', [...values.imageUrls, url])} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values?.imageUrls.map((imageUrl, index) => (
              <div key={index} className="relative w-full h-40">
                <Image src={imageUrl} alt="Course Image" fill className='object-contain absolute' />
                <div
                  className="absolute top-2 right-2 cursor-pointer grid place-items-center size-6 rounded-full bg-red-700/60 hover:bg-red-700/90 transition-all duration-300"
                  onClick={() => removeImage(imageUrl)}
                >
                  <IconifyIcon icon="ri:close-line" className="text-primary-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          type='submit'
          disabled={!isValid}
          loading={createOrUpdateCourseMediaMutation.isPending}
          className='w-full'
        >
          Proceed to Course Content
        </Button>
      </form>
    </div>
  )
}
