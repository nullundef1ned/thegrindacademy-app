import { ICourse } from '@/app/(student)/_module/_interfaces/course.interface';
import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import useAdminCourseMutations from '../../_apis/admin-course.mutations';

interface IDeleteCourseModalProps {
  course: ICourse;
}

export default function DeleteCourseModal({ course }: IDeleteCourseModalProps) {
  const { deleteCourseMutation } = useAdminCourseMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteCourse = () => deleteCourseMutation.mutate(course.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Course deleted successfully');
      router.push(adminRoutes.courses);
    }
  })

  return (
    <Modal title='Delete Course?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this course? This action cannot be undone, and all associated data will be removed</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteCourseMutation.isPending} onClick={handleDeleteCourse} type='submit' variant='destructive' size="sm">Delete Course</Button>
      </div>
    </Modal>
  )
}