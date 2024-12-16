'use client';

import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import useTestimonialMutations from '../_apis/testimonial.mutations';
import { ITestimonial, ITestimonialForm } from '@/interfaces/testimonial';
import { useFormik } from 'formik';
import FileUploader from '@/components/FileUploader';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';

interface ICreateTestimonialModalProps {
  testimonial?: ITestimonial;
}

export default function TestimonialModal({ testimonial }: ICreateTestimonialModalProps) {
  const { createTestimonialMutation, updateTestimonialMutation } = useTestimonialMutations();

  const { hideModal } = useModal();

  const { values, setFieldValue, handleSubmit } = useFormik<ITestimonialForm>({
    initialValues: {
      imageUrl: testimonial?.imageUrl || '',
      isPublished: testimonial?.isPublished || false,
    },
    onSubmit: (values) => {
      if (testimonial) {
        updateTestimonialMutation.mutate({
          id: testimonial.id,
          ...values
        }, {
          onSuccess: () => {
            hideModal();
            notificationUtil.success('Testimonial updated successfully');
          }
        })
      } else {
        createTestimonialMutation.mutate(values, {
          onSuccess: () => {
            hideModal();
            notificationUtil.success('Testimonial created successfully');
          }
        })
      }
    }
  })

  const loading = createTestimonialMutation.isPending || updateTestimonialMutation.isPending;

  return (
    <Modal title={testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {values.imageUrl &&
          <div className='w-full aspect-video relative'>
            <Image src={values.imageUrl} alt='testimonial' fill className='object-cover absolute' />
          </div>
        }
        <FileUploader
          provider='do-spaces'
          type='others'
          fileType='image'
          onChange={(value) => setFieldValue('imageUrl', value)}
        />
        <div className="flex items-center gap-2">
          <Switch id='isPublished' defaultChecked={values.isPublished} onCheckedChange={(value) => setFieldValue('isPublished', value)} />
          <p className='text-sm text-accent'>Publish</p>
        </div>
        <Button loading={loading} type='submit' className='w-full'>
          {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
        </Button>
      </form>
    </Modal>
  )
}