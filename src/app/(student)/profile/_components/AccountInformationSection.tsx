import IconifyIcon from '@/components/IconifyIcon'
import React, { useRef } from 'react'
import ProfileSection from '../../../../components/ProfileSection'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/Avatar';
import { useModal } from '@/providers/modal.provider';
import AccountInformationModal from './_modals/AccountInformationModal';
import useAppMutations from '@/app/_module/app.mutations';
import useStudentMutations from '../../_module/student.mutations';
import notificationUtil from '@/utils/notification.util';
import LoadingIcons from 'react-loading-icons';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';

export default function AccountInformationSection() {
  const { data: user } = useFetchUser();

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const { showModal } = useModal();
  const { uploadFileMutation } = useAppMutations();
  const { updateStudentAccountInformationMutation } = useStudentMutations();

  const fullName = `${user?.info.firstName} ${user?.info.lastName}`
  const telegramUserName = user?.info.telegramUserName;

  const showAccountInformationModal = () => showModal(<AccountInformationModal />);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) {
      const response = await uploadFileMutation.mutateAsync({ file, type: 'avi' });
      updateStudentAccountInformationMutation.mutate({ info: { avi: response } }, {
        onSuccess: () => {
          notificationUtil.success('Avatar updated successfully')
        }
      });
    }
  }

  const handleAvatarRemoval = () => {
    updateStudentAccountInformationMutation.mutate({ info: { avi: '' } }, {
      onSuccess: () => {
        notificationUtil.success('Avatar removed successfully')
      }
    });
  }

  const isAvatarUpdating = uploadFileMutation.isPending || updateStudentAccountInformationMutation.isPending;

  return (
    <ProfileSection title='Account Information' description='Manage your personal information'>
      <div className='flex items-center gap-4'>
        <Avatar size={45} alt={user?.info.firstName ?? ''} src={user?.info.avi} type='square' />
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs text-accent cursor-pointer hover:text-primary-100' onClick={() => avatarInputRef.current?.click()}>Replace image</p>
          {user?.info.avi &&
            <p className='text-xs text-accent cursor-pointer hover:text-[#950229]' onClick={handleAvatarRemoval}>Remove image</p>
          }
        </div>
        {isAvatarUpdating &&
          <LoadingIcons.TailSpin className='size-4' />
        }
        <input ref={avatarInputRef} type='file' className='hidden' onChange={handleAvatarChange} />
      </div>
      <div className='space-y-2'>
        <p className='text-xl font-medium'>{fullName}</p>
        <div className='flex items-center gap-2'>
          <IconifyIcon icon='mdi:email' />
          <p className='text-accent text-sm'>{user?.email}</p>
        </div>
        {telegramUserName &&
          <div className='flex items-center gap-2'>
            <IconifyIcon icon='mdi:telegram' />
            <p className='text-accent text-sm'>{telegramUserName}</p>
          </div>
        }
      </div>
      <Button onClick={showAccountInformationModal} variant='outline'>Update Information</Button>
    </ProfileSection>
  )
}
