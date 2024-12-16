import React from 'react'
import ProfileSection from '../../../../components/ProfileSection'
import { Button } from '@/components/ui/button'

export default function DeleteAccountSection() {
  return (
    <ProfileSection title='Delete Account' description='Permanently delete your account and all associated data' hideBorder>
      <Button variant='destructive' className='w-full'>
        Delete Account
      </Button>
    </ProfileSection>
  )
}
