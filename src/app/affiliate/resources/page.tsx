'use client';

import { AffiliateResourceType, IAffiliateResource } from "@/app/i/_module/_interfaces/affiliate.interface";
import ResourceContent from "@/app/i/resources/_components/ResourceContent";

export default function ResourcesPage() {
  const resources: IAffiliateResource[] = [
    {
      id: '1',
      type: AffiliateResourceType.MESSAGE,
      message: 'Hello, world!',
      telegramChannelId: '-1002267448230',
      telegramMessageId: '2',
      updatedAt: '2025-01-05T20:54:19.839Z',
      createdAt: '2025-01-05T20:54:19.839Z'
    }
  ]

  // const { data, isPending } = useFetchUsers({ search: searchValue, page, limit });

  return (
    <div className='w-full responsive-section space-y-6'>
      <p className="font-medium">Resources</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceContent key={index} resource={resource} isAffiliate={true} />
        ))}
      </div>
    </div>
  )
}
