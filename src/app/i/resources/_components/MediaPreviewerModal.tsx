import IconifyIcon from '@/components/IconifyIcon'
import Modal from '@/components/Modal'
import Video from '@/components/Video'
import helperUtil from '@/utils/helper.util'
import Image from 'next/image'
import React from 'react'

interface IMediaPreviewerModalProps {
  type: 'image' | 'video' | 'document'
  url: string
}

export default function MediaPreviewerModal({ type, url }: IMediaPreviewerModalProps) {
  const mediaTitle = {
    image: 'Image Preview',
    video: 'Video Preview',
    document: 'Document Preview',
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
          }[type]
        }
      </div>
    </Modal>
  )
}
