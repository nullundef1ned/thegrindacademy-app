import React, { Fragment } from 'react'
import ProfileSection from './ProfileSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import ReferralCodeCard from '../../(overview)/_components/ReferralCodeCard';
import { useAppStore } from '@/app/_module/app.store';

export default function SecuritySection() {
  const user = useAppStore(state => state.user);
  return (
    <ProfileSection title='Bank Information' description='Update your bank information'>
      <div className='flex flex-col gap-10 w-full'>
        {user?.referralCode && <Fragment>
          <ReferralCodeCard />
          <hr className='border-b border-[#B0CAFF1A]' />
        </Fragment>}
        <form className='grid grid-cols-2 gap-4'>
          <Input icon='ri:bank-fill' type='text' placeholder='Bank' />
          <Input type='text' placeholder='Bank Account Number' />
          <Input className="col-span-2" type='text' placeholder='Account Holder Name' />
          <Button className='w-full col-span-2' variant='outline'>
            Update Bank Information
          </Button>
        </form>
      </div>
    </ProfileSection>
  )
}
