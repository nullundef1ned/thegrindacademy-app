import { Button } from '@/components/ui/button'
import RichTextEditor from '@/components/RichTextEditor'
import IconifyIcon from '@/components/IconifyIcon'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Card from '@/components/Card'
import { IMailMarketingForm } from '../../_module/affiliate.interface'
import useAffiliateMutations from '@/hooks/api/affiliate/useAffiliateMutations'
import notificationUtil from '@/utils/notification.util'

export default function MailMarketing() {
  const defaultMessage = `<p>
  Hi there,
  <br />
  <br />I hope you're doing well!
  <br />
  <br />Thank you for your interest in our product. We're excited to have you on board!<br /><br />Best regards,
  <br />The Grind Academy Team
  </p>`

  const { sendMailMarketingMutation } = useAffiliateMutations();

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, resetForm } = useFormik<IMailMarketingForm>({
    initialValues: {
      subject: '',
      bcc: [],
      content: defaultMessage
    },
    validationSchema: yup.object({
      subject: yup.string().required('Subject is required'),
      bcc: yup.array().min(1, 'At least one recipient email is required').of(yup.string().email('Invalid email address')).required('Recipient emails are required'),
      content: yup.string().required('Campaign content is required')
    }),
    onSubmit: (values) => {
      sendMailMarketingMutation.mutate(values, {
        onSuccess: () => {
          notificationUtil.success('Campaign sent successfully')
          resetForm()
        }
      })
    }
  })

  const handleAddRecipientEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const emails = e.currentTarget.value.trim().split(',').map(email => email.trim()).filter((email: string) => email.includes('@'));
      if (emails && emails.every((email: string) => !values.bcc.includes(email))) {
        setFieldValue('bcc', [...values.bcc, ...emails])
        e.currentTarget.value = ''
      }
    }
  }

  const handleRemoveRecipientEmail = (index: number) => {
    const newRecipientEmails = values.bcc.filter((_, i) => i !== index)
    setFieldValue('bcc', newRecipientEmails)
  }

  const isDisabled = values.subject === '' || values.bcc.length === 0 || values.content === '<p><br></p>'

  return (
    <Card className='flex flex-col gap-4'>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className='flex items-center gap-2'>
          <IconifyIcon icon='ri:mail-fill' className='text-lg' />
          <p className='text-sm font-medium'>Mail Marketing</p>
        </div>
        {values.content !== defaultMessage && (
          <p className='text-xs text-accent cursor-pointer' onClick={() => setFieldValue('content', defaultMessage)}>Restore default message</p>
        )}
      </div>
      <Input icon='ri:send-plane-fill' errors={errors} touched={touched} onBlur={handleBlur} placeholder='Subject' name='subject' value={values.subject} onChange={handleChange} />
      <Input icon='ri:at-fill' placeholder='Enter recipient emails or paste from clipboard' onKeyDown={handleAddRecipientEmail} />
      {values.bcc.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto">
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
      <Button size='sm' className='w-full' disabled={isDisabled} onClick={() => handleSubmit()}>
        Send Campaign
      </Button>
    </Card>
  )
}
