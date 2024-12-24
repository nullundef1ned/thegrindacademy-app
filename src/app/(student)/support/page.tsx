'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import StudentQueries from '../_module/student.queries';
import LoadingIcons from 'react-loading-icons';

export default function SupportPage() {
  const { useFetchFAQsQuery } = StudentQueries();
  const { data: faqs, isPending } = useFetchFAQsQuery();

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
        <form className='flex flex-col gap-4'>
          <Input placeholder='Subject' />
          <Textarea placeholder='Message' />
          <Button className='w-full'>Submit Request</Button>
        </form>
      </div>
    </div>
  )
}
