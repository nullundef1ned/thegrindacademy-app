import { IUser } from '@/app/_module/app.interface';
import useAdminMutations from '@/app/i/_module/admin.mutations';
import { adminRoutes } from '@/app/i/_module/admin.routes';
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import { useRouter } from 'next/navigation';

interface IDeleteAffiliateModalProps {
  affiliate: IUser;
}

export default function DeleteAffiliateModal({ affiliate }: IDeleteAffiliateModalProps) {
  const { deleteAffiliateMutation } = useAdminMutations();

  const router = useRouter();
  const { hideModal } = useModal();

  const handleDeleteAffiliate = () => deleteAffiliateMutation.mutate(affiliate.id, {
    onSuccess: () => {
      hideModal();
      notificationUtil.success('Affiliate deleted successfully');
      router.push(adminRoutes.affiliates);
    }
  })

  return (
    <Modal title='Delete Affiliate?'>
      <p className='text-sm text-accent'>Are you sure you want to permanently delete this affiliate? This action cannot be undone, and all associated data will be removed</p>
      <div className='grid grid-cols-2 gap-4'>
        <Button onClick={hideModal} type='button' variant='outline' size="sm">Cancel</Button>
        <Button loading={deleteAffiliateMutation.isPending} onClick={handleDeleteAffiliate} type='submit' variant='destructive' size="sm">Delete Affiliate</Button>
      </div>
    </Modal>
  )
}