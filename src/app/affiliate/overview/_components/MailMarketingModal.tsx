import { Button } from '@/components/ui/button'
import IconifyIcon from '@/components/IconifyIcon'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { IMailMarketingForm } from '../../_module/affiliate.interface'
import useAffiliateMutations from '@/hooks/api/affiliate/useAffiliateMutations'
import notificationUtil from '@/utils/notification.util'
import Modal from '@/components/Modal'
import { ChangeEvent, useRef } from 'react'
import { useModal } from '@/providers/modal.provider'
import RichTextEditor from '@/components/RichTextEditor'

export default function MailMarketingModal() {
  const defaultMessage = `<p>Hi there,<br/>I hope you're doing well!<br/>Thank you for your interest in our product. We're excited to have you on board!</p><br/><p>Best regards,<br/>The Grind Academy Team</p>`

  const maxRecipients = 50

  const { hideModal } = useModal();
  const emailRef = useRef<HTMLInputElement>(null);

  const { sendMailMarketingMutation } = useAffiliateMutations();

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, resetForm } = useFormik<IMailMarketingForm>({
    initialValues: {
      subject: '',
      bcc: [],
      content: defaultMessage
    },
    validationSchema: yup.object({
      subject: yup.string().required('Subject is required'),
      bcc: yup.array().min(1, 'At least one recipient email is required').max(maxRecipients, `Maximum ${maxRecipients} recipient emails are allowed`).of(yup.string().email('Invalid email address')).required('Recipient emails are required'),
      content: yup.string().required('Campaign content is required')
    }),
    onSubmit: (values) => {
      sendMailMarketingMutation.mutate(values, {
        onSuccess: () => {
          notificationUtil.success('Campaign sent successfully')
          hideModal()
          resetForm()
        }
      })
    }
  })

  const addRecipientEmail = (emailString: string) => {
    if (values.bcc.length >= maxRecipients) {
      return notificationUtil.error(`Only a maximum of ${maxRecipients} recipient emails are allowed`)
    }
    const emails = emailString.trim().split(',').map(email => email.trim()).filter((email: string) => email.includes('@'));
    if (emails && emails.every((email: string) => !values.bcc.includes(email))) {
      setFieldValue('bcc', [...values.bcc, ...emails])
    }
  }

  const handleAddRecipientEmail = (e: React.KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addRecipientEmail(e.currentTarget.value)
      e.currentTarget.value = ''
    }
    if (e.currentTarget.value.includes(',') || e.currentTarget.value.includes('\n') || e.currentTarget.value.includes('\r') || e.currentTarget.value.includes('\t') || e.currentTarget.value.includes(' ')) {
      addRecipientEmail(e.currentTarget.value)
      e.currentTarget.value = ''
    }
  }

  const handleRemoveRecipientEmail = (index: number) => {
    const newRecipientEmails = values.bcc.filter((_, i) => i !== index)
    setFieldValue('bcc', newRecipientEmails)
  }

  const handleButtonClick = () => {
    addRecipientEmail(emailRef.current?.value || '')
    emailRef.current!.value = ''
  }

  const isDisabled = values.subject === '' || values.bcc.length === 0 || values.content === '<p><br></p>'

  return (
    <Modal title='Send a mail campaign' width='lg'>
      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className='col-span-1 lg:col-span-2'>
            <Input icon='ri:mail-fill' className='w-full' errors={errors} touched={touched}
              onBlur={handleBlur}
              placeholder='Subject' name='subject'
              value={values.subject} onChange={handleChange} />
          </div>
          <div className="flex gap-3 col-span-1 lg:col-span-4">
            <Input icon='ri:at-fill' className='w-full' name='bcc'
              ref={emailRef}
              disabled={values.bcc.length >= maxRecipients}
              errors={errors}
              touched={touched}
              onBlur={handleBlur}
              onChange={handleAddRecipientEmail}
              placeholder='Enter recipient emails or paste from clipboard'
              onKeyDown={handleAddRecipientEmail}
            />
            <div className='flex items-center justify-center p-2 w-12 h-[46px] rounded-md bg-[#B0CAFF1A] cursor-pointer' onClick={handleButtonClick}>
              <IconifyIcon icon="fluent:arrow-enter-left-20-filled" className='text-xl' />
            </div>
          </div>
        </div>
        {values.bcc.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {values.bcc.map((email, index) => (
              <div key={index} className='flex items-center gap-2 px-2 py-1 rounded-md bg-[#B0CAFF1A]'>
                <p className='text-xs font-medium'>{email}</p>
                <div className='cursor-pointer' onClick={() => handleRemoveRecipientEmail(index)}>
                  <IconifyIcon icon='ri:close-line' className='text-lg flex items-center' />
                </div>
              </div>
            ))}
          </div>
        )}
        <RichTextEditor value={values.content} onChange={(value) => setFieldValue('content', value)} />
        {values.content !== defaultMessage && (
          <p className='text-xs text-accent cursor-pointer' onClick={() => setFieldValue('content', defaultMessage)}>Restore default message</p>
        )}
        <Button size='sm' loading={sendMailMarketingMutation.isPending} className='w-full' disabled={isDisabled} onClick={() => handleSubmit()}>
          Send Campaign
        </Button>
      </div>
    </Modal>
  )
}
