'use client';

import Card from '@/components/Card'
import IconifyIcon from '@/components/IconifyIcon'
import notificationUtil from '@/utils/notification.util';
import { useStudentStore } from '../../_module/student.store';
import StudentQueries from '../../_module/student.queries';
import Skeleton from 'react-loading-skeleton';

export default function ReferralCodeCard() {
  const referralCode = useStudentStore((state) => state.referral?.code);

  const { useFetchReferralQuery } = StudentQueries();
  const { isPending } = useFetchReferralQuery();

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      notificationUtil.success('Referral code copied to clipboard');
    }
  }

  if (isPending) return (
    <Card>
      <Skeleton height={36} width={120} baseColor="#12182B" highlightColor="#0C1227" />
      <Skeleton height={48} baseColor="#12182B" highlightColor="#0C1227" />
    </Card>
  )

  if (!referralCode) return null;

  return (
    <Card className='space-y-2'>
      <p className='text-muted text-sm'>Your referral code</p>
      <div className='flex items-center justify-between gap-2 py-3 px-3 rounded-md bg-primary/10 border border-primary/20'>
        <div className="flex items-center gap-2">
          <IconifyIcon icon="ri:links-line" />
          <p className='text-muted uppercase font-medium'>{referralCode}</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded-md p-2" onClick={handleCopyReferralCode}>
          <IconifyIcon icon="ri:file-copy-fill" className='text-primary-100' />
          <p className='text-primary-100 text-xs font-medium'>Copy code</p>
        </div>
      </div>
    </Card>
  )
}
