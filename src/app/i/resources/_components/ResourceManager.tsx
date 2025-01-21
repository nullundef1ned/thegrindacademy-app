import Card from '@/components/Card'
import ResourceContent from './ResourceContent';
import { Fragment, useState } from 'react';
import IconifyIcon from '@/components/IconifyIcon';
import { useModal } from '@/providers/modal.provider';
import UploadContentModal from './UploadContentModal';
import { clsx } from 'clsx';
import { useFetchAdminAffiliateTelegramCommunity, useFetchAdminResources } from '../../_module/_apis/useAdminResources';
import LoadingIcons from 'react-loading-icons';

export default function ResourceManager() {
  const { showModal } = useModal();
  const [page, setPage] = useState(1);
  const { data, isPending } = useFetchAdminResources();
  const { data: affiliateTelegramCommunity } = useFetchAdminAffiliateTelegramCommunity();

  const resources = data?.result || [];

  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const showUploadContentModal = () => showModal(<UploadContentModal />);

  return (
    <Fragment>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-medium">Resources</p>
          <div className="flex items-center gap-2">
            <div
              className={clsx(page == 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
              onClick={prevPage}>
              <IconifyIcon icon="ri:arrow-left-s-line" className="text-lg" />
            </div>
            <div
              className={clsx(data && data?.totalPages <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer", "size-8 grid place-items-center bg-[#00246B33] border rounded border-[#B0CAFF1A]")}
              onClick={nextPage}>
              <IconifyIcon icon="ri:arrow-right-s-line" className="text-lg" />
            </div>
          </div>
        </div>
        {affiliateTelegramCommunity?.telegramChannelId &&
          <div onClick={showUploadContentModal} className="flex items-center gap-2 cursor-pointer group">
            <p className="text-sm text-accent group-hover:text-primary-200">Upload Content</p>
            <IconifyIcon icon="ri:upload-line" className="text-accent group-hover:text-primary-200" />
          </div>
        }
      </div>
      <Card className="flex flex-col justify-between gap-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <ResourceContent resource={resource} key={index} />
          ))}
          {isPending && (
            <div className="flex col-span-2 flex-col items-center justify-center gap-2 h-40">
              <LoadingIcons.TailSpin />
            </div>
          )}
          {resources.length == 0 && !isPending && (
            <div className="flex col-span-2 flex-col items-center justify-center gap-2 h-40">
              <IconifyIcon icon="ri:file-list-3-line" className="text-primary-200 text-4xl" />
              <p className="text-center text-sm text-muted-foreground">No resources found</p>
              <p className="text-center text-xs text-accent">Add the affiliate channel to upload a resource</p>
            </div>
          )}
        </div>
      </Card>
    </Fragment>
  )
}
