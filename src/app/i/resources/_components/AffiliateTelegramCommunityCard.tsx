import Card from '@/components/Card'
import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useFetchAdminAffiliateTelegramCommunity } from '../../_module/_apis/useAdminResources'
import useAdminMutations from '../../_module/admin.mutations'
import helperUtil from '@/utils/helper.util'
import notificationUtil from '@/utils/notification.util'

export default function AffiliateTelegramCommunityCard() {

  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing(!isEditing);

  const { data } = useFetchAdminAffiliateTelegramCommunity();

  const { createOrUpdateAffiliateTelegramCommunityMutation } = useAdminMutations();

  const telegramChannelURL = `https://web.telegram.org/a/#${data?.telegramChannelId}`;

  const { handleSubmit, handleChange, values } = useFormik({
    enableReinitialize: true,
    initialValues: {
      telegramChannelId: telegramChannelURL
    },
    onSubmit: (values) => {
      const telegramChannelId = helperUtil.extractTelegramChannelId(values.telegramChannelId);
      if (!telegramChannelId) return notificationUtil.error('Invalid Telegram Channel Link');
      createOrUpdateAffiliateTelegramCommunityMutation.mutate({ telegramChannelId }, {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (error) => {
          notificationUtil.error(error.message);
        }
      });
    }
  })

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <p>Affiliate Telegram Community Channel Link</p>
        <p className="text-accent text-sm cursor-pointer" onClick={toggleEditing}>{isEditing ? "Cancel" : "Edit"}</p>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className='space-y-3'>
          <Input
            icon="ri:telegram-2-fill"
            placeholder="Telegram Group URL"
            type='url'
            name="telegramChannelId"
            required
            onChange={handleChange}
            value={values.telegramChannelId}
          />
          <Button size="sm" loading={createOrUpdateAffiliateTelegramCommunityMutation.isPending} className="w-full" disabled={!values.telegramChannelId} type="submit">Update</Button>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <IconifyIcon icon="ri:telegram-2-fill" className="text-lg" />
          {data ? (
            <p className="text-sm">{telegramChannelURL}</p>
          ) : (
            <p className="text-sm text-accent">No Channel link added yet. <span className="text-primary-200 cursor-pointer" onClick={toggleEditing}>Add Now</span></p>
          )}
        </div>
      )}
    </Card>
  )
}
