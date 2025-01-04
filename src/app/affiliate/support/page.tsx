'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import StudentQueries from '@/app/(student)/_module/student.queries';
import LoadingIcons from 'react-loading-icons';
import { useFormik } from 'formik';
import useStudentMutations from '@/app/(student)/_module/student.mutations';
import notificationUtil from '@/utils/notification.util';
import { IContactSupportForm } from '@/app/(student)/_module/student.interface';

export default function SupportPage() {
  const { useFetchFAQsQuery } = StudentQueries();
  const { data: faqs, isPending } = useFetchFAQsQuery();

  const { contactSupportMutation } = useStudentMutations();

  const { handleSubmit, handleChange, resetForm, values } = useFormik<IContactSupportForm>({
    initialValues: {
      subject: '',
      message: '',
    },
    onSubmit: (values) => {
      contactSupportMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          notificationUtil.success('Support request submitted successfully')
        }
      })
    }
  })

  const disabledForm = !values.subject || !values.message || contactSupportMutation.isPending;

  return (
    <div className='w-full responsive-section grid grid-cols-1 lg:grid-cols-7 gap-6'>
      <div className='col-span-1 order-2 lg:order-1 lg:col-span-4 space-y-4'>
        <p className='text-lg font-medium uppercase'>FAQ&apos;s</p>
        <p className='text-sm text-accent'>Answers to common questions about our platform.</p>
        <Accordion type='single' collapsible className='space-y-4'>
          {faqs?.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger>
                <p className='text-lg font-gishaBold text-left'>{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent>
                <p className='text-muted'>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {faqs?.length === 0 && (
          <p className='text-muted'>No FAQs found</p>
        )}
        {isPending && (
          <div className='flex justify-center items-center w-full h-[50vh]'>
            <LoadingIcons.TailSpin />
          </div>
        )}
      </div>
      <div className='col-span-1 order-1 lg:order-2 lg:col-span-3 space-y-4'>
        <p className='text-lg font-medium uppercase'>Need Further Assistance?</p>
        <p className='text-sm text-accent'>Reach out to our support team for any questions or concerns you may have.</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input placeholder='Subject' name='subject' onChange={handleChange} value={values.subject} />
          <Textarea placeholder='Message' name='message' onChange={handleChange} value={values.message} />
          <Button type='submit' className='w-full' loading={contactSupportMutation.isPending} disabled={disabledForm}>Submit Request</Button>
        </form>
      </div>
    </div>
  )
}
