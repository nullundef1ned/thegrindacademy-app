import IconifyIcon from '@/components/IconifyIcon'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import Video from '@/components/Video'
import helperUtil from '@/utils/helper.util'
import Image from 'next/image'
import React from 'react'
import { AffiliateResourceType } from '../../_module/_interfaces/affiliate.interface'

interface IMediaPreviewerModalProps {
  type: AffiliateResourceType;
  url: string;
  showDownloadButton?: boolean;
}

export default function MediaPreviewerModal({ type, url, showDownloadButton = true }: IMediaPreviewerModalProps) {
  const mediaTitle = {
    image: 'Image Preview',
    video: 'Video Preview',
    document: 'Document Preview',
    message: 'Message Preview',
  }[type]


  const downloadDocument = () => {
    helperUtil.downloadFile(url, 'Document');
  }

  return (
    <Modal title={mediaTitle} width="lg">
      <div className='w-full aspect-video flex items-center justify-center relative border bg-black/40 p-2 rounded'>
        {
          {
            image: <Image src={url} alt="Image Media Preview" fill className='object-contain' />,
            video: <Video src={url} />,
            document: <div className='flex items-center gap-2'>
              <IconifyIcon icon="ri:file-3-line" className='text-primary-100' />
              <p onClick={downloadDocument} className='text-xs cursor-pointer underline'>Download document</p>
            </div>,
            message: null,
          }[type]
        }
      </div>
      {showDownloadButton && type !== 'document' && <Button onClick={downloadDocument} className='mt-4'>Download {type}</Button>}
    </Modal>
  )
}
