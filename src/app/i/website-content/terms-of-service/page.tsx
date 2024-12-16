'use client';

import { adminRoutes } from '@/app/i/_module/admin.routes';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import notificationUtil from '@/utils/notification.util';
import helperUtil from '@/utils/helper.util';
import LoadingIcons from 'react-loading-icons';
import { useFetchTermsOfService } from './_apis/useFetchTermsOfService';
import useTermsOfServiceMutations from './_apis/terms-of-service.mutations';
import { ITermsOfServiceForm } from '@/interfaces/meta-information';
import RichTextEditor from '@/components/RichTextEditor';

export default function TermsOfServicePage() {
  const { data, isPending } = useFetchTermsOfService();
  const { createOrUpdateTermsOfServiceMutation } = useTermsOfServiceMutations();

  const { values, handleSubmit, setFieldValue } = useFormik<ITermsOfServiceForm>({
    enableReinitialize: true,
    initialValues: {
      content: data?.content || '',
    },
    onSubmit: (values) => {
      createOrUpdateTermsOfServiceMutation.mutate(values, {
        onSuccess: () => {
          notificationUtil.success('Terms of service updated successfully');
        }
      });
    },
  });

  if (isPending) return (
    <div className="w-full h-[50vh] responsive-section !max-w-screen-md grid place-items-center">
      <LoadingIcons.TailSpin />
    </div>
  )

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Website Content', link: adminRoutes.websiteContent.root },
    { name: 'Terms of Service' },
  ]

  const loading = createOrUpdateTermsOfServiceMutation.isPending;
  const isFormValid = values.content && values.content !== '<p><br></p>';

  return (
    <div className='w-full responsive-detail-section space-y-6'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>Terms of Service</p>
          {data?.updatedAt &&
            <p className='text-xs text-accent'>Last updated: {helperUtil.formatDate(data.updatedAt)}</p>
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <RichTextEditor
          value={values.content}
          onChange={(value) => setFieldValue('content', value)}
        />
        <Button disabled={!isFormValid}
          loading={loading}
          type='submit' size='sm'
          className='w-full '>
          Update
        </Button>
      </form>
    </div>
  )
}
