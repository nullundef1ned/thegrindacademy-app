import FileUploader from '@/components/FileUploader';
import IconifyIcon from '@/components/IconifyIcon'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import clsx from 'clsx';
import useAdminMutations from '../../_module/admin.mutations';
import { useFormik } from 'formik';
import { IResourceUpload } from '../../_module/_interfaces/resource.interface';

export default function UploadContentModal() {

  type FileType = 'image' | 'video' | 'document';

  const types: { name: FileType, icon: string }[] = [
    { name: 'image', icon: 'ri:image-circle-fill' },
    { name: 'video', icon: 'ri:video-fill' },
    { name: 'document', icon: 'ri:file-3-line' },
  ];

  const { uploadResourceMutation } = useAdminMutations();

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik<IResourceUpload>({
    initialValues: {
      text: '',
      type: '',
      url: '',
    },
    onSubmit: (values) => {
      uploadResourceMutation.mutate(values);
    }
  })

  const toggleType = (type: FileType) => {
    if (values.type === type) {
      setFieldValue('type', '');
    } else {
      setFieldValue('type', type);
    }
  }

  const isDisabled = !values.text && !values.type;

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
      <Textarea placeholder='Caption' name='text' value={values.text} onChange={handleChange} />
      {values.type && <FileUploader provider="do-spaces" type="others" fileType={values.type as 'image' | 'video' | 'document'} onChange={(url) => setFieldValue('url', url)} />}
      <Button className='w-full' size="sm" disabled={isDisabled} onClick={() => handleSubmit()}>Upload</Button>
    </Modal>
  )
}
