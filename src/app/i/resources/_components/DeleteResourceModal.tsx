import { URLKeyEnum } from '@/app/_module/app.enum';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import useURL from '@/hooks/useURL';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import useAdminMutations from '../../_module/admin.mutations';

interface IDeleteResourceModalProps {
  id: string;
}

export default function DeleteResourceModal({ id }: IDeleteResourceModalProps) {
  const { deleteResourceMutation } = useAdminMutations();

  const { updateParams } = useURL();
  const { hideModal } = useModal();

  const handleDeleteResource = () => deleteResourceMutation.mutate(id, {
    onSuccess: () => {
      hideModal();
      updateParams([{ key: URLKeyEnum.LOGOUT, value: 'true' }], '/login');
      notificationUtil.success('Account deleted successfully');
    }
  })

  return (
    <Modal title='Delete Resource?'>
      <p className='text-sm text-accent'>Are you sure you want to delete this resource? This action will cause the resource to be removed from your telegram community as well</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteResourceMutation.isPending} onClick={handleDeleteResource} type='submit' variant='destructive' size="sm">Delete Resource</Button>
      </div>
    </Modal>
  )
}