'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import React from 'react'

export default function SupportPage() {
  const faqs = [
    {
      question: 'Is the program suitable for women?',
      answer: 'Absolutely! The Grind Academy welcomes students of all genders and is committed to providing an inclusive and supportive environment for everyone. Our programs are designed to empower every individual, regardless of gender, to achieve financial independence and success.'
    },
    {
      question: 'How quickly will I make my money back?',
      answer: 'While individual results can vary, many of our students report seeing a return on their investment within the first few months of completing the course. Our 30-day success guarantee is designed to help you start seeing results quickly.'
    },
    {
      question: 'Do I need money once I\'m inside The Grind Academy?',
      answer: 'No additional fees are required after your initial subscription. All course materials and access to mentorship are included in your subscription fee. Many students on admission fall in love with our AI CAMPUS and other business models which require no start up Money & saw great success.'
    },
    {
      question: 'Does my age really not matter?',
      answer: 'Absolutely not, although we do advise individuals below 18 to talk it over with a parent or guardian prior to enrolling in The Grind Academy. Rather than spending on the latest video games that lose their charm in no time, you have the chance to become part of our community, kickstart your own venture, and leave your friends and family in awe as you elevate your life in tangible ways.'
    },
    {
      question: 'I know nothing about the skills you teach. Is it a problem?',
      answer: 'Absolutely not. Remember, this is a mentorship program, designed for learning and growth. Simply adhere to our comprehensive lessons and expert advice, and you\'ll be on your way to establishing a lucrative venture.'
    },
    {
      question: 'I don\'t have a lot of time available, can I still join?',
      answer: 'Yes, you can! Our courses are designed to accommodate busy schedules, allowing you to learn at your own pace. While faster progress can be made with more time investment, even students with limited time can achieve substantial results by consistently dedicating as low as 30 minutes a day.'
    }
  ]

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-7 gap-6'>
      <div className='col-span-1 order-2 lg:order-1 lg:col-span-4 space-y-4'>
        <p className='text-lg font-medium uppercase'>FAQ&apos;s</p>
        <p className='text-sm text-accent'>Answers to common questions about our platform.</p>
        <Accordion type='single' collapsible className='space-y-4'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()} className='bg-[#00246B14] border border-[#548DFF24] rounded px-4'>
              <AccordionTrigger className='!no-underline'>
                <p className='text-lg font-gishaBold text-left'>{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent>
                <p className='text-muted'>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
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
