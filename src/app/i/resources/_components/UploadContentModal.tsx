import FileUploader from '@/components/FileUploader';
import IconifyIcon from '@/components/IconifyIcon'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import clsx from 'clsx';
import useAdminMutations from '../../_module/admin.mutations';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import { AffiliateResourceType, IAffiliateResourceForm } from '../../_module/_interfaces/affiliate.interface';

export default function UploadContentModal() {

  type FileType = 'image' | 'video' | 'document';

  const types: { name: FileType, icon: string }[] = [
    { name: 'image', icon: 'ri:image-circle-fill' },
    { name: 'video', icon: 'ri:video-fill' },
    { name: 'document', icon: 'ri:file-3-line' },
  ];

  const { createAffiliateResourceMutation } = useAdminMutations();

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik<IAffiliateResourceForm>({
    initialValues: {
      type: AffiliateResourceType.MESSAGE,
      message: '',
      url: '',
    },
    onSubmit: (values) => {
      createAffiliateResourceMutation.mutate(values);
    }
  })

  const toggleType = (type: FileType) => {
    if (values.url) return;
    if (values.type === type) {
      setFieldValue('type', '');
    } else {
      setFieldValue('type', type);
    }
  }

  const removeURL = () => {
    setFieldValue('url', '');
  }

  const isDisabled = !values.message && !values.type;

  return (
    <Modal title='Upload Resource Content'>
      <div className='flex items-center gap-4'>
        {types.map((type, index) => (
          <div key={index} onClick={() => toggleType(type.name)}
            className={clsx("flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#B0CAFF1A] cursor-pointer", values.type === type.name && "bg-primary/20")}>
            <IconifyIcon icon={type.icon} className='text-primary-100' />
            <p className='text-xs capitalize'>{type.name}</p>
          </div>
        ))}
      </div>
      <Textarea placeholder='Mssage' name='message' value={values.message} onChange={handleChange} />
      {values.type && (
        <Fragment>
          <FileUploader provider="do-spaces" type="others" fileType={values.type as 'image' | 'video' | 'document'} onChange={(url) => setFieldValue('url', url)} />
          {values.url && (
            <div className='w-full flex items-center gap-3 relative border bg-black/40 p-3 rounded'>
              {{
                image: <IconifyIcon icon="ri:image-2-fill" className='text-primary-100' />,
                video: <IconifyIcon icon="ri:video-fill" className='text-primary-100' />,
                document: <IconifyIcon icon="ri:file-3-line" className='text-primary-100' />,
                message: null
              }[values.type]}
              <p className='text-sm'>{values.type} uploaded</p>
              <p onClick={removeURL} className='text-xs text-accent !ml-auto cursor-pointer'>Remove</p>
            </div>
          )}
        </Fragment>
      )}
      <Button className='w-full' size="sm" disabled={isDisabled} onClick={() => handleSubmit()}>Upload</Button>
    </Modal>
  )
}
