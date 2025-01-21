import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import useAdminMutations from '../../_module/admin.mutations';

interface IDeleteResourceModalProps {
  id: string;
}

export default function DeleteResourceModal({ id }: IDeleteResourceModalProps) {
  const { deleteAffiliateResourceMutation } = useAdminMutations();

  const { hideModal } = useModal();

  const handleDeleteResource = () => deleteAffiliateResourceMutation.mutate(id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Resource deleted successfully');
    }
  })

  return (
    <Modal title='Delete Resource?'>
      <p className='text-sm text-accent'>Are you sure you want to delete this resource? This action will cause the resource to be removed from your telegram community as well</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteAffiliateResourceMutation.isPending} onClick={handleDeleteResource} type='submit' variant='destructive' size="sm">Delete Resource</Button>
      </div>
    </Modal>
  )
}