'use client';

import Card from "@/components/Card";
import Video from "@/components/Video";
import helperUtil from "@/utils/helper.util";

export default function ResourcesPage() {
  type ResourceType = 'video' | 'image' | 'document' | 'audio';

  const resources: { caption: string, url: string, type: ResourceType }[] = [
    {
      caption: 'Welcome to the Grind Academy',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'video'
    },
    {
      caption: 'Welcome to the Grind Academy',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'video'
    },
    {
      caption: 'Welcome to the Grind Academy',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'image'
    },
  ]

  const downloadResource = (url: string, name: string) => helperUtil.downloadFile(url, name)

  const ResourceMedia = ({ caption, url, type }: { caption: string, url: string, type: ResourceType }) => {
    if (!url) return null;

    if (type === 'video') {
      return <Video src={url} />
    }
    if (type === 'image') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p onClick={() => downloadResource(url, caption)} className="text-white">download</p>
          </div>
          {/* <Image src={url} alt={caption} fill className="object-contain" /> */}
        </div>
      )
    }
    if (type === 'document') {
      return <p>{caption}</p>
    }
    if (type === 'audio') {
      return <p>{caption}</p>
    }
  }

  // const { data, isPending } = useFetchUsers({ search: searchValue, page, limit });

  return (
    <div className='w-full responsive-section space-y-6'>
      <p className="font-medium">Resources</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="space-y-4">
            <ResourceMedia {...resource} />
            <p className="text-sm">{resource.caption}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
