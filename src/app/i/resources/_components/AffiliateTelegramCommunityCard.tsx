import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import React from 'react'

export default function AffiliateTelegramCommunityCard() {

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      telegramChannelId: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <Card className="flex flex-col gap-4">
      <p>Affiliate Telegram Community Link</p>
      <Input
        icon="ri:telegram-2-fill"
        placeholder="Telegram Group URL"
        type='url'
        name="telegramChannelId"
        required
        onChange={handleChange}
        value={values.telegramChannelId}
      />
      <Button size="sm" className="w-full" disabled={!values.telegramChannelId} onClick={() => handleSubmit()}>Update</Button>
    </Card>
  )
}
