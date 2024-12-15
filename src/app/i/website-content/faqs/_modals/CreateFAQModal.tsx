'use client';

import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal.provider';
import notificationUtil from '@/utils/notification.util';
import useFAQMutations from '../_apis/faq.mutations';
import { IFAQForm } from '@/interfaces/faq';
import { FAQType } from '@/interfaces/faq';
import { useFormik } from 'formik';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CreateFAQModal() {
  const { createFAQMutation } = useFAQMutations();

  const { hideModal } = useModal();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<IFAQForm>({
    initialValues: {
      question: '',
      answer: '',
      type: FAQType.GENERAL
    },
    onSubmit: (values) => {
      createFAQMutation.mutate(values, {
        onSuccess: () => {
          hideModal();
          notificationUtil.success('FAQ created successfully');
        }
      })
    }
  })

  return (
    <Modal title='Add New FAQ'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input name='question' required placeholder='Question' value={values.question} onChange={handleChange} />
        <Textarea name='answer' required placeholder='Answer' value={values.answer} onChange={handleChange} />
        <div className='space-y-2'>
          <p className='text-sm text-accent'>Select the type of FAQ</p>
          <RadioGroup defaultValue={FAQType.GENERAL} name='type' value={values.type} onValueChange={(value) => setFieldValue('type', value)} className='grid grid-cols-2 gap-2'>
            <label htmlFor={FAQType.GENERAL} className='flex items-center gap-2 bg-[#00246B33] p-3 rounded border border-[#B0CAFF1A] cursor-pointer'>
              <RadioGroupItem value={FAQType.GENERAL} id={FAQType.GENERAL} />
              <p className='text-sm'>General</p>
            </label>
            <label htmlFor={FAQType.STUDENT} className='flex items-center gap-2 bg-[#00246B33] p-3 rounded border border-[#B0CAFF1A] cursor-pointer'>
              <RadioGroupItem value={FAQType.STUDENT} id={FAQType.STUDENT} />
              <p className='text-sm'>Student</p>
            </label>
          </RadioGroup>
        </div>
        <Button loading={createFAQMutation.isPending} type='submit' className='w-full'>Add FAQ</Button>
      </form>
    </Modal>
  )
}