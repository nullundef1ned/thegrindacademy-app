import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { ITestimonial } from '@/interfaces/testimonial';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import useTestimonialMutations from '../_apis/testimonial.mutations';

interface IConfirmTestimonialDeletionModalProps {
  testimonial: ITestimonial;
}

export default function ConfirmTestimonialDeletionModal({ testimonial }: IConfirmTestimonialDeletionModalProps) {
  const { deleteTestimonialMutation } = useTestimonialMutations();

  const { hideModal } = useModal();

  const handleDeleteTestimonial = () => deleteTestimonialMutation.mutate(testimonial.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Testimonial deleted successfully');
    }
  })

  return (
    <Modal title='Delete Testimonial?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this testimonial? This action cannot be undone</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteTestimonialMutation.isPending} onClick={handleDeleteTestimonial} type='submit' variant='destructive' size="sm">Delete Testimonial</Button>
      </div>
    </Modal>
  )
}