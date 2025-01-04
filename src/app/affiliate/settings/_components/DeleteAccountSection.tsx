import React from 'react'
import ProfileSection from '../../../../components/ProfileSection'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import DeleteAccountModal from './_modals/DeleteAccountModal';

export default function DeleteAccountSection() {
  const { showModal } = useModal();

  const handleDeleteAccount = () => showModal(<DeleteAccountModal />);

  return (
    <ProfileSection title='Delete Account' description='Permanently delete your account and all associated data' hideBorder>
      <Button variant='destructive' className='w-full' onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </ProfileSection>
  )
}
