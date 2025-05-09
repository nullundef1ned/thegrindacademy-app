import React, { Fragment, useRef, useState } from 'react'
import IconifyIcon from './IconifyIcon'
import { FileType, VideoFileType } from '@/app/_module/app.type';
import useAppMutations from '@/app/_module/app.mutations';
import LoadingIcons from 'react-loading-icons';
import { Progress } from './ui/progress';
import { AxiosProgressEvent } from 'axios';
import helperUtil from '@/utils/helper.util';
interface FileUploaderProps {
  provider: 'bunny' | 'do-spaces';
  type: FileType | VideoFileType;
  fileType: 'image' | 'video' | 'audio' | 'document' | 'any';
  onChange: (url: string) => void;
}

export default function FileUploader({ provider, type, fileType, onChange }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState<AxiosProgressEvent | null>(null);
  const { uploadFileMutation, uploadVideoFileMutation } = useAppMutations();

  if (provider === 'bunny' && type !== 'course' && fileType !== 'video') {
    throw new Error('Invalid type for bunny provider');
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
        uploadVideoFileMutation.mutate({ file, fileType: 'course', progressCallback: setProgress }, {
          onSuccess: (data) => onChange(data)
        });
      } else {
        uploadFileMutation.mutate({ file, type, progressCallback: setProgress }, {
          onSuccess: (data) => onChange(data)
        });
      }
    }
  }

  return (
    <div className='w-full bg-[#00246B33] rounded-md border border-dashed border-primary-100/10 p-4 h-40 grid place-items-center place-content-center gap-2'>
      {uploading &&
        <Fragment>
          <LoadingIcons.TailSpin className='size-6' />
          <p className='text-sm text-primary-100'>Uploading...</p>
          {progress &&
            <div className='w-full flex flex-col gap-2'>
              <div className='w-full flex items-start gap-10 justify-between'>
                <p className='text-xs text-primary-100'>{helperUtil.normalizeBytes(progress.loaded)}/ {helperUtil.normalizeBytes(progress.total ?? 0)}</p>
                <p className='text-[10px] text-primary-100'>{helperUtil.normalizeBytes(progress.rate ?? 0)}/s</p>
              </div>
              <Progress className='w-full h-1' value={(progress.progress ?? 0) * 100} />
            </div>}
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
          <p className='text-sm text-primary-100'>Click <span onClick={() => inputRef.current?.click()} className='text-[#548DFF] underline cursor-pointer'>here</span> to upload your {fileType === 'any' ? 'file' : fileType}  </p>
        </Fragment>
      }
      <input ref={inputRef} accept={accept} onChange={handleChange} type="file" className='hidden' />
    </div>
  )
}
