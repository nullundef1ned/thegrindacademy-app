import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { IDynamicContent } from '@/interfaces/dynamic-content';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';
import useDynamicContentMutations from '../../_apis/dynamic-content.mutations';

interface IConfirmDynamicContentDeletionModalProps {
  dynamicContent: IDynamicContent;
}

export default function ConfirmDynamicContentDeletionModal({ dynamicContent }: IConfirmDynamicContentDeletionModalProps) {
  const { deleteDynamicContentMutation } = useDynamicContentMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteDynamicContent = () => deleteDynamicContentMutation.mutate(dynamicContent.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Dynamic content section deleted successfully');
      router.push(adminRoutes.websiteContent.dynamicContent);
    }
  })

  return (
    <Modal title='Delete Dynaimic Content Section?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this dynamic content section? This action cannot be undone</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteDynamicContentMutation.isPending} onClick={handleDeleteDynamicContent} type='submit' variant='destructive' size="sm">Delete Section</Button>
      </div>
    </Modal>
  )
}