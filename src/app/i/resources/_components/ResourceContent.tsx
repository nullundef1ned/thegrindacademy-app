import IconifyIcon from '@/components/IconifyIcon';
import { useModal } from '@/providers/modal.provider';
import React, { useState } from 'react'
import MediaPreviewerModal from './MediaPreviewerModal';
import clsx from 'clsx';
import DeleteResourceModal from './DeleteResourceModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import notificationUtil from '@/utils/notification.util';
import { AffiliateResourceType, IAffiliateResource } from '@/app/i/_module/_interfaces/affiliate.interface';

interface ResourceContentProps {
  resource: IAffiliateResource
  isAffiliate?: boolean
}

export default function ResourceContent({ resource, isAffiliate = false }: ResourceContentProps) {
  const [showMore, setShowMore] = useState(false);

  const { showModal } = useModal();

  const showMediaPreviewerModal = () => {
    if (!resource.url) return;
    showModal(<MediaPreviewerModal type={resource.type} url={resource.url} showDownloadButton={isAffiliate} />)
  }

  const showDeleteResourceModal = () => showModal(<DeleteResourceModal id={resource.id} />)
  const copyResourceText = () => {
    navigator.clipboard.writeText(resource.message || '');
    notificationUtil.info('Content copied to clipboard')
  }

  return (
    <div className='rounded bg-[#00246B33] flex flex-col overflow-hidden h-full'>
      <div className='flex items-center justify-between space-x-2 bg-primary-200/10 p-2 px-3'>
        <p className='text-xs capitalize font-medium'>{resource.type || 'text'} content</p>
        {!isAffiliate && (
          <div onClick={showDeleteResourceModal} className='cursor-pointer'>
            <IconifyIcon icon="ri:delete-bin-7-fill" className='flex items-center hover:text-red-600' />
          </div>
        )}
        {isAffiliate && resource.message && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='cursor-pointer' onClick={copyResourceText}>
                  <IconifyIcon icon="ri:file-copy-fill" className='text-primary-100' />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>Copy text content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className='p-3 flex flex-col justify-between h-full gap-4'>
        {resource.message && <p onClick={() => setShowMore(!showMore)} className={clsx('text-sm line-clamp-3', showMore && 'line-clamp-none')}>{resource.message}</p>}
        {resource.url && resource.type != AffiliateResourceType.MESSAGE && (
          <div onClick={showMediaPreviewerModal} className='w-full flex items-center gap-3 cursor-pointer relative border bg-black/40 p-3 rounded'>
            {
              {
                image: <IconifyIcon icon="ri:image-2-fill" className='text-primary-100' />,
                video: <IconifyIcon icon="ri:video-fill" className='text-primary-100' />,
                document: <IconifyIcon icon="ri:file-3-line" className='text-primary-100' />,
                message: <IconifyIcon icon="ri:message-2-fill" className='text-primary-100' />
              }[resource.type]
            }
            <p className='text-sm'>Preview {resource.type}</p>
          </div>
        )}
      </div>
    </div>
  )
}
