import useAdminCourseMutations from '../../_apis/admin-course.mutations';
import { useFormik } from 'formik';
import { IAdminCourseForm } from '@/interfaces/course';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCourseForm } from '../page';

export default function CourseBasicDetailsForm() {

  const { createCourseMutation } = useAdminCourseMutations();
  const { course: { details }, goToNextStep, setCourseDetails } = useCourseForm();

  const { values, handleSubmit, handleChange } = useFormik<IAdminCourseForm>({
    enableReinitialize: true,
    initialValues: {
      name: details.name,
      shortDescription: details.shortDescription,
      description: details.description,
      telegramChannelId: details.telegramChannelId,
    },
    onSubmit: (values) => {
      createCourseMutation.mutate(values, {
        onSuccess: (data) => {
          setCourseDetails({ details: values, id: data.id });
          goToNextStep();
        }
      });
    },
  });

  const isValid = values.name && values.shortDescription && values.description && values.telegramChannelId;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-semibold text-primary-200'>Basic Details</p>
        <p className='text-sm text-accent'>Provide key information about the course, including its name and description</p>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          name='name'
          placeholder='Course name'
          required
          value={values.name}
          onChange={handleChange} />
        <Input
          name='shortDescription'
          placeholder='Short description about the course'
          required
          value={values.shortDescription}
          onChange={handleChange} />
        <Textarea
          name='description'
          placeholder='Enter the full course description'
          required
          value={values.description}
          onChange={handleChange} />
        <Input
          name='telegramChannelId'
          icon='ri:telegram-2-fill'
          type='url'
          placeholder='Telegram Channel Link'
          required
          value={values.telegramChannelId}
          onChange={handleChange} />
        <Button loading={createCourseMutation.isPending} type='submit' disabled={!isValid}>Proceed to Media</Button>
      </form>
    </div>
  )
}
