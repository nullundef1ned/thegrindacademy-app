import IconifyIcon from '@/components/IconifyIcon'
import React from 'react'
import ProfileSection from './ProfileSection'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/Avatar';
import { useAppStore } from '@/app/_module/app.store';

export default function AccountInformationSection() {
  const user = useAppStore(state => state.user);

  return (
    <ProfileSection title='Account Information' description='Manage your personal information'>
      <Avatar size={45} alt={user?.firstName ?? 'User Avatar'} src={user?.profilePicture} />
      <div className='space-y-2'>
        <p className='text-xl font-medium'>{user?.name}</p>
        <div className='flex items-center gap-2'>
          <IconifyIcon icon='mdi:email' />
          <p className='text-accent text-sm'>{user?.email}</p>
        </div>
        <div className='flex items-center gap-2'>
          <IconifyIcon icon='mdi:telegram' />
          <p className='text-accent text-sm'>{user?.telegramUsername}</p>
        </div>
      </div>
      <Button variant='outline'>Update Information</Button>
    </ProfileSection>
  )
}
