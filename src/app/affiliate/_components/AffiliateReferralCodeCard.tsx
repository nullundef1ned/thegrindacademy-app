'use client';

import Card from '@/components/Card'
import IconifyIcon from '@/components/IconifyIcon'
import { useFetchAffiliateReferralQuery } from '@/hooks/api/affiliate/useAffiliateReferral';
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import Skeleton from 'react-loading-skeleton';
import AffilicateCodeCustomizerModal from './AffilicateCodeCustomizerModal';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AffiliateReferralCodeCard() {
  const { data: user } = useFetchUser();
  const { data: referralCode, isPending } = useFetchAffiliateReferralQuery();

  const referralCodeLink = `https://thegrindacademy.co/?referral=${referralCode?.code}`

  const { showModal } = useModal();

  const handleCopyReferralLink = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCodeLink);
      notificationUtil.success('Referral link copied to clipboard');
    }
  }

  const handleShareReferralLink = () => {
    if (referralCode) {
      navigator.share({
        title: 'Join the Grind Academy',
        text: `${user?.info.firstName} is inviting you to join the Grind Academy.`,
        url: referralCodeLink,
      })
    }
  }

  const openCodeCustomizerModal = () => showModal(<AffilicateCodeCustomizerModal />)

  if (isPending) return (
    <Card>
      <Skeleton height={36} width={120} baseColor="#12182B" highlightColor="#0C1227" />
      <Skeleton height={48} baseColor="#12182B" highlightColor="#0C1227" />
    </Card>
  )

  if (!referralCode) return null;

  return (
    <Card className='space-y-2'>
      <div className="flex items-center justify-between">
        <p className='text-muted text-sm'>Your referral link</p>
        <p onClick={openCodeCustomizerModal} className='text-accent cursor-pointer text-xs'>Customize your code</p>
      </div>
      <div className='flex items-center overflow-hidden justify-between gap-2 py-3 px-3 rounded-md bg-primary/10 border border-primary/20'>
        <div className="flex items-center gap-2 overflow-hidden w-full">
          <IconifyIcon icon="ri:links-line" />
          <p className='text-muted font-medium truncate text-sm'>{referralCodeLink}</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded-md p-2" onClick={handleCopyReferralLink}>
                  <IconifyIcon icon="ri:file-copy-fill" className='text-primary-100' />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>Copy link</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded-md p-2" onClick={handleShareReferralLink}>
                  <IconifyIcon icon="ri:share-line" className='text-primary-100' />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>Share link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* <div className='flex items-center overflow-hidden justify-between gap-2 py-3 px-3 rounded-md bg-primary/10 border border-primary/20'>
        <div className="flex items-center gap-2 overflow-hidden w-full">
          <IconifyIcon icon="ri:code-box-line" />
          <p className='text-muted font-medium truncate text-sm'>{referralCode.code}</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-primary/20 rounded-md p-2" onClick={handleCopyReferralCode}>
          <IconifyIcon icon="ri:file-copy-fill" className='text-primary-100' />
          <p className='text-primary-100 text-xs font-medium whitespace-nowrap'>Copy code</p>
        </div>
      </div> */}
    </Card >
  )
}
