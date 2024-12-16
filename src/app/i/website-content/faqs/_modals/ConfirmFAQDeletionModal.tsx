import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { IFAQ } from '@/interfaces/faq';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import useFAQMutations from '../_apis/faq.mutations';

interface IConfirmFAQDeletionModalProps {
  faq: IFAQ;
}

export default function ConfirmFAQDeletionModal({ faq }: IConfirmFAQDeletionModalProps) {
  const { deleteFAQMutation } = useFAQMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteFAQ = () => deleteFAQMutation.mutate(faq.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('FAQ deleted successfully');
      router.push(adminRoutes.websiteContent.faqs);
    }
  })

  return (
    <Modal title='Delete FAQ?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this FAQ? This action cannot be undone</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteFAQMutation.isPending} onClick={handleDeleteFAQ} type='submit' variant='destructive' size="sm">Delete FAQ</Button>
      </div>
    </Modal>
  )
}