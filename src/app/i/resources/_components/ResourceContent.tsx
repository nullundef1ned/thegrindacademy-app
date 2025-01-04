import IconifyIcon from '@/components/IconifyIcon';
import { useModal } from '@/providers/modal.provider';
import React, { useState } from 'react'
import MediaPreviewerModal from './MediaPreviewerModal';
import clsx from 'clsx';
import DeleteResourceModal from './DeleteResourceModal';
import { IResource } from '../../_module/_interfaces/resource.interface';

interface ResourceContentProps {
  resource: IResource
}

export default function ResourceContent({ resource }: ResourceContentProps) {
  const [showMore, setShowMore] = useState(false);

  const { showModal } = useModal();

  const showMediaPreviewerModal = () => {
    showModal(<MediaPreviewerModal type={resource.type as 'image' | 'video' | 'document'} url={resource.url} />)
  }

  const showDeleteResourceModal = () => showModal(<DeleteResourceModal id={resource.id} />)

  return (
    <div className='rounded bg-[#00246B33] flex flex-col overflow-hidden h-full'>
      <div className='flex items-center justify-between space-x-2 bg-primary-200/10 p-2 px-3'>
        <p className='text-xs capitalize font-medium'>{resource.type || 'text'} content</p>
        <div onClick={showDeleteResourceModal} className='cursor-pointer'>
          <IconifyIcon icon="ri:delete-bin-7-fill" className='flex items-center hover:text-red-600' />
        </div>
      </div>
      <div className='p-3 flex flex-col justify-between h-full gap-4'>
        {resource.text && <p onClick={() => setShowMore(!showMore)} className={clsx('text-sm line-clamp-3', showMore && 'line-clamp-none')}>{resource.text}</p>}
        {resource.url && (
          <div onClick={showMediaPreviewerModal} className='w-full flex items-center gap-3 cursor-pointer relative border bg-black/40 p-3 rounded'>
            {
              {
                image: <IconifyIcon icon="ri:image-2-fill" className='text-primary-100' />,
                video: <IconifyIcon icon="ri:video-fill" className='text-primary-100' />,
                document: <IconifyIcon icon="ri:file-3-line" className='text-primary-100' />
              }[resource.type]
            }
            <p className='text-sm'>Preview media</p>
          </div>
        )}
      </div>
    </div>
  )
}
