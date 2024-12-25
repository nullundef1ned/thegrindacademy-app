import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import IconifyIcon from '@/components/IconifyIcon';

interface CourseCreationModalProps {
  isPublished: boolean;
  courseId: string;
}

export default function CourseCreationModal({ isPublished, courseId }: CourseCreationModalProps) {

  const { hideModal } = useModal();

  return (
    <Modal hideCloseButton disableBackgroundClose width='xs' className='flex flex-col items-center gap-3'>
      <IconifyIcon icon="ri:book-open-fill" className='text-primary-200 text-5xl' />
      <p className='text-xl font-semibold text-center'>Course {isPublished ? 'Published' : 'Created'} Successfully</p>
      <p className='text-xs text-accent text-center'>Your course has been {isPublished ? 'published' : 'created'} successfully. You can now view it on the course page</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button href={adminRoutes.courses} onClick={hideModal} variant='outline' className='w-full'>Go to Courses</Button>
        <Button href={`${adminRoutes.courses}/${courseId}`} onClick={hideModal} className='w-full'>View Course</Button>
      </div>
    </Modal >
  )
}