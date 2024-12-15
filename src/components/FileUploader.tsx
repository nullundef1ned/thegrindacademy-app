import React, { Fragment, useRef } from 'react'
import IconifyIcon from './IconifyIcon'
import { FileType, VideoFileType } from '@/app/_module/app.type';
import useAppMutations from '@/app/_module/app.mutations';
import LoadingIcons from 'react-loading-icons';

interface FileUploaderProps {
  provider: 'bunny' | 'do-spaces';
  type: FileType | VideoFileType;
  fileType: 'image' | 'video' | 'audio' | 'document' | 'any';
  onChange: (url: string) => void;
}

export default function FileUploader({ provider, type, fileType, onChange }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { uploadFileMutation, uploadVideoFileMutation } = useAppMutations();

  if (provider === 'bunny' && type !== 'course' && fileType !== 'video') {
    throw new Error('Invalid type for bunny provider');
  }

  if (provider === 'do-spaces' && type === 'course') {
    throw new Error('Invalid type for do-spaces provider');
  }

  const icon = {
    'image': 'ri:image-2-fill',
    'video': 'ri:video-line',
    'audio': 'ri:music-line',
    'document': 'ri:file-3-line',
    'any': 'ri:file-3-line'
  }[fileType]

  const accept = {
    'image': 'image/*',
    'video': 'video/*',
    'audio': 'audio/*',
    'document': 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'any': '*'
  }[fileType]

  const uploading = uploadFileMutation.isPending || uploadVideoFileMutation.isPending;
  const error = uploadFileMutation.error || uploadVideoFileMutation.error;
  const isSuccess = uploadFileMutation.isSuccess || uploadVideoFileMutation.isSuccess;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (file) {
      if (provider === 'bunny') {
        uploadVideoFileMutation.mutate({ file, type: 'course' }, {
          onSuccess: (data) => onChange(data)
        });
      } else {
        uploadFileMutation.mutate({ file, type }, {
          onSuccess: (data) => onChange(data)
        });
      }
    }
  }

  return (
    <div className='w-full bg-[#00246B33] rounded border border-dashed border-primary-100/10 p-4 h-40 grid place-items-center place-content-center gap-2'>
      {uploading &&
        <Fragment>
          <LoadingIcons.TailSpin className='size-6' />
          <p className='text-sm text-primary-100'>Uploading...</p>
        </Fragment>
      }
      {!uploading && error &&
        <Fragment>
          <IconifyIcon icon="ri:error-warning-line" className='text-red-500 text-4xl' />
          <p className='text-sm text-red-500 text-center'>{error.message}</p>
          <p className='text-sm text-[#548DFF] cursor-pointer' onClick={() => inputRef.current?.click()}>Try again</p>
        </Fragment>
      }
      {!uploading && !error && isSuccess &&
        <Fragment>
          <IconifyIcon icon="ri:check-line" className='text-primary-100 text-4xl' />
          <p className='text-sm text-primary-100'>Uploaded successfully</p>
          <p className='text-sm text-[#548DFF] cursor-pointer' onClick={() => inputRef.current?.click()}>Upload another file</p>
        </Fragment>
      }
      {!uploading && !error && !isSuccess &&
        <Fragment>
          <IconifyIcon icon={icon} className='text-primary-100 text-4xl' />
          <p className='text-sm text-primary-100'>Drag and drop your {fileType === 'any' ? 'file' : fileType} here or  <span onClick={() => inputRef.current?.click()} className='text-[#548DFF] underline cursor-pointer'>click to upload</span></p>
        </Fragment>
      }
      <input ref={inputRef} accept={accept} onChange={handleChange} type="file" className='hidden' />
    </div>
  )
}
