import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import useStudentInterviewMutations from '../../_apis/student-interview.mutations';
import { IStudentInterview } from '@/interfaces/student-interview';

interface IConfirmStudentInterviewDeletionModalProps {
  studentInterview: IStudentInterview;
}

export default function ConfirmStudentInterviewDeletionModal({ studentInterview }: IConfirmStudentInterviewDeletionModalProps) {
  const { deleteStudentInterviewMutation } = useStudentInterviewMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteStudentInterview = () => deleteStudentInterviewMutation.mutate(studentInterview.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Student interview deleted successfully');
      router.push(adminRoutes.websiteContent.studentInterviews);
    }
  })

  return (
    <Modal title='Delete Student Interview?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this student interview? This action cannot be undone</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteStudentInterviewMutation.isPending} onClick={handleDeleteStudentInterview} type='submit' variant='destructive' size="sm">Delete Interview</Button>
      </div>
    </Modal>
  )
}