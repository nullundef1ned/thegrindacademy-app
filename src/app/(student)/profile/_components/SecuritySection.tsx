import React from 'react'
import ProfileSection from './ProfileSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';

export default function SecuritySection() {
  return (
    <ProfileSection title='Password & Security' description='Update your password and secure your account'>
      <form className='space-y-4'>
        <Input icon='ri:lock-password-line' type='password' placeholder='Current Password' />
        <Input icon='ri:lock-password-fill' type='password' placeholder='New Password' />
        <Input icon='ri:lock-password-fill' type='password' placeholder='Confirm New Password' />
        <Button className='w-full' variant='outline'>
          Change Password
        </Button>
      </form>
    </ProfileSection>
  )
}
