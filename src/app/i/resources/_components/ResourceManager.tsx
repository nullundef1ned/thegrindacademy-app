import Card from '@/components/Card'
import ResourceContent from './ResourceContent';
import { Fragment } from 'react';
import IconifyIcon from '@/components/IconifyIcon';
import { useModal } from '@/providers/modal.provider';
import UploadContentModal from './UploadContentModal';
import { clsx } from 'clsx';
import useURL from '@/hooks/useURL';
import { useFetchAdminResources } from '../../_module/_apis/useAdminResources';
import { IResource } from '../../_module/_interfaces/resource.interface';

export default function ResourceManager() {
  const resources: IResource[] = [
    {
      id: '1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      text: 'open the door iin the winf od the space in the catacombs og  the evil ocean deallwrs open the door iin the winf od the space in the catacombs og  the evil ocean deallwrsopen the door iin the winf od the space in the catacombs og  the evil ocean deallwrsopen the door iin the winf od the space in the catacombs og  the evil ocean deallwrs',
      type: 'image', url: 'https://thegrindacademy.fra1.cdn.digitaloceanspaces.com/others/1735620298273-f1ae319f-8bbc-4ec1-a15d-c9e6a3fd1b62.jpeg'
    },
    {
      id: '2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      text: 'open the door',
      type: 'image',
      url: 'https://thegrindacademy.fra1.cdn.digitaloceanspaces.com/others/1735620298273-f1ae319f-8bbc-4ec1-a15d-c9e6a3fd1b62.jpeg'
    },
    {
      id: '3',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      text: 'open the door',
      type: 'video',
      url: 'https://thegrindacademy.fra1.cdn.digitaloceanspaces.com/others/1735620298273-f1ae319f-8bbc-4ec1-a15d-c9e6a3fd1b62.jpeg'
    },
    {
      id: '4',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      text: 'open the door',
      type: 'document',
      url: 'https://thegrindacademy.fra1.cdn.digitaloceanspaces.com/others/1735620298273-f1ae319f-8bbc-4ec1-a15d-c9e6a3fd1b62.jpeg'
    },
  ]

  const { data } = useFetchAdminResources();

  const { showModal } = useModal();
  const { searchParams, updateParams } = useURL();

  const page = searchParams.get('page') || 1;

  const nextPage = () => {
    updateParams({ key: 'page', value: (Number(page) + 1).toString() });
  }

  const prevPage = () => {
    updateParams({ key: 'page', value: (Number(page) - 1).toString() });
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
        <div onClick={showUploadContentModal} className="flex items-center gap-2 cursor-pointer group">
          <p className="text-sm text-accent group-hover:text-primary-200">Upload Content</p>
          <IconifyIcon icon="ri:upload-line" className="text-accent group-hover:text-primary-200" />
        </div>
      </div>
      <Card className="flex flex-col justify-between gap-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <ResourceContent resource={resource} key={index} />
          ))}
        </div>
      </Card>
    </Fragment>
  )
}
